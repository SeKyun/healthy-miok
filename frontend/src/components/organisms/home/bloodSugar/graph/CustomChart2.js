import React from 'react';
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
const CustomChart2 = ({ data, idx }) => {
  return (
    <>
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
            dataKey={`아침 ${idx}`}
            stroke="#FFEB3B"
            activeDot={{ r: 8 }}
            name="아침"
          />
          <Line
            type="monotone"
            dataKey={`점심 ${idx}`}
            stroke="#FF5722"
            activeDot={{ r: 8 }}
            name="점심"
          />
          <Line
            type="monotone"
            dataKey={`저녁 ${idx}`}
            stroke="#673AB7 "
            activeDot={{ r: 8 }}
            name="저녁"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomChart2;
