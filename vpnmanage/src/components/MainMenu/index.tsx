import { MenuProps } from "antd";
import {
    ApiOutlined,
    UserOutlined,
    HomeOutlined,
    MoneyCollectOutlined,
    ShopOutlined,
    WalletOutlined,
  } from '@ant-design/icons';
import React, { useState } from "react";
import { Menu, theme } from 'antd';
import { useNavigate} from 'react-router-dom';

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
    getItem('首页', 'home', <HomeOutlined />),
    getItem('商店', 'Store', <ShopOutlined />),
    getItem('用户', 'sub1', <UserOutlined />, [
      getItem('我的账号', 'account', <UserOutlined />),
      getItem('我的钱包', 'wallet', <WalletOutlined />),
      getItem('邀请注册', 'invite',<MoneyCollectOutlined />),
    ]),
    getItem('节点列表', 'nodes', <ApiOutlined />, )
  ];

  const Comp: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const NavigateTo = useNavigate();
  
    const menuClick = (e: {key: string}) => {
      console.log("menu clicked", e.key)
      NavigateTo(e.key);
    }

    return (
        <Menu 
        theme="dark" 
        defaultSelectedKeys={['home']} 
        mode="inline" items={items} 
        onClick={menuClick}
        />
    )
  }

  export default Comp;