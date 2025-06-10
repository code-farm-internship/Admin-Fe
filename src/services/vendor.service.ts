import axios, { AxiosResponse } from 'axios';
import { IVendor } from '../types/vendor';

const API_BASE_URL: string = (import.meta.env.VITE_APP_API_URL as string) || 'http://localhost:8000/api/v1';

const vendorApi = axios.create({
    baseURL: `${API_BASE_URL}/vendor`,
    headers: { 'Content-Type': 'application/json' },
});

vendorApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error: unknown) => Promise.reject(error),
);

const getVendorDetail = async (id: string): Promise<IVendor> => {
    try {
        const res: AxiosResponse<{ data: IVendor }> = await vendorApi.get(`/${id}`);
        return res.data.data;
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};

const getAllVendor = async (params?: Record<string, unknown>): Promise<IVendor[]> => {
    try {
        const res: AxiosResponse<{ data: { vendors: IVendor[] } }> = await vendorApi.get('/all', { params });
        return res.data.data.vendors || [];
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};

const createVendor = async (data: { name: string; description: string }): Promise<void> => {
    try {
        await vendorApi.post('/create', data);
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};

const updateVendor = async (id: string, data: { name: string; description: string }): Promise<IVendor> => {
    try {
        const res: AxiosResponse<{ data: IVendor }> = await vendorApi.put<{ data: IVendor }>(`/update/${id}`, data);
        return res.data.data;
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};

const deleteVendor = async (id: string): Promise<void> => {
    try {
        await vendorApi.delete(`/delete/${id}`);
    } catch (error: unknown) {
        return Promise.reject(error);
    }
};

const vendorService = {
    getAllVendor,
    getVendorDetail,
    createVendor,
    updateVendor,
    deleteVendor,
};

export default vendorService;
