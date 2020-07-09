import React, { useState } from 'react';
import { Radio, DatePicker, Button } from 'antd';
import axios from 'axios';
import './graph.scss';
import CustomChart from './CustomChart';
import CustomChart2 from './CustomChart2';
import CustomChart3 from './CustomChart3';
const { RangePicker } = DatePicker;

const Graph = () => {
  const [whenData, setWhenData] = useState('');
  const [stTime, setstTime] = useState('');
  const [edTime, setedTime] = useState('');
  const [data, setData] = useState([]);
  const onChangeFunc = (e) => {
    setWhenData(e.target.value);
  };
  const onChange = (value, dateString) => {
    setstTime(dateString[0]);
    setedTime(dateString[1]);
  };
  const project = () => {
    switch (whenData) {
      case '기상 직후':
      case '취침 전':
      case '새벽':
        return <CustomChart data={data} idx={whenData} />;
      case '식전':
      case '식후':
        return <CustomChart2 data={data} idx={whenData} />;
      case '전체':
        return <CustomChart3 data={data} idx={whenData} />;
      default:
        return (
          <div style={{ textAlign: 'center', margin: '0 auto' }}>
            데이터를 선택해주세요
          </div>
        );
    }
  };
  const getData = async () => {
    console.log(whenData);
    console.log(stTime);
    console.log(edTime);
    const response = await axios.get(
      `http://miok.site:3001/api/blood-sugar/when/${whenData}`,
      {
        params: {
          startDate: stTime,
          endDate: edTime,
        },
      },
    );
    console.log(response);
    setData(response.data.result);
  };
  return (
    <div className="sugar-graph">
      <div className="dataform">
        <div className="when-table">
          <div>시기 </div>
          <Radio.Group onChange={onChangeFunc} value={whenData}>
            <Radio.Button value="기상 직후">기상 직후</Radio.Button>
            <Radio.Button value="취침 전">취침 전</Radio.Button>
            <Radio.Button value="새벽">새벽</Radio.Button>
            <Radio.Button value="식전">식전</Radio.Button>
            <Radio.Button value="식후">식후</Radio.Button>
            <Radio.Button value="전체">전체</Radio.Button>
          </Radio.Group>
        </div>
        <div className="time-table">
          <div>기간</div>
          <RangePicker format="YYYY-MM-DD" onChange={onChange} />
        </div>
        <Button onClick={getData}>확인</Button>
      </div>
      {project()}
    </div>
  );
};

export default Graph;
