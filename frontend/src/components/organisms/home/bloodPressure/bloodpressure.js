import React, { useState } from 'react';
import { Layout } from 'antd';
import Footers from '../../Footer/Footers';
import BloodpressureMenu from './BloodpressureMenu';
import BloodpressureselectMenu from './bloodpressureslectmenu';

const { Header, Footer, Content } = Layout;
const BloodpressureWrapper = () => {
  const [menuIdx, setMenuIdx] = useState(0);
  return (
    <Layout>
      <Header>
        <BloodpressureMenu func={setMenuIdx} />
      </Header>
      <Layout>
        <Content>
          <BloodpressureselectMenu menuIdx={menuIdx} />
        </Content>
      </Layout>
      <Footer>
        <Footers />
      </Footer>
    </Layout>
  );
};

export default BloodpressureWrapper;
