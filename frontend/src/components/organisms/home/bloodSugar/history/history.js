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
  const [dataSource, setDataSource] = React.useState([
    {
      key: 1,
      month: 5,
      day: 23,
      '아침 식전': 300,
      '아침 식후': 200,
      '점심 식전': 200,
      '점심 식후': 200,
      '저녁 식전': 200,
      '저녁 식후': 200,
      '취침 전': 200,
      새벽: 200,
      기타: 200,
    },
  ]);
  const getData = async () => {
    const response = await axios.get('http://miok.site:3001/api/blood-sugar');
    console.log(response.data.result);
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
      <Table dataSource={dataSource} bordered={true}>
        <ColumnGroup title="날짜">
          <Column title="월" dataIndex="month" key="month" />
          <Column title="일" dataIndex="day" key="day" />
        </ColumnGroup>
        <ColumnGroup title="아침">
          <Column title="식전" dataIndex="아침 식전" key="아침 식전" />
          <Column title="식후2시간" dataIndex="아침 식후" key="아침 식후" />
        </ColumnGroup>
        <ColumnGroup title="점심">
          <Column title="식전" dataIndex="점심 식전" key="점심 식전" />
          <Column title="식후2시간" dataIndex="점심 식후" key="점심 식후" />
        </ColumnGroup>
        <ColumnGroup title="저녁">
          <Column title="식전" dataIndex="저녁 식전" key="저녁 식전" />
          <Column title="식후2시간" dataIndex="저녁 식후" key="저녁 식후" />
        </ColumnGroup>
        <Column title="취침전" dataIndex="취침 전" key="취침 전" />
        <Column title="새벽" dataIndex="새벽" key="새벽" />
        <Column title="기타" dataIndex="기타" key="기타" />
      </Table>
    </div>
  );
};

export default History;
