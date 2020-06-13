import React from 'react';
import { Table, Button, Popconfirm, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { formatDate } from '../../../../../utils/formatDate';
import {
  setBloodPressureStatus,
  StatusLight,
} from '../../../../../utils/setBloodPressureStatus';

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
  const pageChange = (page, pageSize) => {
    console.log(page, pageSize);
  };
  const handleDelete = async (id) => {
    console.log(id);
    const response = await axios.delete(
      `http://miok.site:3001/api/blood-pressure/id/${id}`,
    );
    console.log(response);
    toast.success('성공적으로 데이터를 삭제하였습니다!');
    setdataSource(dataSource.filter((item) => item.id !== id));
  };

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
        let lowAvg = 0,
          highAvg = 0,
          bpmAvg = 0;
        if (index >= 1 && row.today === dataSource[index - 1].today) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            row.today === dataSource[index + i].today;
            i += 1
          ) {
            highAvg += dataSource[index + i].value_high;
            lowAvg += dataSource[index + i].value_low;
            bpmAvg += dataSource[index + i].value_bpm;
            obj.props.rowSpan = i + 1;
          }
        }
        highAvg /= obj.props.rowSpan;
        lowAvg /= obj.props.rowSpan;
        bpmAvg /= obj.props.rowSpan;
        if (highAvg && obj.props.rowSpan !== 0) {
          obj.children = `수축: ${Math.round(highAvg)}, 이완: ${Math.round(
            lowAvg,
          )}, 심박수: ${Math.round(bpmAvg)}`;
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
        let lowAvg = 0,
          highAvg = 0;
        if (index >= 1 && row.today === dataSource[index - 1].today) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            row.today === dataSource[index + i].today;
            i += 1
          ) {
            highAvg += dataSource[index + i].value_high;
            lowAvg += dataSource[index + i].value_low;
            obj.props.rowSpan = i + 1;
          }
          if (highAvg && obj.props.rowSpan !== 0) {
            highAvg /= obj.props.rowSpan;
            lowAvg /= obj.props.rowSpan;
            const status = setBloodPressureStatus(
              Math.round(highAvg),
              Math.round(lowAvg),
            );
            console.log(status);
            obj.children = StatusLight(status);
          }
        }

        return obj;
      },
    },
    {
      title: '삭제',
      dataIndex: 'delete',
      render: (value, row, index) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="삭제하시겠습니까?"
            onConfirm={() => handleDelete(row.id)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        ) : null,
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
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={{ onChange: { pageChange } }}
        rowKey="id"
      ></Table>
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
