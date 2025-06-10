// Fixes applied for VendorAdd.tsx
// File: src/pages/Admin/Vendor/VendorAdd.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import vendorService from '../../../services/vendor.service';

const VendorAdd: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name.trim()) {
            setError('Tên nhà cung cấp là bắt buộc');
            return;
        }

        try {
            await vendorService.createVendor({ name, description });
            setSuccess('Thêm nhà cung cấp thành công!');
            setTimeout(() => {
                navigate('/dashboard/vendor');
            }, 1500);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                setError(String(error.response.data.message));
            } else {
                setError('Lỗi khi thêm nhà cung cấp.');
            }
        }
    };

    return (
        <div className='mx-auto max-w-xl p-6'>
            <h2 className='mb-4 text-2xl font-bold'>Thêm nhà cung cấp mới</h2>

            {success && (
                <div className='mb-4 rounded border border-green-400 bg-green-100 px-4 py-2 text-green-700'>
                    {success}
                </div>
            )}
            {error && (
                <div className='mb-4 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700'>{error}</div>
            )}

            <form onSubmit={(e) => void handleSubmit(e)} className='space-y-4'>
                <div>
                    <label className='mb-1 block font-medium'>Tên nhà cung cấp</label>
                    <input
                        type='text'
                        className='w-full rounded border border-gray-300 p-2'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        required
                    />
                </div>

                <div>
                    <label className='mb-1 block font-medium'>Mô tả</label>
                    <textarea
                        className='w-full rounded border border-gray-300 p-2'
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                        Thêm nhà cung cấp
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VendorAdd;
