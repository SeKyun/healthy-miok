import React from 'react';
import { DatePicker, Table, Button } from 'antd';
import './history.scss';
import moment from 'moment';
import axios from 'axios';
import { formatDate } from '../../../../../utils/formatDate.js';

const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;

const History = () => {
  const dateFormat = 'YYYY/MM/DD';
  const start_date = new Date(new Date().setMonth(new Date().getMonth() - 3));
  const end_date = new Date();
  const [dates, setDates] = React.useState([
    moment(start_date, dateFormat),
    moment(end_date, dateFormat),
  ]);

  const [dataSource, setdataSource] = React.useState([
    {
      key: 1,
      date: '2020-05-23',
      '아침 식전': 300,
      '아침 식후': 200,
      '점심 식전': 200,
      '점심 식후': 200,
      '저녁 식전': 200,
      '저녁 식후': 200,
      '취침 전': 300,
      새벽: 200,
      기타: 200,
    },
  ]);
  const getData = async () => {
    const response = await axios.get(
      `http://miok.site:3001/api/blood-sugar/date/`,
      {
        params: {
          startDate: formatDate(dates[0]),
          endDate: formatDate(dates[1]),
        },
      },
    );
    let arr = [];
    let last_key = 0;
    response.data.result.map((item) => {
      const idx = arr.findIndex((i) => i.date === item.today.substring(0, 10));
      if (idx === -1) {
        const temp = {
          key: ++last_key,
          date: item.today.substring(0, 10),
          [item._when]: item._value,
        };
        arr.push(temp);
      } else {
        arr[idx][item._when] = item._value;
      }
      return 0;
    });
    setdataSource(arr);
  };
  React.useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div style={{ textAlign: 'center', margin: '3%' }}>
        <RangePicker
          size="large"
          defaultValue={[
            moment(start_date, dateFormat),
            moment(end_date, dateFormat),
          ]}
          onCalendarChange={(value) => {
            setDates(value);
          }}
        />
        <Button size="large" onClick={getData}>
          조회
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        bordered={true}
        pagination={{ position: 'bottomCenter' }}
      >
        <Column title="날짜" dataIndex="date" key="date" />
        <Column title="기상 직후" dataIndex="기상 직후" key="기상 직후" />
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
