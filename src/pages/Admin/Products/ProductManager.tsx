import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../../types/product';
import productService from '../../../services/product.service';
import axios from 'axios';

const formatDate = (isoDate: string | undefined): string => {
    if (!isoDate) return '—';
    return new Date(isoDate).toLocaleString('vi-VN', {
        hour12: false,
        dateStyle: 'short',
        timeStyle: 'short',
    });
};

const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async (): Promise<void> => {
        try {
            setLoading(true);
            const data = await productService.getAllProducts();
            setProducts(data.products || []);
        } catch (err: unknown) {
            console.error('Lỗi khi tải sản phẩm:', err);
            if (axios.isAxiosError(err)) {
                if (
                    err.response &&
                    typeof err.response.data === 'object' &&
                    err.response.data !== null &&
                    'message' in err.response.data
                ) {
                    const errorMsg = (err.response.data as { message?: string }).message;
                    if (typeof errorMsg === 'string') {
                        setError(`Không thể tải sản phẩm: ${errorMsg}`);
                    } else {
                        setError('Không thể tải sản phẩm: Lỗi không xác định từ máy chủ.');
                    }
                } else {
                    setError('Không thể tải sản phẩm: Lỗi mạng hoặc phản hồi không hợp lệ.');
                }
            } else {
                setError('Không thể tải sản phẩm: Lỗi không xác định.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchProducts();
    }, []);

    return (
        <div className='p-6'>
            <h2 className='mb-4 text-2xl font-bold'>Danh sách sản phẩm</h2>

            <div className='mb-4'>
                <Link to='/dashboard/products/create'>
                    <button className='rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700'>
                        + Thêm sản phẩm
                    </button>
                </Link>
            </div>

            {error && (
                <div className='mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'>{error}</div>
            )}

            {loading ? (
                <div className='py-10 text-center'>
                    <div className='mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-green-600' />
                    <p className='mt-2 text-gray-600'>Đang tải sản phẩm...</p>
                </div>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-md'>
                        <thead className='bg-gray-100 text-left font-semibold text-gray-700'>
                            <tr>
                                <th className='border-b px-4 py-2'>Tên</th>
                                <th className='border-b px-4 py-2'>Ảnh</th>
                                <th className='border-b px-4 py-2'>Tác giả</th>
                                <th className='border-b px-4 py-2'>Danh mục</th>
                                <th className='border-b px-4 py-2'>Nhà cung cấp</th>
                                <th className='border-b px-4 py-2'>Giá</th>
                                <th className='border-b px-4 py-2'>Đã bán</th>
                                <th className='border-b px-4 py-2'>Mô tả</th>
                                <th className='border-b px-4 py-2'>Trạng thái</th>
                                <th className='border-b px-4 py-2'>Tạo lúc</th>
                                <th className='border-b px-4 py-2'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id} className='hover:bg-gray-50'>
                                        <td className='border-b px-4 py-2'>{product.name}</td>
                                        <td className='border-b px-4 py-2'>
                                            {product.thumbnail ? (
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.name}
                                                    className='h-12 w-12 rounded object-cover'
                                                />
                                            ) : (
                                                <span className='italic text-gray-400'>Không có ảnh</span>
                                            )}
                                        </td>
                                        <td className='border-b px-4 py-2'>{product.author}</td>
                                        <td className='border-b px-4 py-2'>{product.categoryId?.name || '—'}</td>
                                        <td className='border-b px-4 py-2'>{product.vendorId?.name || '—'}</td>
                                        <td className='border-b px-4 py-2'>
                                            {product.priceRange.min}₫ - {product.priceRange.max}₫
                                        </td>
                                        <td className='border-b px-4 py-2'>{product.sold}</td>
                                        <td className='border-b px-4 py-2'>{product.description}</td>
                                        <td className='border-b px-4 py-2'>{product.status}</td>
                                        <td className='border-b px-4 py-2'>
                                            {product.createdAt ? formatDate(product.createdAt) : '—'}
                                        </td>

                                        <td className='space-x-2 border-b px-4 py-2'>
                                            <Link to={`/dashboard/products/edit/${product._id}`}>
                                                <button className='rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700'>
                                                    ✏️
                                                </button>
                                            </Link>
                                            {/* Có thể thêm nút xóa sản phẩm tại đây */}
                                            {/* <button
                        onClick={() => void handleDelete(product._id)}
                        className="ml-2 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        🗑️
                      </button> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className='py-4 text-center text-gray-500'>
                                        Không có sản phẩm nào.
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

export default ProductManager;
