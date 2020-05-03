import React, { useState } from 'react';
import { Layout } from 'antd';
import BloodSugarMenu from './Bloodsugarmenu';
import SugarselectMenu from './sugarselectmenu';
import Footers from '../../Footer/Footers';

const { Header, Footer, Content } = Layout;
const BloodsugarWrapper = () => {
  const [menuIdx, setMenuIdx] = useState(0);
  return (
    <Layout>
      <Header>
        <BloodSugarMenu func={setMenuIdx} />
      </Header>
      <Layout>
        <Content>
          <SugarselectMenu menuIdx={menuIdx} />
        </Content>
      </Layout>
      <Footer>
        <Footers />
      </Footer>
    </Layout>
  );
};

export default BloodsugarWrapper;
