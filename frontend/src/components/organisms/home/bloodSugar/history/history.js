import React from 'react';
import { DatePicker, Table, Button } from 'antd';
import './history.scss';
import moment from 'moment';
import axios from 'axios';

const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;

const History = () => {
  const dateFormat = 'YYYY/MM/DD';
  const date = new Date();
  const getData = async () => {
    const response = await axios.get('http://miok.site:3001/api/blood-sugar');
    console.log(response);
  };
  return (
    <div>
      <div style={{ textAlign: 'center', margin: '3%' }}>
        <RangePicker
          size="large"
          defaultValue={[
            moment(new Date(), dateFormat),
            moment(new Date(date.setMonth(date.getMonth() + 3)), dateFormat),
          ]}
        />
        <Button size="large" onClick={getData}>
          조회
        </Button>
      </div>
      <Table bordered={true}>
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
