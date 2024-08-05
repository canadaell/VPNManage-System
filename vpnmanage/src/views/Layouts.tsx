import React, { useState } from 'react';
import { Layout, theme} from 'antd';
import { Outlet} from 'react-router-dom';
import MainMenu from '@/components/MainMenu';
import Logout from '@/components/Logout';

const { Header, Content, Footer, Sider } = Layout;



const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* left sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
  <div className="logo">
    {collapsed ? (
      <img 
        src='../public/ACE.png' 
        alt='collapsed logo' 
        style={{width: '100%', height: '100%'}} 
      />
    ) : (
      <img 
        src='../public/ACELink.png' 
        alt='expanded logo' 
        style={{width: '100%', height: '100%'}} 
      />
    )}
  </div>
  <MainMenu />
</Sider>
      {/* right content */}
      <Layout className='site-layout'>
        
        {/* right content */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* account  */}
          <div className='account'>
            <Logout />
          </div>
        </Header>
            
        <Content style={{ margin: '16px 16px 0' }} className="site-layout-background">
            {/* content windows */}
            <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', padding:'0', lineHeight:'48px'}}>
          ACELink VPN ©{new Date().getFullYear()} Created by Mingde Zhou x23120428
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;