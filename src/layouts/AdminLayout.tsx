import AdminHeader from './Admin/Header';
import AdminSidebar from './Admin/Sidebar';
import { Outlet } from 'react-router-dom';
import AdminFooter from './Admin/Footer';

const AdminLayout = () => {
    return (
        <main className='flex'>
            <AdminSidebar />
            <AdminHeader />
            <div className='min-h-screen flex-1 bg-[#f6f9ff] pl-[240px] pt-[64px]'>
                <div className='p-6'>
                    <Outlet />
                </div>
                <AdminFooter />
            </div>
        </main>
    );
};

export default AdminLayout;
