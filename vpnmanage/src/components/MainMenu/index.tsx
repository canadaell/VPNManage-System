import { MenuProps } from "antd";
import {
    ApiOutlined,
    UserOutlined,
    HomeOutlined,
    ShopOutlined,
  } from '@ant-design/icons';
import React, { useState } from "react";
import { Menu } from 'antd';
import { useNavigate, useLocation} from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
    getItem('home', 'home', <HomeOutlined />),
    getItem('store', 'Store', <ShopOutlined />),
    getItem('account', 'account', <UserOutlined />),
    getItem('nodes', 'nodes', <ApiOutlined />, )
  ];

  const Comp: React.FC = () => {
    const [openKeys, setOpenKeys] = useState(['']);
    const NavigateTo = useNavigate();
    const currentLocation = useLocation();
    //console.log("current location", currentLocation.pathname)

  
    const menuClick = (e: {key: string}) => {
      //console.log("menu clicked", e.key)
      NavigateTo(e.key);
    }

    //let 

    //open and close menu
    const handleOpenChange = (keys: string[]) => {
      //console.log(keys)
      setOpenKeys([keys[keys.length - 1]])
    }

    return (
        <Menu 
        theme="dark"
        defaultSelectedKeys={[currentLocation.pathname]} //current selected keys
        mode="inline" items={items} 
        onClick={menuClick}
        onOpenChange={handleOpenChange}
        openKeys={openKeys}
        />
    )
  }

  export default Comp;