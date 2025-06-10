import axios, { AxiosResponse } from 'axios';
import { IGetAllProductsResponse, IProduct } from '../types/product';

const API_BASE_URL: string = (import.meta.env.VITE_APP_API_URL as string) || 'http://localhost:8000/api/v1';

const productApi = axios.create({
    baseURL: `${API_BASE_URL}/products`,
    headers: {
        'Content-Type': 'application/json',
    },
});

productApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: unknown) => Promise.reject(error instanceof Error ? error : new Error(String(error))),
);

const getAllProducts = async (params?: Record<string, unknown>): Promise<IGetAllProductsResponse> => {
    try {
        const res: AxiosResponse<{ data: IGetAllProductsResponse }> = await productApi.get('/all', { params });
        return res.data.data;
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const getProductDetail = async (id: string): Promise<IProduct> => {
    try {
        const res: AxiosResponse<{ data: IProduct }> = await productApi.get(`/${id}`);
        return res.data.data;
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const createProduct = async (formData: FormData): Promise<void> => {
    try {
        await productApi.post('/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const updateProduct = async (id: string, formData: FormData): Promise<IProduct> => {
    try {
        // Sử dụng 'id' trong URL, không phải '_id'
        const res: AxiosResponse<{ data: IProduct }> = await productApi.put(`/update/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data.data;
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const toggleProductVisibility = async (id: string): Promise<void> => {
    try {
        await productApi.patch(`/hidden/${id}`);
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const getProductById = async (id: string): Promise<IProduct> => {
    try {
        const res: AxiosResponse<{ data: IProduct }> = await productApi.get(`/${id}`);
        return res.data.data;
    } catch (err: unknown) {
        return Promise.reject(err);
    }
};

const productService = {
    getAllProducts,
    getProductDetail,
    createProduct,
    updateProduct,
    toggleProductVisibility,
    getProductById,
};

export default productService;
