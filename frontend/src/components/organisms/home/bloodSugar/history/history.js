import React from 'react';
import { Table } from 'antd';
const { Column, ColumnGroup } = Table;
const History = () => {
  return (
    <div>
      {' '}
      <Table>
        <ColumnGroup title="날짜">
          <Column title="월" dataIndex="firstName" key="firstName" />
          <Column title="일" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <ColumnGroup title="아침">
          <Column title="공복" dataIndex="age" key="age" />
          <Column title="식후2시간" dataIndex="address" key="address" />
        </ColumnGroup>
        <ColumnGroup title="점심">
          <Column title="식전" dataIndex="age" key="age" />
          <Column title="식후2시간" dataIndex="address" key="address" />
        </ColumnGroup>
        <ColumnGroup title="저녁">
          <Column title="식전" dataIndex="age" key="age" />
          <Column title="식후2시간" dataIndex="address" key="address" />
        </ColumnGroup>
        <Column title="취침전" dataIndex="age" key="age" />
        <Column title="새벽" dataIndex="age" key="age" />
        <Column title="기타" dataIndex="age" key="age" />
      </Table>
    </div>
  );
};

export default History;
