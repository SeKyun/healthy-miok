import React, { useState } from 'react';
import { Radio, DatePicker, Button } from 'antd';
import axios from 'axios';
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
            <Radio value="수축(최고)">수축 (최고)</Radio>
            <Radio value="이완(최저)">이완 (최저)</Radio>
            <Radio value="심박수">심박수</Radio>
          </Radio.Group>
        </div>
        <div className="time-table">
          <div>기간</div>
          <RangePicker format="YYYY-MM-DD" onChange={onChange} />
        </div>
        <Button onClick={getData}>확인</Button>
      </div>
      <ResponsiveContainer width="80%" height={600}>
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
          <XAxis dataKey="today" name="날짜" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="_value"
            stroke="#000000"
            activeDot={{ r: 8 }}
            name="수치"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
