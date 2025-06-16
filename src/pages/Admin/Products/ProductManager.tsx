import { useEffect, useState } from 'react';
import { Table, Button, Image, Tag, Typography, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate, Link } from 'react-router-dom';
import { IProduct } from '../../../types/product';
import { getAllProducts, toggleProductVisibility } from '../../../services/product.service';

const { Title } = Typography;

const ProductManager = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data.products);
        } catch (error) {
            message.error('Lỗi khi tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggle = async (id: string) => {
        const confirmToggle = window.confirm('Bạn có chắc muốn thay đổi trạng thái hiển thị của sản phẩm này?');
        if (!confirmToggle) return;

        try {
            const newStatus = await toggleProductVisibility(id);
            setProducts((prev) =>
                prev.map((product) => (product._id === id ? { ...product, isAvailable: newStatus } : product)),
            );
            message.success(`✅ Đã ${newStatus ? 'hiện' : 'ẩn'} sản phẩm`);
        } catch (error: any) {
            message.error('❌ Lỗi khi thay đổi trạng thái: ' + (error.response?.data?.message || error.message));
        }
    };

    const columns: ColumnsType<IProduct> = [
        {
            title: '#',
            dataIndex: '_id',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (url, record) =>
                url ? (
                    <Image width={48} height={48} src={url} alt={record.name} style={{ objectFit: 'cover' }} />
                ) : (
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            background: '#f0f0f0',
                            textAlign: 'center',
                            lineHeight: '48px',
                            color: '#999',
                        }}
                    >
                        No image
                    </div>
                ),
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Giá',
            dataIndex: 'priceRange',
            key: 'priceRange',
            render: (range) => `${range.min.toLocaleString()}₫ - ${range.max.toLocaleString()}₫`,
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (category: any) => category?.name || '-',
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'vendorId',
            key: 'vendorId',
            render: (vendor: any) => vendor?.name || '-',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isAvailable',
            key: 'isAvailable',
            render: (isAvailable: boolean) =>
                isAvailable ? <Tag color='green'>Hiển thị</Tag> : <Tag color='red'>Đã ẩn</Tag>,
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type='primary' onClick={() => navigate(`/dashboard/products/update/${record._id}`)}>
                        Sửa
                    </Button>
                    <Button danger={!record.isAvailable} onClick={() => handleToggle(record._id)}>
                        {record.isAvailable ? 'Ẩn' : 'Hiện'}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='p-4'>
            <Title level={3}>Quản lý sản phẩm</Title>
            <div style={{ marginBottom: 16 }}>
                <Link to='/dashboard/products/create'>
                    <Button type='primary'>➕ Thêm mới sản phẩm</Button>
                </Link>
            </div>
            <Table columns={columns} dataSource={products} rowKey='_id' loading={loading} bordered />
        </div>
    );
};

export default ProductManager;
