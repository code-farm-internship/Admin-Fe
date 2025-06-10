import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import categoryService from '../../../services/category.service';
import { ICategory } from '../../../types/category';
import axios from 'axios';

const CategoryEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            if (!id) {
                setError('ID danh mục không hợp lệ.');
                setLoading(false);
                return;
            }
            try {
                const allCatsResponse = await categoryService.getAllCategories();
                setCategories(allCatsResponse.categories || []);

                const categoryDetail = await categoryService.getCategoryDetail(id);
                setName(categoryDetail.name);
                setDescription(categoryDetail.description || '');
                setParentId(categoryDetail.parentId || '');
                setPreview(categoryDetail.image || null);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu danh mục:', err);
                setError('Không thể tải danh mục. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        void fetchData();

        return () => {
            if (preview && image) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [id, image, preview]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!id) {
            setError('Không tìm thấy ID danh mục để cập nhật.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        if (parentId) {
            formData.append('parentId', parentId);
        }
        if (image) {
            formData.append('image', image);
        }

        try {
            await categoryService.updateCategory(id, formData);
            setSuccess('Cập nhật thành công!');
            setTimeout(() => navigate('/dashboard/category'), 1000);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (
                    err.response &&
                    typeof err.response.data === 'object' &&
                    err.response.data !== null &&
                    'message' in err.response.data
                ) {
                    const errorMsg = (err.response.data as { message?: string }).message;
                    if (typeof errorMsg === 'string') {
                        setError(errorMsg);
                    } else {
                        setError('Lỗi không xác định từ máy chủ.');
                    }
                } else {
                    setError('Lỗi mạng hoặc phản hồi không hợp lệ.');
                }
            } else {
                setError('Lỗi không xác định khi cập nhật danh mục.');
            }
        }
    };

    if (loading) return <div className='py-10 text-center'>Đang tải dữ liệu...</div>;

    if (error && !loading) return <div className='py-10 text-center text-red-500'>{error}</div>;

    return (
        <div className='mx-auto max-w-xl p-6'>
            <h2 className='mb-4 text-2xl font-bold'>Chỉnh sửa danh mục</h2>

            {success && <div className='mb-4 rounded bg-green-100 px-4 py-2 text-green-700'>{success}</div>}
            {error && <div className='mb-4 rounded bg-red-100 px-4 py-2 text-red-700'>{error}</div>}

            <form onSubmit={(e) => void handleSubmit(e)} className='space-y-4'>
                <div>
                    <label className='block font-medium'>Tên danh mục</label>
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

                <div>
                    <label className='block font-medium'>Danh mục cha</label>
                    <select
                        className='w-full rounded border p-2'
                        value={parentId}
                        onChange={(e) => {
                            setParentId(e.target.value);
                        }}
                    >
                        <option value=''>-- Không có --</option>

                        {categories.map(
                            (cat) =>
                                cat._id !== id && (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ),
                        )}
                    </select>
                </div>

                <div>
                    <label className='block font-medium'>Hình ảnh</label>
                    {preview && <img src={preview} alt='Preview' className='mb-2 h-20 w-20 rounded object-cover' />}
                    <input type='file' onChange={handleImageChange} />
                </div>

                <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
};

export default CategoryEdit;
