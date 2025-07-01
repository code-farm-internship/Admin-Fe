import { PRIVATE_ROUTES } from '@/constants/routes';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import CategoryAdd from '../pages/Admin/Categorys/CategoryAdd';
import CategoryEdit from '../pages/Admin/Categorys/CategoryEdit';
import CategoryManager from '../pages/Admin/Categorys/CategoryManager';
import Dashboard from '../pages/Admin/Dashboard';
import OrderManager from '../pages/Admin/OrderManager';
import OrderStatistics from '../pages/Admin/OrderStatistics';
import ProductVariantManager from '../pages/Admin/ProductVariantManager';
import ReviewManager from '../pages/Admin/ReviewManager';
import UserManager from '../pages/Admin/UserManager';
import VendorAdd from '../pages/Admin/Vendor/VendorAdd';
import VendorEdit from '../pages/Admin/Vendor/VendorEdit';
import VendorManager from '../pages/Admin/Vendor/VendorManager';
import VoucherManager from '../pages/Admin/VoucherManager';
import {
    CreateDiscountPage,
    CreateProductPage,
    CreateVariantPage,
    ManagerDiscountPage,
    ManagerProductPage,
    ManagerVariantPage,
    Suspense,
    UpdateDiscountPage,
    UpdateProductPage,
    UpdateVariantPage,
} from './LazyRoutes';

// import ProtectedRouteAdmin from '../components/ProtectedRouteAdmin';

export const privateRoutes = [
    {
        path: '/',
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
            {
                path: 'product',
                element: (
                    <Suspense>
                        <ManagerProductPage />
                    </Suspense>
                ),
            },
            {
                path: PRIVATE_ROUTES.PRODUCT.CREATE,
                element: (
                    <Suspense>
                        <CreateProductPage />
                    </Suspense>
                ),
            },
            {
                path: `${PRIVATE_ROUTES.PRODUCT.UPDATE}/:id`,
                element: (
                    <Suspense>
                        <UpdateProductPage />
                    </Suspense>
                ),
            },
            // @Variant,
            {
                path: `${PRIVATE_ROUTES.VARIANT.CREATE}/:productId`,
                element: (
                    <Suspense>
                        <CreateVariantPage />
                    </Suspense>
                ),
            },
            {
                path: `${PRIVATE_ROUTES.VARIANT.UPDATE}/:productId`,
                element: (
                    <Suspense>
                        <UpdateVariantPage />
                    </Suspense>
                ),
            },
            {
                path: `${PRIVATE_ROUTES.VARIANT.All}/:productId`,
                element: (
                    <Suspense>
                        <ManagerVariantPage />
                    </Suspense>
                ),
            },

            // discount
            {
                path: 'discount',
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
];
