import axios, { AxiosResponse } from 'axios';
import { ICategory, IGetAllCategoriesResponse } from '../types/category';

const API_BASE_URL: string = (import.meta.env.VITE_APP_API_URL as string) || 'http://localhost:8000/api/v1';

const categoryApi = axios.create({
    baseURL: `${API_BASE_URL}/category`,
    headers: {
        'Content-Type': 'application/json',
    },
});

categoryApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: unknown) => Promise.reject(error instanceof Error ? error : new Error(String(error))),
);

const getCategoryDetail = async (id: string): Promise<ICategory> => {
    try {
        const res: AxiosResponse<{ data: ICategory }> = await categoryApi.get(`/${id}`);
        return res.data.data;
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const getAllCategories = async (params?: Record<string, unknown>): Promise<IGetAllCategoriesResponse> => {
    try {
        const res: AxiosResponse<{ data: IGetAllCategoriesResponse }> = await categoryApi.get('/all', { params });
        return res.data.data;
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const createCategory = async (formData: FormData): Promise<void> => {
    try {
        await categoryApi.post('/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const updateCategory = async (id: string, formData: FormData): Promise<ICategory> => {
    try {
        const res: AxiosResponse<{ data: ICategory }> = await categoryApi.put(`/update/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data.data;
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const deleteCategory = async (id: string): Promise<void> => {
    try {
        await categoryApi.delete(`/delete/${id}`);
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const categoryService = {
    getAllCategories,
    getCategoryDetail,
    createCategory,
    updateCategory,
    deleteCategory,
};

export default categoryService;
