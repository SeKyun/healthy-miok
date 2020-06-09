import React from 'react';
import { Table, Button } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { formatDate } from '../../../../../utils/formatDate';

const { RangePicker } = DatePicker;

const History = () => {
  const dateFormat = 'YYYY/MM/DD';
  const start_date = new Date(new Date().setMonth(new Date().getMonth() - 3));
  const end_date = new Date();
  const [dates, setDates] = React.useState([
    moment(start_date, dateFormat),
    moment(end_date, dateFormat),
  ]);
  const [dataSource, setdataSource] = React.useState([{}]);
  const getData = async () => {
    const response = await axios.get(
      `http://miok.site:3001/api/blood-pressure/date/`,
      {
        params: {
          startDate: formatDate(dates[0]),
          endDate: formatDate(dates[1]),
        },
      },
    );
    console.log(response);
    response.data.result.map((it) => (it.today = it.today.substring(0, 10)));
    toast.success('성공적으로 데이터를 가져왔습니다!');
    setdataSource(response.data.result);

    const statResponse = await axios.get(
      `http://miok.site:3001/api/blood-pressure/statistics/`,
      {
        params: {
          startDate: formatDate(dates[0]),
          endDate: formatDate(dates[1]),
        },
      },
    );
    console.log(statResponse);
  };

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
      dataIndex: 'today',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index >= 1 && value === dataSource[index - 1].today) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            value === dataSource[index + i].today;
            i += 1
          ) {
            obj.props.rowSpan = i + 1;
          }
        }
        return obj;
      },
    },
    {
      title: '수축',
      dataIndex: 'value_high',
      render: renderContent,
    },
    {
      title: '이완',
      dataIndex: 'value_low',
      render: renderContent,
    },
    {
      title: '심박수',
      dataIndex: 'value_bpm',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        return obj;
      },
    },
    {
      title: '평균',
      dataIndex: 'avg',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index >= 1 && row.today === dataSource[index - 1].today) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            row.today === dataSource[index + i].today;
            i += 1
          ) {
            obj.props.rowSpan = i + 1;
          }
        }
        return obj;
      },
    },
    {
      title: '진단',
      dataIndex: 'Diagnosis',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index >= 1 && row.today === dataSource[index - 1].today) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            row.today === dataSource[index + i].today;
            i += 1
          ) {
            obj.props.rowSpan = i + 1;
          }
        }
        return obj;
      },
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
      <Table columns={columns} dataSource={dataSource} bordered></Table>
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
