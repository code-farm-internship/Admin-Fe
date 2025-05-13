import axios from 'axios';
import { envVars } from '../../config/env.config';

const axiosOptions = {
    url: envVars.API_URL,
    timeout: 20000,
    withCredentials: true,
};

export const instance = axios.create(axiosOptions);

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error as Error);
    },
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error as Error);
    },
);
