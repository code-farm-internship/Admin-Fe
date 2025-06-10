import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import CategoryManager from '../pages/Admin/Categorys/CategoryManager';
import OrderManager from '../pages/Admin/OrderManager';
import OrderStatistics from '../pages/Admin/OrderStatistics';
import ProductManager from '../pages/Admin/Products/ProductManager';
import ProductVariantManager from '../pages/Admin/ProductVariantManager';
import ReviewManager from '../pages/Admin/ReviewManager';
import UserManager from '../pages/Admin/UserManager';
import VoucherManager from '../pages/Admin/VoucherManager';
import CategoryAdd from '../pages/Admin/Categorys/CategoryAdd';
import CategoryEdit from '../pages/Admin/Categorys/CategoryEdit';
import VendorManager from '../pages/Admin/Vendor/VendorManager';
import VendorAdd from '../pages/Admin/Vendor/VendorAdd';
import VendorEdit from '../pages/Admin/Vendor/VendorEdit';
import ProductAdd from '../pages/Admin/Products/ProductAdd';
import ProductEdit from '../pages/Admin/Products/ProductEdit';

export const privateRoutes = [
    {
        path: '/dashboard',
        element: <AdminLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: '', element: <Dashboard /> },
            //cattegory
            { path: 'category', element: <CategoryManager /> },
            { path: 'category/create', element: <CategoryAdd /> },
            { path: 'category/update/:id', element: <CategoryEdit /> },
            //category
            { path: 'orders', element: <OrderManager /> },
            { path: 'order-statistics', element: <OrderStatistics /> },

            { path: 'product-variants', element: <ProductVariantManager /> },
            { path: 'reviews', element: <ReviewManager /> },
            { path: 'users', element: <UserManager /> },
            { path: 'vouchers', element: <VoucherManager /> },

            //vendor
            { path: 'vendor', element: <VendorManager /> },
            { path: 'vendor/create', element: <VendorAdd /> },
            { path: 'vendor/update/:id', element: <VendorEdit /> },
            //vendor

            //product
            { path: 'products', element: <ProductManager /> },
            { path: 'products/create', element: <ProductAdd /> },
            { path: '/dashboard/products/edit/:productId', element: <ProductEdit /> },
            //prodcut

            // Redirect all unknown paths under /dashboard to 404
            { path: '*', element: <Navigate to='/404' /> },
        ],
    },
];
