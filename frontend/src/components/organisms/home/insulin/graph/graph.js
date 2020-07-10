import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import CustomChart from './CustomChart';
import axios from 'axios';

const Graph = () => {
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const onChange1 = (date, dateString) => {
    setData1(dateString);
  };
  const onChange2 = (date, dateString) => {
    setData2(dateString);
  };
  const onChange3 = (date, dateString) => {
    setData3(dateString);
  };
  const onChange4 = (date, dateString) => {
    setData4(dateString);
  };
  const getData = async () => {
    const response = await axios.post();
    console.log(response);
  };
  return (
    <div>
      <div
        style={{
          display: 'grid',
          textAlign: 'center',
          margin: '0 40%',
        }}
      >
        <DatePicker onChange={onChange1} style={{ margin: '2% 0' }} />
        <DatePicker onChange={onChange2} style={{ margin: '2% 0' }} />
        <DatePicker onChange={onChange3} style={{ margin: '2% 0' }} />
        <DatePicker onChange={onChange4} style={{ margin: '2% 0' }} />
        <Button onClick={getData} style={{ width: '50%', margin: '0 25%' }}>
          확인
        </Button>
      </div>
      <div style={{ display: 'flex' }}>
        <CustomChart data={data1} idx={1} />
        <CustomChart data={data2} idx={2} />
      </div>
      <div style={{ display: 'flex' }}>
        <CustomChart data={data3} idx={3} />
        <CustomChart data={data4} idx={4} />
      </div>
    </div>
  );
};

export default Graph;
