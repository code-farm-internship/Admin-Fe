import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categoryService from '../../../services/category.service';
import axios from 'axios';

const CategoryAdd = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name.trim()) {
            setError('Tên danh mục không được để trống.');
            return;
        }

        if (!image) {
            setError('Vui lòng chọn hình ảnh cho danh mục.');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);

            await categoryService.createCategory(formData);
            setSuccess('🎉 Thêm danh mục thành công!');
            setTimeout(() => {
                navigate('/dashboard/category');
            }, 1500);
        } catch (err: unknown) {
            console.error('Tạo danh mục thất bại:', err);
            // Cải thiện thông báo lỗi từ backend
            let errorMessage = 'Tạo danh mục thất bại: Lỗi không xác định.';
            if (
                axios.isAxiosError(err) &&
                err.response &&
                err.response.data &&
                typeof err.response.data === 'object' &&
                'message' in err.response.data
            ) {
                errorMessage = (err.response.data as { message: string }).message;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mx-auto max-w-xl p-6'>
            <h2 className='mb-4 text-xl font-bold'>Thêm danh mục mới</h2>

            {success && (
                <div className='mb-4 rounded border border-green-400 bg-green-100 px-4 py-2 text-green-700'>
                    {success}
                </div>
            )}

            {error && (
                <div className='mb-4 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700'>{error}</div>
            )}

            <form
                onSubmit={(e) => {
                    void handleSubmit(e);
                }}
                className='space-y-4'
            >
                <input
                    type='text'
                    placeholder='Tên danh mục'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    required
                    className='w-full rounded border px-4 py-2'
                    disabled={loading}
                />
                <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                        setImage(e.target.files ? e.target.files[0] : null);
                    }}
                    required
                    className='w-full'
                    disabled={loading}
                />
                <button
                    type='submit'
                    className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50'
                    disabled={loading}
                >
                    {loading ? 'Đang thêm...' : 'Thêm danh mục'}
                </button>
            </form>
        </div>
    );
};

export default CategoryAdd;
