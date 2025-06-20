import { PRIVATE_ROUTES } from '@/constants/routes';
import {
    AppstoreOutlined,
    BarChartOutlined,
    FileTextOutlined,
    FolderOpenOutlined,
    GiftOutlined,
    HomeOutlined,
    MessageOutlined,
    ShopOutlined,
    SlidersOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const AdminSidebar = ({ collapsed }: { collapsed: boolean }) => {
    const location = useLocation();

    const menuItems = [
        { key: '/admin', icon: <HomeOutlined />, label: <Link to='/admin'>Tổng quan</Link> },
        { key: '/admin/order-statistics', icon: <BarChartOutlined />, label: 'Thống kê' },
        { key: '/admin/orders', icon: <FileTextOutlined />, label: 'Quản lý đơn hàng' },
        { key: '/admin/products', icon: <AppstoreOutlined />, label: 'Quản lý sản phẩm' },
        { key: '/admin/product-variants', icon: <SlidersOutlined />, label: 'Quản lý biến thể' },
        { key: '/admin/vouchers', icon: <GiftOutlined />, label: 'Quản lý mã giảm giá' },
        {
            key: '/admin/discount',
            icon: <ShopOutlined />,
            label: <Link to={PRIVATE_ROUTES.DISCOUNT.All}>Quản lý khuyến mãi</Link>,
            children: [
                {
                    key: '/admin/discount/create',
                    label: <Link to={PRIVATE_ROUTES.DISCOUNT.CREATE}>Tạo mới giảm giá</Link>,
                },
            ],
        },
        { key: '/admin/users', icon: <TeamOutlined />, label: 'Quản lý người dùng' },
        { key: '/admin/category', icon: <FolderOpenOutlined />, label: 'Quản lý danh mục' },
        { key: '/admin/vendor', icon: <ShopOutlined />, label: 'Quản lý nhà cung cấp' },
        { key: '/admin/reviews', icon: <MessageOutlined />, label: 'Quản lý đánh giá' },
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
                items={menuItems}
            />
        </Sider>
    );
};

export default AdminSidebar;
