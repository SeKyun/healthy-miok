import React, { useState } from 'react';
import { Layout } from 'antd';
import Footers from '../../Footer/Footers';
import TreatmentSelectMenu from './TreatmentSelectMenu';
import TreatmentMenu from './TreatmentMenu';

const { Header, Footer, Content } = Layout;

const TreatmentWrapper = () => {
  const [menuIdx, setMenuIdx] = useState(0);
  return (
    <Layout>
      <Header>
        <TreatmentMenu func={setMenuIdx} />
      </Header>
      <Layout>
        <Content>
          <TreatmentSelectMenu menuIdx={menuIdx} />
        </Content>
      </Layout>
      <Footer>
        <Footers />
      </Footer>
    </Layout>
  );
};

export default TreatmentWrapper;
