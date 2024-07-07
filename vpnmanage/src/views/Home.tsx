import React, { useState } from 'react';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate} from 'react-router-dom';


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
  getItem('首页', '1', <PieChartOutlined />),
  getItem('商店', '2', <DesktopOutlined />),
  getItem('用户', 'sub1', <UserOutlined />, [
    getItem('我的账号', '3'),
    getItem('我的钱包', '4'),
    getItem('邀请注册', '5'),
  ]),
  getItem('节点列表', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('我的钱包', '9', <FileOutlined />),
];

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const NavigateTo = useNavigate();

  const menuClick = (e: {key: string}) => {
    console.log("点击了菜单", e.key)
    NavigateTo(e.key);
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* left sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={menuClick}/>
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