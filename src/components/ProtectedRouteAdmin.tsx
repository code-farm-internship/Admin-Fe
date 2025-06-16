// import { Navigate } from 'react-router-dom';
// import { ReactNode } from 'react';

// interface Props {
//     children: ReactNode;
// }

// const ProtectedRouteAdmin = ({ children }: Props) => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');

//     const isLoggedIn = !!user?.token;
//     const isAdmin = user?.role === 'admin';
//     if (!isLoggedIn) return <Navigate to="/login" replace />;

//     if (!isAdmin) return <Navigate to="/unauthorized" replace />;

//     return <>{children}</>;
// };

// export default ProtectedRouteAdmin;
