import React, { useState } from 'react';
import { DatePicker, Table } from 'antd';

const { RangePicker } = DatePicker;

const columns = [
  {
    title: '날짜',
    dataIndex: 'name',
  },
  {
    title: '분류',
    dataIndex: 'age',
  },
  {
    title: '이름',
    dataIndex: 'address',
  },
  {
    title: '단위',
    dataIndex: 'address',
  },
  {
    title: '시기',
    dataIndex: 'address',
  },
];

const History = () => {
  const [data, setData] = useState(0);
  return (
    <div
      className="treatmentHistory"
      style={{ textAlign: 'center', margin: '3%' }}
    >
      <RangePicker style={{ margin: '3% 0' }} />
      <Table columns={columns} />
    </div>
  );
};

export default History;
