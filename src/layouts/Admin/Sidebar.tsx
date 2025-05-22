import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { to: '/dashboard', icon: 'fa-house', label: 'Tổng quan' },
        { to: '/dashboard/order-statistics', icon: 'fa-chart-line', label: 'Thống kê' },
        { to: '/dashboard/products', icon: 'fa-box', label: 'Sản phẩm' },
        { to: '/dashboard/categories', icon: 'fa-layer-group', label: 'Danh mục' },
        { to: '/dashboard/orders', icon: 'fa-file-invoice', label: 'Đơn hàng' },
        { to: '/dashboard/users', icon: 'fa-user-group', label: 'Người dùng' },
        { to: '/dashboard/reviews', icon: 'fa-comments', label: 'Đánh giá' },
        { to: '/dashboard/product-variants', icon: 'fa-sliders', label: 'Biến thể' },
        { to: '/dashboard/vouchers', icon: 'fa-ticket', label: 'Mã giảm giá' },
    ];

    return (
        <aside className='fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-gradient-to-b from-blue-100 to-white shadow-md'>
            <div className='flex flex-col items-center px-4 py-8'>
                <img src='/img/logo.png' alt='Logo' className='mb-6 w-20' />
                <h2 className='mb-6 text-lg font-bold uppercase tracking-wide text-gray-800'>Quản trị</h2>

                <nav className='w-full'>
                    <ul className='space-y-3'>
                        {menuItems.map((item, idx) => {
                            const isActive = location.pathname === item.to;
                            return (
                                <li key={idx}>
                                    <Link
                                        to={item.to}
                                        className={`flex items-center gap-4 rounded-xl px-4 py-3 shadow-sm transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-600 font-semibold text-white'
                                                : 'bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                                        }`}
                                    >
                                        <i className={`fa-solid ${item.icon} text-md w-5`} />
                                        <span className='text-base font-medium'>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default AdminSidebar;
