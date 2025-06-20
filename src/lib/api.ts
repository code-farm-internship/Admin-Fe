import { IParams } from '@/types/api';
import { instance } from '@/utils/axiosInstance';

export const get = async <T>(url: string, params?: IParams): Promise<T> => {
    const response = await instance.get<T>(url, { params });
    return response.data;
};

export const post = async <T>(url: string, body?: any): Promise<T> => {
    const response = await instance.post<T>(url, body);
    return response.data;
};
export const put = async <T>(url: string, body?: any): Promise<T> => {
    const response = await instance.put<T>(url, body);
    return response.data;
};
