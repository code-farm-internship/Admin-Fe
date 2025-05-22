import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import CategoryManager from '../pages/Admin/CategoryManager';
import OrderManager from '../pages/Admin/OrderManager';
import OrderStatistics from '../pages/Admin/OrderStatistics';
import ProductManager from '../pages/Admin/ProductManager';
import ProductVariantManager from '../pages/Admin/ProductVariantManager';
import ReviewManager from '../pages/Admin/ReviewManager';
import UserManager from '../pages/Admin/UserManager';
import VoucherManager from '../pages/Admin/VoucherManager';

export const privateRoutes = [
    {
        path: '/dashboard',
        element: <AdminLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: '', element: <Dashboard /> },
            { path: 'categories', element: <CategoryManager /> },
            { path: 'orders', element: <OrderManager /> },
            { path: 'order-statistics', element: <OrderStatistics /> },
            { path: 'products', element: <ProductManager /> },
            { path: 'product-variants', element: <ProductVariantManager /> },
            { path: 'reviews', element: <ReviewManager /> },
            { path: 'users', element: <UserManager /> },
            { path: 'vouchers', element: <VoucherManager /> },

            // Redirect all unknown paths under /dashboard to 404
            { path: '*', element: <Navigate to='/404' /> },
        ],
    },
];
