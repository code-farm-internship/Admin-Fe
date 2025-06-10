import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IVendor } from '../../../types/vendor';
import vendorService from '../../../services/vendor.service';

const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString('vi-VN', {
        hour12: false,
        dateStyle: 'short',
        timeStyle: 'short',
    });
};

const VendorManager: React.FC = () => {
    const [vendor, setVendor] = useState<IVendor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchVendor = async (): Promise<void> => {
        try {
            setLoading(true);
            const data: IVendor[] = await vendorService.getAllVendor();
            setVendor(data);
        } catch (_err) {
            setError('Không thể tải danh mục.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchVendor();
    }, []);

    return (
        <div className='p-6'>
            <h2 className='mb-4 text-2xl font-bold'>Nhà cung cấp</h2>

            <div className='mb-4'>
                <Link to='/dashboard/vendor/create'>
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
                    <div className='mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600'></div>
                </div>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-md'>
                        <thead className='bg-gray-100 text-left font-semibold text-gray-700'>
                            <tr>
                                <th className='border-b px-4 py-2'>ID</th>
                                <th className='border-b px-4 py-2'>Tên</th>
                                <th className='border-b px-4 py-2'>Tạo lúc</th>
                                <th className='border-b px-4 py-2'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendor.map((v) => (
                                <tr key={v._id} className='hover:bg-gray-50'>
                                    <td className='border-b px-4 py-2'>{v._id}</td>
                                    <td className='border-b px-4 py-2'>{v.name}</td>
                                    <td className='border-b px-4 py-2'>
                                        {v.createdAt ? formatDate(v.createdAt) : '—'}
                                    </td>
                                    <td className='border-b px-4 py-2'>
                                        <Link to={`/dashboard/vendor/update/${v._id}`}>
                                            <button className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'>
                                                ✏️ Chỉnh sửa
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VendorManager;
