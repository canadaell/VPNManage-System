import React, { useState } from 'react';

import {
  ApiOutlined,
  UserOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  ShopOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate} from 'react-router-dom';
import MainMenu from '@/components/MainMenu';

const { Header, Content, Footer, Sider } = Layout;

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

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const NavigateTo = useNavigate();

  const menuClick = (e: {key: string}) => {
    console.log("menu clicked", e.key)
    NavigateTo(e.key);
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* left sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <MainMenu />
      </Sider>
      {/* right content */}
      <Layout className='site-layout'>
        {/* right content */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* breacCrumbs */}
        <Breadcrumb style={{ lineHeight : '64px', margin: '0 16px 16px'}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
            
        <Content style={{ margin: '16px 16px 0' }} className="site-layout-background">
            {/* content windows */}
            <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', padding:'0', lineHeight:'48px'}}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;