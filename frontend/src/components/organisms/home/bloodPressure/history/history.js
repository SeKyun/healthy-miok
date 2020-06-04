import React from 'react';
import { Table } from 'antd';

const { Column } = Table;

const history = () => {
  return (
    <div>
      <Table>
        <Column title="날짜" dataIndex="date" key="date" />
        <Column title="수축" dataIndex="morning" key="morning" />
        <Column title="이완" dataIndex="afternoon" key="afternoon" />
        <Column title="심박수" dataIndex="night" key="night" />
        <Column title="평균" dataIndex="avg" key="avg" />
        <Column title="진단" dataIndex="Diagnosis" key="Diagnosis" />
      </Table>
    </div>
  );
};

export default history;
