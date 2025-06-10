import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { envVars } from '../config/env.config';

const axiosOptions: AxiosRequestConfig = {
    baseURL: envVars.API_URL,
    timeout: 20000,
    withCredentials: true,
};

export const instance = axios.create(axiosOptions);

instance.interceptors.request.use(
    (config) => config,
    (error: unknown) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    <T>(response: AxiosResponse<T>) => response.data,
    (error: unknown) => {
        if (axios.isAxiosError(error)) {
            if (
                error.response &&
                typeof error.response.data === 'object' &&
                error.response.data !== null &&
                'message' in error.response.data
            ) {
                const message = (error.response.data as { message?: string }).message;
                if (typeof message === 'string') {
                    console.error('Axios error:', message);
                } else {
                    console.error('Axios error: response data has no string message property.');
                }
            } else {
                console.error('Axios error: response without expected data structure.');
            }
        } else {
            console.error('Unknown error in Axios response interceptor.');
        }
        return Promise.reject(error);
    },
);
