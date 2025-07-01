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

import { Link } from 'react-router-dom';

export const menuItems = [
    { key: '', icon: <HomeOutlined />, label: <Link to=''>Tổng quan</Link> },
    { key: '/order-statistics', icon: <BarChartOutlined />, label: 'Thống kê' },
    { key: '/orders', icon: <FileTextOutlined />, label: 'Quản lý đơn hàng' },
    {
        key: '/product-parent',
        icon: <AppstoreOutlined />,
        label: <Link to={PRIVATE_ROUTES.PRODUCT.All}>Quản lý sản phẩm</Link>,
        children: [
            {
                key: PRIVATE_ROUTES.PRODUCT.All,
                label: <Link to={PRIVATE_ROUTES.PRODUCT.All}>Danh sách sản phẩm</Link>,
            },
            {
                key: PRIVATE_ROUTES.PRODUCT.CREATE,
                label: <Link to={PRIVATE_ROUTES.PRODUCT.CREATE}>Tạo mới sản phẩm</Link>,
            },
        ],
    },
    { key: '/vouchers', icon: <GiftOutlined />, label: 'Quản lý mã giảm giá' },
    {
        key: '/discount',
        icon: <ShopOutlined />,
        label: <Link to={PRIVATE_ROUTES.DISCOUNT.All}>Quản lý khuyến mãi</Link>,
        children: [
            {
                key: PRIVATE_ROUTES.DISCOUNT.CREATE,
                label: <Link to={PRIVATE_ROUTES.DISCOUNT.CREATE}>Tạo mới giảm giá</Link>,
            },
        ],
    },
    { key: '/users', icon: <TeamOutlined />, label: 'Quản lý người dùng' },
    { key: '/category', icon: <FolderOpenOutlined />, label: 'Quản lý danh mục' },
    { key: '/vendor', icon: <ShopOutlined />, label: 'Quản lý nhà cung cấp' },
    { key: '/reviews', icon: <MessageOutlined />, label: 'Quản lý đánh giá' },
];
