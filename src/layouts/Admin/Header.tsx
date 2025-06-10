import React from 'react';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

interface HeaderProps {
    collapsed: boolean;
    toggleSidebar: () => void;
}

const AdminHeader: React.FC<HeaderProps> = ({ collapsed, toggleSidebar }) => {
    return (
        <Header
            style={{
                background: '#fff',
                padding: 0,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
            }}
        >
            <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleSidebar}
                style={{ fontSize: 18, width: 64, height: 64 }}
            />
        </Header>
    );
};

export default AdminHeader;
