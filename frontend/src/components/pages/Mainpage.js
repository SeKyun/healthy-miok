import React from 'react';
import './Mainpage.scss';
import { Layout } from 'antd';
import Antmenu from '../organisms/Antmenu.js';
const { Header, Footer, Sider, Content } = Layout;
const Mainpage = () => {
  return (
    <Layout>
      <Header>
        <Antmenu />
      </Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Mainpage;
