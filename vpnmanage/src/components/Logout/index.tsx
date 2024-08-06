import React, { useEffect, useState } from 'react';
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space, message } from "antd";
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState<string>('account');

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    const handleLogout = () => {
        // logout function
        // clear token
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        // logout success message
        message.success('logout success');
        
        // navigate to login page  
        navigate('/login');
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            danger: true,
            label: 'Log out',
            onClick: handleLogout
        }
    ];

    return (
        <div className='account'>
            <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {userEmail}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
}

export default Logout;