// Fixes applied for VendorEdit.tsx
// File: src/pages/Admin/Vendor/VendorEdit.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import vendorService from '../../../services/vendor.service';
import { IVendor } from '../../../types/vendor';

const VendorEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendor = async (): Promise<void> => {
            try {
                const vendor = await vendorService.getVendorDetail(id!);
                setName(vendor.name);
                setDescription(vendor.description || '');
            } catch {
                setError('Không thể tải dữ liệu nhà cung cấp.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            void fetchVendor();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await vendorService.updateVendor(id!, { name, description });
            setSuccess('Cập nhật nhà cung cấp thành công!');
            setTimeout(() => {
                navigate('/dashboard/vendor', { state: { updated: true } });
            }, 1000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                setError(String(error.response.data.message));
            } else {
                setError('Lỗi khi cập nhật nhà cung cấp.');
            }
        }
    };

    if (loading) {
        return <div className='py-10 text-center'>Đang tải dữ liệu...</div>;
    }

    return (
        <div className='mx-auto max-w-xl p-6'>
            <h2 className='mb-4 text-2xl font-bold'>Chỉnh sửa nhà cung cấp</h2>

            {success && <div className='mb-4 rounded bg-green-100 px-4 py-2 text-green-700'>{success}</div>}
            {error && <div className='mb-4 rounded bg-red-100 px-4 py-2 text-red-700'>{error}</div>}

            <form
                onSubmit={(e) => {
                    void handleSubmit(e);
                }}
                className='space-y-4'
            >
                <div>
                    <label className='block font-medium'>Tên nhà cung cấp</label>
                    <input
                        type='text'
                        className='w-full rounded border p-2'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        required
                    />
                </div>

                <div>
                    <label className='block font-medium'>Mô tả</label>
                    <textarea
                        className='w-full rounded border p-2'
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </div>

                <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
};

export default VendorEdit;
