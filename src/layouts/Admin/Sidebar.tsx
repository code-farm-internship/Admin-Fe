import { menuItems } from '@/constants/adminMenuItems';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const AdminSidebar = ({ collapsed }: { collapsed: boolean }) => {
    const location = useLocation();

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} width={240} style={{ backgroundColor: '#001529' }}>
            <div className='flex h-16 items-center justify-center text-lg font-bold text-white'>
                {!collapsed ? <span>AYA BOOK</span> : <span>A</span>}
            </div>

            <Menu
                theme='dark'
                mode='inline'
                selectedKeys={[location.pathname]}
                style={{ backgroundColor: '#001529' }}
                items={menuItems}
            />
        </Sider>
    );
};

export default AdminSidebar;
