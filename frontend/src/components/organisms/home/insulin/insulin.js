import React, { useState } from 'react';
import InsulinMenu from './insulinMenu';
import InsulinSelectMenu from './insulinSelectMenu';
import { Layout } from 'antd';
import Footers from '../../Footer/Footers';

const { Header, Footer, Content } = Layout;

const InsulinWrapper = () => {
  const [menuIdx, setMenuIdx] = useState(0);
  return (
    <Layout>
      <Header>
        <InsulinMenu func={setMenuIdx} />
      </Header>
      <Layout>
        <Content>
          <InsulinSelectMenu menuIdx={menuIdx} />
        </Content>
      </Layout>
      <Footer>
        <Footers />
      </Footer>
    </Layout>
  );
};

export default InsulinWrapper;
