import { ICategory } from '../types/category';
import axiosInstance from './axiosInstance';

export const getAllCategories = async (): Promise<ICategory[]> => {
    const response = await axiosInstance.get('/categories/all');
    return response.data.data.categories;
};
export const deleteCategory = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/delete/${id}`);
};
