import React, { useState } from 'react';
import './Mainpage.scss';
import { Layout } from 'antd';
import Antmenu from '../organisms/Antmenu.js';
const { Header, Footer, Content } = Layout;
const Mainpage = () => {
  const [menuIdx, setMenuIdx] = useState(1);
  return (
    <Layout>
      <Header>
        <Antmenu func={setMenuIdx} />
      </Header>
      <Layout>
        <Content>{menuIdx}</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Mainpage;
