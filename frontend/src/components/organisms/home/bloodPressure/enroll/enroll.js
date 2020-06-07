import React from 'react';
import { Form, DatePicker, TimePicker, InputNumber, Input, Button } from 'antd';
import './enroll.scss';
import moment from 'moment';
import { formatDate, formatTime } from '../../../../../utils/formatDate';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const { TextArea } = Input;
const enroll = () => {
  const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };
  const onFinish = async (data) => {
    data.today = formatDate(data.today);
    data.time = formatTime(data.time);
    console.log(data);
    const response = await axios
      .post(`http://miok.site:3001/api/blood-pressure`, data)
      .catch((error) => {
        toast.error('에러가 났어요!');
      });
    toast.success('등록에 성공하였습니다!');
    console.log(response);
  };
  return (
    <div className="bloodPressureEnroll">
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          today: moment(new Date(), 'YYYY-MM-DD'),
          time: moment(new Date(), 'HH:MM'),
        }}
      >
        <Form.Item wrapperCol={{ offset: 11 }} name="today">
          <DatePicker
            size="large"
            style={{
              margin: '5% 0px 8% 0px',
              fontSize: '40px',
            }}
            className="datePic"
          />
        </Form.Item>
        <Form.Item label="시간" name="time">
          <TimePicker size="large" format={'h:mm a'} />
        </Form.Item>
        <Form.Item label="혈압 수축">
          <Form.Item name="value_high" noStyle>
            <InputNumber size="large" />
          </Form.Item>
          <span className="ant-form-text"> mmHg</span>
        </Form.Item>
        <Form.Item label="혈압 이완">
          <Form.Item name="value_low" noStyle>
            <InputNumber size="large" />
          </Form.Item>
          <span className="ant-form-text"> mmHg</span>
        </Form.Item>
        <Form.Item label="심박수">
          <Form.Item name="value_bpm" noStyle>
            <InputNumber size="large" />
          </Form.Item>
          <span className="ant-form-text"> bpm</span>
        </Form.Item>
        <Form.Item label="메모" wrapperCol={{ span: 13 }} name="memo">
          <TextArea
            placeholder="쓰고싶은 말을 써주세요."
            style={{ width: '60%', fontSize: '30px' }}
          />
        </Form.Item>
        <Form.Item colon={false} wrapperCol={{ span: 13, offset: 12 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              margin: '5% 0px 0px 0px',
              fontSize: '30px',
              height: '100%',
            }}
          >
            등록
          </Button>
        </Form.Item>
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
      </Form>
    </div>
  );
};

export default enroll;
