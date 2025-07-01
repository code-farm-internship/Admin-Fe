import Loader from '@/components/common/Loader';
import React, { lazy } from 'react';

export const ManagerProductPage = lazy(() => import('@/pages/Admin/Products/ProductManager'));
export const CreateProductPage = lazy(() => import('@/pages/Admin/Products/ProductAdd'));
export const UpdateProductPage = lazy(() => import('@/pages/Admin/Products/ProductEdit'));

export const ManagerVariantPage = lazy(() => import('@/pages/Admin/Variant/GetAllVariantByProductId'));
export const CreateVariantPage = lazy(() => import('@/pages/Admin/Variant/CreateVariant'));
export const UpdateVariantPage = lazy(() => import('@/pages/Admin/Variant/UpdateVariant'));

export const ManagerDiscountPage = lazy(() => import('@/pages/Discount/DiscountManager'));
export const CreateDiscountPage = lazy(() => import('@/pages/Discount/CreateDiscount'));
export const UpdateDiscountPage = lazy(() => import('@/pages/Discount/UpdateDiscount'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<>...Loading</>}> {children} </React.Suspense>;
};
