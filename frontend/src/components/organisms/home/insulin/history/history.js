import React from 'react';
import { Table, Button, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { formatDate } from '../../../../../utils/formatDate.js';
import { ToastContainer, toast } from 'react-toastify';

const { RangePicker } = DatePicker;

const History = () => {
  const [dataSource, setdataSource] = React.useState([]);
  const dateFormat = 'YYYY/MM/DD';
  const start_date = new Date(new Date().setMonth(new Date().getMonth() - 3));
  const end_date = new Date();
  const [dates, setDates] = React.useState([
    moment(start_date, dateFormat),
    moment(end_date, dateFormat),
  ]);
  const getData = async () => {
    const response = await axios.get(
      `http://miok.site:3001/api/insulin/date/`,
      {
        params: {
          startDate: formatDate(dates[0]),
          endDate: formatDate(dates[1]),
        },
      },
    );
    let arr = [];
    let last_key = 0;
    console.log(response);
    response.data.result.map((item) => {
      const idx = arr.findIndex((i) => i.date === item.today.substring(0, 10));
      if (idx === -1) {
        if (item._type === '지속성') {
          const temp = {
            key: ++last_key,
            date: item.today.substring(0, 10),
            지속성: item.unit,
          };
          arr.push(temp);
        } else {
          const temp = {
            key: ++last_key,
            date: item.today.substring(0, 10),
            [item._when]: item.unit,
          };
          arr.push(temp);
        }
      } else {
        if (item._type === '지속성') {
          arr[idx]['지속성'] = item.unit;
        } else {
          arr[idx][item._when] = item.unit;
        }
      }
      return 0;
    });
    setdataSource(arr);
    toast.success('성공적으로 데이터를 가져왔습니다!');
  };
  React.useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);
  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    return obj;
  };
  const columns = [
    {
      title: '날짜',
      dataIndex: 'date',
      render: renderContent,
    },
    {
      title: '지속성',
      dataIndex: '지속성',
      render: renderContent,
    },
    {
      title: '속효성',
      children: [
        {
          title: '아침',
          dataIndex: '아침 식전',
          key: '아침 식전',
          width: 200,
        },
        {
          title: '점심',
          dataIndex: '점심 식전',
          key: '점심 식전',
        },
        {
          title: '저녁',
          dataIndex: '저녁 식전',
          key: '저녁 식전',
        },
        {
          title: '기타1',
          dataIndex: '기타1',
          key: '기타1',
        },
        {
          title: '기타2',
          dataIndex: '기타2',
          key: '기타2',
        },
      ],
    },
    {
      title: '횟수',
      dataIndex: 'Diagnosis',
      render: renderContent,
    },
  ];
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
      <Table dataSource={dataSource} columns={columns} bordered></Table>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default History;
