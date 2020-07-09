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
            dataKey={idx}
            stroke="#000000"
            activeDot={{ r: 8 }}
            name="수치"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomChart;
