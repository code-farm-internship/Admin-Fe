import axiosInstance from './axiosInstance';
import { IProduct, ISelectProductVariant } from '../types/product';
import { get } from '@/lib/api';
import { IPaginateResponse, IParams } from '@/types/api';

export const getAllProducts = async (): Promise<{ products: IProduct[] }> => {
    try {
        const res = await axiosInstance.get('/products/all');
        return res.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

export const createProduct = async (formData: FormData): Promise<IProduct> => {
    try {
        const res = await axiosInstance.post('/products/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }
};

export const hiddenProduct = async (id: string): Promise<void> => {
    try {
        await axiosInstance.patch(`/products/hidden/${id}`);
    } catch (error) {
        console.error(`Error hiding product with ID ${id}:`, error);
        throw new Error('Failed to hide product');
    }
};

export const toggleProductVisibility = async (id: string): Promise<boolean> => {
    try {
        const res = await axiosInstance.patch(`/products/toggle/${id}`);
        return res.data.data.isAvailable;
    } catch (error) {
        console.error(`Error toggling visibility for product with ID ${id}:`, error);
        throw new Error('Failed to toggle product visibility');
    }
};

export const updateProduct = async (id: string, data: FormData | Partial<IProduct>): Promise<IProduct> => {
    try {
        const isFormData = data instanceof FormData;
        const res = await axiosInstance.put(`/products/update/${id}`, data, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
        });
        return res.data.data;
    } catch (error) {
        throw new Error('Failed to update product');
    }
};

export const getProductById = async (id: string): Promise<IProduct> => {
    try {
        const res = await axiosInstance.get(`/products/${id}`);
        return res.data.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw new Error('Failed to fetch product');
    }
};

export const getAllProductsVariant = async (params: IParams) => {
    const res = await get<IPaginateResponse<ISelectProductVariant[]>>('/products/all', params);
    return res.data;
};
