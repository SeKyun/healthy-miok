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
const CustomChart = ({ data, idx }) => {
  return (
    <>
      <ResponsiveContainer width="50%" height={600}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="today" name="날짜"></XAxis>
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="수치"
            stroke="#FF4500"
            activeDot={{ r: 8 }}
            name="혈당"
          />
          <Line
            type="monotone"
            dataKey="수치"
            stroke="#0000FF"
            activeDot={{ r: 8 }}
            name="인슐린"
          />
          <Legend iconSize={50} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomChart;
