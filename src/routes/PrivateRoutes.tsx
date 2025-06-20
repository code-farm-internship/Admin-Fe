import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import CategoryAdd from '../pages/Admin/Categorys/CategoryAdd';
import CategoryEdit from '../pages/Admin/Categorys/CategoryEdit';
import CategoryManager from '../pages/Admin/Categorys/CategoryManager';
import Dashboard from '../pages/Admin/Dashboard';
import OrderManager from '../pages/Admin/OrderManager';
import OrderStatistics from '../pages/Admin/OrderStatistics';
import ProductAdd from '../pages/Admin/Products/ProductAdd';
import ProductEdit from '../pages/Admin/Products/ProductEdit';
import ProductManager from '../pages/Admin/Products/ProductManager';
import ProductVariantManager from '../pages/Admin/ProductVariantManager';
import ReviewManager from '../pages/Admin/ReviewManager';
import UserManager from '../pages/Admin/UserManager';
import VendorAdd from '../pages/Admin/Vendor/VendorAdd';
import VendorEdit from '../pages/Admin/Vendor/VendorEdit';
import VendorManager from '../pages/Admin/Vendor/VendorManager';
import VoucherManager from '../pages/Admin/VoucherManager';
import { CreateDiscountPage, ManagerDiscountPage, Suspense, UpdateDiscountPage } from './LazyRoutes';

// import ProtectedRouteAdmin from '../components/ProtectedRouteAdmin';

export const privateRoutes = [
    {
        path: '/admin',
        element: (
            // <ProtectedRouteAdmin>
            <AdminLayout />
            // </ProtectedRouteAdmin>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: '', element: <Dashboard /> },

            // category
            { path: 'category', element: <CategoryManager /> },
            { path: 'category/create', element: <CategoryAdd /> },
            { path: 'category/update/:id', element: <CategoryEdit /> },

            // orders
            { path: 'orders', element: <OrderManager /> },
            { path: 'order-statistics', element: <OrderStatistics /> },

            // other
            { path: 'product-variants', element: <ProductVariantManager /> },
            { path: 'reviews', element: <ReviewManager /> },
            { path: 'users', element: <UserManager /> },
            { path: 'vouchers', element: <VoucherManager /> },

            // vendor
            { path: 'vendor', element: <VendorManager /> },
            { path: 'vendor/create', element: <VendorAdd /> },
            { path: 'vendor/update/:id', element: <VendorEdit /> },

            // product
            { path: 'products', element: <ProductManager /> },
            { path: 'products/create', element: <ProductAdd /> },
            { path: 'products/update/:id', element: <ProductEdit /> },

            // discount
            {
                path: 'discount',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ManagerDiscountPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateDiscountPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: (
                            <Suspense>
                                <UpdateDiscountPage />
                            </Suspense>
                        ),
                    },
                ],
            },

            { path: '*', element: <Navigate to='/404' replace={false} /> },
        ],
    },
];
