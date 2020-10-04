import React from 'react';
import Iframe from 'react-iframe';
import { Select } from 'antd';

const Info = () => {
  return (
    <div style={{ textAlign: 'center', margin: '3%' }}>
      <Select style={{ width: '200px', margin: '3% 0' }} />
      <Iframe
        url="http://www.health.kr/searchDrug/result_drug.asp?drug_cd=A11A4290B0015"
        width="100%"
        height="500px"
      ></Iframe>
    </div>
  );
};

export default Info;
