import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Image, Space, Typography, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ICategory } from '../../../types/category';
import { getAllCategories, deleteCategory } from '../../../services/category.service';

const { Title } = Typography;

const CategoryManager = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            message.error('Lỗi khi tải danh sách danh mục');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory(id);
            message.success('🗑️ Đã xoá danh mục');
            setCategories((prev) => prev.filter((cat) => cat._id !== id));
        } catch (error: any) {
            message.error('❌ Lỗi khi xoá: ' + (error.response?.data?.message || error.message));
        }
    };

    const columns: ColumnsType<ICategory> = [
        {
            title: '#',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image: string, record) =>
                image ? (
                    <Image src={image} alt={record.name} width={64} height={64} style={{ objectFit: 'cover' }} />
                ) : (
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            backgroundColor: '#f0f0f0',
                            textAlign: 'center',
                            lineHeight: '64px',
                            color: '#999',
                        }}
                    ></div>
                ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (desc: string | null) => desc || '-',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type='primary' onClick={() => navigate(`/dashboard/category/update/${record._id}`)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title='Bạn có chắc muốn xoá danh mục này?'
                        onConfirm={() => handleDelete(record._id)}
                        okText='Xoá'
                        cancelText='Huỷ'
                    >
                        <Button danger>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className='p-4'>
            <Title level={3}>Quản lý danh mục</Title>
            <div style={{ marginBottom: 16 }}>
                <Link to='/dashboard/category/create'>
                    <Button type='primary'>➕ Thêm mới sản phẩm</Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={categories}
                loading={loading}
                rowKey='_id'
                bordered
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default CategoryManager;
