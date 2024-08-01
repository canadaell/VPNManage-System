import React from 'react';
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
      key: '1',
      danger: true,
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          Log out
        </a>
      ),
    }
  ];

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {

    };

    return (
        <div className='account'>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Account
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        </div>
    );
}

export default Logout;