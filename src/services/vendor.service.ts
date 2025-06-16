import axiosInstance from './axiosInstance';
import { IVendor } from '../types/vendor';

export const getAllVendors = async (): Promise<IVendor[]> => {
    const res = await axiosInstance.get('/vendors/all');
    return res.data.data.vendors;
};

export const deleteVendor = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/vendors/delete/${id}`);
};
