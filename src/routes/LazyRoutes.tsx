import React, { lazy } from 'react';

export const ManagerDiscountPage = lazy(() => import('@/pages/Discount/DiscountManager'));
export const CreateDiscountPage = lazy(() => import('@/pages/Discount/CreateDiscount'));
export const UpdateDiscountPage = lazy(() => import('@/pages/Discount/UpdateDiscount'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>...loading</div>}> {children} </React.Suspense>;
};
