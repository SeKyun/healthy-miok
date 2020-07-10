import React, { useState } from 'react';
import { Checkbox, DatePicker, Button } from 'antd';
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
  const [high, setHigh] = useState(false);
  const [low, setLow] = useState(false);
  const [bpm, setBpm] = useState(false);
  const [stTime, setstTime] = useState('');
  const [edTime, setedTime] = useState('');
  const [data, setData] = useState([]);
  const onChange = (value, dateString) => {
    setstTime(dateString[0]);
    setedTime(dateString[1]);
  };
  const onChangeHigh = (e) => {
    console.log(e.target.checked);
    setHigh(e.target.checked);
  };
  const onChangeLow = (e) => {
    console.log(e.target.checked);
    setLow(e.target.checked);
  };
  const onChangeBpm = (e) => {
    console.log(e.target.checked);
    setBpm(e.target.checked);
  };

  const getData = async () => {
    console.log(stTime);
    console.log(edTime);
    const data = {
      high,
      low,
      bpm,
    };
    const response = await axios.post(
      `http://miok.site:3001/api/blood-pressure/graph/`,
      data,
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
          <Checkbox onChange={onChangeHigh}>수축 (최고)</Checkbox>
          <Checkbox onChange={onChangeLow}>이완 (최저)</Checkbox>
          <Checkbox onChange={onChangeBpm}>심박수</Checkbox>
        </div>
        <div className="time-table">
          <RangePicker
            format="YYYY-MM-DD"
            onChange={onChange}
            style={{ margin: '0 2% 0 0', verticalAlign: 'middle' }}
          />
          <Button onClick={getData}>확인</Button>
        </div>
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
          <Legend iconSize={50} />
          <Line
            type="monotone"
            dataKey="high"
            stroke="#0000FF"
            activeDot={{ r: 8 }}
            strokeWidth={4}
            name="수축(최고)"
          />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#228B22"
            activeDot={{ r: 8 }}
            strokeWidth={4}
            name="이완(최저)"
          />
          <Line
            type="monotone"
            dataKey="bpm"
            stroke="#FF4500"
            activeDot={{ r: 8 }}
            name="심박수"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
