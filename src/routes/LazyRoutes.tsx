import React, { lazy } from 'react';

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>...loading</div>}> {children} </React.Suspense>;
};
