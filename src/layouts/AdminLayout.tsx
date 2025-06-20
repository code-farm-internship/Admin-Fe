import { Layout } from 'antd';
import AdminSidebar from './Admin/Sidebar';
import AdminHeader from './Admin/Header';
// import AdminFooter from './Admin/Footer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const { Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <AdminSidebar collapsed={collapsed} />
            <Layout>
                <AdminHeader
                    collapsed={collapsed}
                    toggleSidebar={() => {
                        setCollapsed(!collapsed);
                    }}
                />
                <Content
                    style={{
                        backgroundColor: '#f6f9ff',
                        minHeight: '100vh',
                        padding: '24px 20px',
                    }}
                >
                    <div
                        style={{
                            background: '#ffffff',
                            borderRadius: '12px',
                            padding: '24px',
                            overflow: 'auto',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                {/* <AdminFooter /> */}
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
