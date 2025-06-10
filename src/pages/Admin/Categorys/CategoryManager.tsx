import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from '../../../types/category';
import categoryService from '../../../services/category.service';

const formatDate = (isoDate: string): string => {
    if (!isoDate) return '—';
    return new Date(isoDate).toLocaleString('vi-VN', {
        hour12: false,
        dateStyle: 'short',
        timeStyle: 'short',
    });
};

const CategoryManager: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async (): Promise<void> => {
        try {
            setLoading(true);
            const data = await categoryService.getAllCategories();
            setCategories(data.categories || []);
        } catch (err: unknown) {
            console.error('Lỗi khi tải danh mục:', err);
            setError('Không thể tải danh mục. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // const handleDelete = async (id: string): Promise<void> => {
    //     if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
    //         try {
    //             await categoryService.deleteCategory(id);
    //             setSuccess('Xóa danh mục thành công!');
    //             await fetchCategories(); // Tải lại danh sách sau khi xóa
    //         } catch (err) {
    //             console.error('Lỗi khi xóa danh mục:', err);
    //             setError('Lỗi khi xóa danh mục. Vui lòng thử lại.');
    //         }
    //     }
    // };

    return (
        <div className='p-6'>
            <h2 className='mb-4 text-2xl font-bold'>Danh mục sản phẩm</h2>

            <div className='mb-4'>
                <Link to='/dashboard/category/create'>
                    <button className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'>
                        + Thêm danh mục
                    </button>
                </Link>
            </div>

            {error && (
                <div className='mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'>{error}</div>
            )}

            {loading ? (
                <div className='py-10 text-center'>
                    <div className='mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600' />
                    <p className='mt-2 text-gray-600'>Đang tải danh mục...</p>
                </div>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-md'>
                        <thead className='bg-gray-100 text-left font-semibold text-gray-700'>
                            <tr>
                                <th className='border-b px-4 py-2'>ID</th>
                                <th className='border-b px-4 py-2'>Tên</th>
                                <th className='border-b px-4 py-2'>Slug</th>
                                <th className='border-b px-4 py-2'>Hình ảnh</th>
                                <th className='border-b px-4 py-2'>Tạo lúc</th>
                                <th className='border-b px-4 py-2'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category._id} className='hover:bg-gray-50'>
                                        <td className='border-b px-4 py-2'>{category._id}</td>
                                        <td className='border-b px-4 py-2'>{category.name}</td>
                                        <td className='border-b px-4 py-2'>{category.slug}</td>
                                        <td className='border-b px-4 py-2'>
                                            {category.image ? (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className='h-12 w-12 rounded object-cover'
                                                />
                                            ) : (
                                                <span className='italic text-gray-400'>Không có ảnh</span>
                                            )}
                                        </td>
                                        <td className='border-b px-4 py-2'>
                                            {category.createdAt ? formatDate(category.createdAt) : '—'}
                                        </td>
                                        <td className='border-b px-4 py-2'>
                                            <Link to={`/dashboard/category/update/${category._id}`}>
                                                <button className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'>
                                                    ✏️ Chỉnh sửa
                                                </button>
                                            </Link>
                                            {/* Thêm nút xóa nếu cần */}
                                            {/* <button
                                                onClick={() => void handleDelete(category._id)}
                                                className='ml-2 rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700'
                                            >
                                                🗑️ Xóa
                                            </button> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className='py-4 text-center text-gray-500'>
                                        Không có danh mục nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CategoryManager;
