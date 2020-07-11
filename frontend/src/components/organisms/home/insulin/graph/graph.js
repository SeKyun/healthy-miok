import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import CustomChart from './CustomChart';
import axios from 'axios';
import { countDate, newArray } from '../../../../../utils/countDate';

const Graph = () => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [date4, setDate4] = useState('');
  const [arrData, setArrData] = useState();

  const onChange1 = (date, dateString) => {
    setDate1(dateString);
  };
  const onChange2 = (date, dateString) => {
    setDate2(dateString);
  };
  const onChange3 = (date, dateString) => {
    setDate3(dateString);
  };
  const onChange4 = (date, dateString) => {
    setDate4(dateString);
  };
  const getData = async () => {
    const cnt = countDate(date1, date2, date3, date4);
    const data = {
      dates: newArray(date1, date2, date3, date4),
      cnt: cnt,
    };
    const response = await axios.post(
      'http://miok.site:3001/api/insulin/graph',
      data,
    );
    console.log(response);
    setArrData(response.data.result);
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
        <CustomChart
          data={arrData?.[0].data}
          idx={1}
          long={arrData?.[0].long}
        />
        <CustomChart
          data={arrData?.[1].data}
          idx={2}
          long={arrData?.[1].long}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <CustomChart
          data={arrData?.[2].data}
          idx={3}
          long={arrData?.[2].long}
        />
        <CustomChart
          data={arrData?.[3].data}
          idx={4}
          long={arrData?.[3].long}
        />
      </div>
    </div>
  );
};

export default Graph;
