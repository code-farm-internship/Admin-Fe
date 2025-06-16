import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Space, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IVendor } from '../../../types/vendor';
import { getAllVendors } from '../../../services/vendor.service';

const { Title } = Typography;

const VendorManager = () => {
    const [vendors, setVendors] = useState<IVendor[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await getAllVendors();
            setVendors(data);
        } catch (err) {
            message.error('Lỗi khi tải danh sách nhà cung cấp');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns: ColumnsType<IVendor> = [
        {
            title: '#',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (desc: string | null) => desc || '-',
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type='primary' onClick={() => navigate(`/dashboard/vendor/update/${record._id}`)}>
                        Sửa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='p-4'>
            <Title level={3}>Quản lý nhà cung cấp</Title>
            <div style={{ marginBottom: 16 }}>
                <Link to='/dashboard/vendor/create'>
                    <Button type='primary'>➕ Thêm mới sản phẩm</Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={vendors}
                rowKey='_id'
                loading={loading}
                bordered
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default VendorManager;
