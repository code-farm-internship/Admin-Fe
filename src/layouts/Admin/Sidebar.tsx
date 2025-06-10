import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    BarChartOutlined,
    AppstoreOutlined,
    FolderOpenOutlined,
    FileTextOutlined,
    TeamOutlined,
    MessageOutlined,
    SlidersOutlined,
    GiftOutlined,
    ShopOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const AdminSidebar = ({ collapsed }: { collapsed: boolean }) => {
    const location = useLocation();

    const menuItems = [
        { key: '/dashboard', icon: <HomeOutlined />, label: 'Tổng quan' },
        { key: '/dashboard/order-statistics', icon: <BarChartOutlined />, label: 'Thống kê' },
        { key: '/dashboard/products', icon: <AppstoreOutlined />, label: 'Sản phẩm' },
        { key: '/dashboard/category', icon: <FolderOpenOutlined />, label: 'Danh mục' },
        { key: '/dashboard/orders', icon: <FileTextOutlined />, label: 'Đơn hàng' },
        { key: '/dashboard/users', icon: <TeamOutlined />, label: 'Người dùng' },
        { key: '/dashboard/reviews', icon: <MessageOutlined />, label: 'Đánh giá' },
        { key: '/dashboard/product-variants', icon: <SlidersOutlined />, label: 'Biến thể' },
        { key: '/dashboard/vouchers', icon: <GiftOutlined />, label: 'Mã giảm giá' },
        { key: '/dashboard/vendor', icon: <ShopOutlined />, label: 'Nhà cung cấp' },
    ];

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} width={240} style={{ backgroundColor: '#001529' }}>
            <div className='flex h-16 items-center justify-center text-lg font-bold text-white'>
                {!collapsed ? <span>AYA BOOK</span> : <span>A</span>}
            </div>

            <Menu
                theme='dark'
                mode='inline'
                selectedKeys={[location.pathname]}
                style={{ backgroundColor: '#001529' }}
                items={menuItems.map((item) => ({
                    key: item.key,
                    icon: item.icon,
                    label: <Link to={item.key}>{item.label}</Link>,
                }))}
            />
        </Sider>
    );
};

export default AdminSidebar;
