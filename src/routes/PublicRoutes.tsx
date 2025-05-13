import { Navigate } from 'react-router-dom';

export const publicRoutes = [
    {
        path: '/',
        element: <div>Hello</div>,
        children: [],
    },
    {
        path: '404',
        element: <div>Not found</div>,
    },
    {
        path: '*',
        element: <Navigate to={'/404'} />,
    },
];
