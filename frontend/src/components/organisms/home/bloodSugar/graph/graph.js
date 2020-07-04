import React, { useState } from 'react';
import { Radio, DatePicker, Button } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import './graph.scss';

const { RangePicker } = DatePicker;
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Graph = () => {
  const [whenData, setWhenData] = useState('');
  const [stTime, setstTime] = useState('');
  const [edTime, setedTime] = useState('');
  const onChangeFunc = (e) => {
    setWhenData(e.target.value);
  };
  const onChange = (value, dateString) => {
    setstTime(dateString[0]);
    setedTime(dateString[1]);
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
      <ResponsiveContainer width={1200} height={600}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
