import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../../../services/product.service';
import categoryService from '../../../services/category.service';
import vendorService from '../../../services/vendor.service';
import { ICategory } from '../../../types/category';
import { IVendor } from '../../../types/vendor';
import axios from 'axios';

const ProductAdd = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [categoryId, setCategoryId] = useState('');
    const [vendorId, setVendorId] = useState('');
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [vendors, setVendors] = useState<IVendor[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, vendorRes] = await Promise.all([
                    categoryService.getAllCategories(),
                    vendorService.getAllVendor(),
                ]);
                setCategories(catRes.categories || []);
                setVendors(vendorRes || []);
            } catch (err: unknown) {
                console.error('Lỗi khi tải danh sách category hoặc vendor:', err);
                setError('Không thể tải danh sách danh mục hoặc nhà cung cấp.');
            }
        };

        void fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name.trim() || !author.trim() || !priceMin.trim() || !priceMax.trim() || !categoryId || !vendorId) {
            setError('Vui lòng điền đầy đủ tất cả các trường bắt buộc.');
            return;
        }
        if (parseFloat(priceMin) > parseFloat(priceMax)) {
            setError('Giá thấp nhất không được lớn hơn giá cao nhất.');
            return;
        }
        if (!thumbnail) {
            setError('Vui lòng chọn ảnh sản phẩm.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('author', author);
            formData.append('priceMin', parseFloat(priceMin).toString());
            formData.append('priceMax', parseFloat(priceMax).toString());
            formData.append('categoryId', categoryId);
            formData.append('vendorId', vendorId);
            if (thumbnail) {
                formData.append('thumbnail', thumbnail);
            }

            await productService.createProduct(formData);
            setSuccess('Thêm sản phẩm thành công!');
            setTimeout(() => {
                navigate('/dashboard/products');
            }, 1500);
        } catch (err: unknown) {
            console.error('Tạo sản phẩm thất bại:', err);
            if (axios.isAxiosError(err)) {
                if (
                    err.response &&
                    typeof err.response.data === 'object' &&
                    err.response.data !== null &&
                    'message' in err.response.data
                ) {
                    const errorMsg = (err.response.data as { message?: string }).message;
                    if (typeof errorMsg === 'string') {
                        setError(`Tạo sản phẩm thất bại: ${errorMsg}`);
                    } else {
                        setError('Tạo sản phẩm thất bại: Lỗi không xác định từ máy chủ.');
                    }
                } else {
                    setError('Tạo sản phẩm thất bại: Lỗi mạng hoặc phản hồi không hợp lệ.');
                }
            } else if (err instanceof Error) {
                setError(`Tạo sản phẩm thất bại: ${err.message}`);
            } else {
                setError('Tạo sản phẩm thất bại: Lỗi không xác định.');
            }
        }
    };

    return (
        <div className='mx-auto max-w-xl p-6'>
            <h2 className='mb-4 text-xl font-bold'>Thêm sản phẩm mới</h2>

            {success && (
                <div className='mb-4 rounded border border-green-400 bg-green-100 px-4 py-2 text-green-700'>
                    {success}
                </div>
            )}

            {error && (
                <div className='mb-4 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-700'>{error}</div>
            )}

            <form onSubmit={void handleSubmit} className='space-y-4'>
                <input
                    type='text'
                    placeholder='Tên sản phẩm'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    required
                    className='w-full rounded border px-4 py-2'
                />
                <input
                    type='text'
                    placeholder='Tác giả'
                    value={author}
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                    required
                    className='w-full rounded border px-4 py-2'
                />
                <input
                    type='number'
                    placeholder='Giá thấp nhất'
                    value={priceMin}
                    onChange={(e) => {
                        setPriceMin(e.target.value);
                    }}
                    required
                    className='w-full rounded border px-4 py-2'
                />
                <input
                    type='number'
                    placeholder='Giá cao nhất'
                    value={priceMax}
                    onChange={(e) => {
                        setPriceMax(e.target.value);
                    }}
                    required
                    className='w-full rounded border px-4 py-2'
                />

                <select
                    value={categoryId}
                    onChange={(e) => {
                        setCategoryId(e.target.value);
                    }}
                    required
                    className='w-full rounded border px-4 py-2'
                >
                    <option value=''>-- Chọn danh mục --</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <select
                    value={vendorId}
                    onChange={(e) => {
                        setVendorId(e.target.value);
                    }}
                    required
                    className='w-full rounded border px-4 py-2'
                >
                    <option value=''>-- Chọn nhà cung cấp --</option>
                    {vendors.map((vendor) => (
                        <option key={vendor._id} value={vendor._id}>
                            {vendor.name}
                        </option>
                    ))}
                </select>
                <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                        setThumbnail(e.target.files?.[0] || null);
                    }}
                    className='w-full'
                    required
                />
                <button type='submit' className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700'>
                    Thêm sản phẩm
                </button>
            </form>
        </div>
    );
};

export default ProductAdd;
