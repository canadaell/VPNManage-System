import React, { useState } from 'react';

import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate} from 'react-router-dom';
import MainMenu from '@/components/MainMenu';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const NavigateTo = useNavigate();


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