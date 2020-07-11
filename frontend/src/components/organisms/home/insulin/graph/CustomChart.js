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
  ReferenceDot,
  Label,
} from 'recharts';
const CustomChart = ({ data, idx, long }) => {
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
          <XAxis dataKey="when" name="날짜"></XAxis>
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="blood_sugar"
            stroke="#FF4500"
            activeDot={{ r: 8 }}
            name="혈당"
            connectNulls={true}
          />
          <Line
            type="monotone"
            dataKey="short"
            stroke="#0000FF"
            activeDot={{ r: 8 }}
            name="속효성"
            connectNulls={true}
          />
          {long && (
            <ReferenceDot
              r={5}
              fill="red"
              stroke="none"
              x="아침 식전"
              y={long}
              label={<Label value={`지속성 : ${long}`} position="top" />}
            />
          )}
          <Legend iconSize={50} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomChart;
