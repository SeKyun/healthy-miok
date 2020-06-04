import React from 'react';
import { Form, DatePicker, TimePicker, InputNumber, Input, Button } from 'antd';
import './enroll.scss';
import moment from 'moment';

const { TextArea } = Input;
const enroll = () => {
  const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };
  return (
    <div className="bloodPressureEnroll">
      <Form {...formItemLayout}>
        <Form.Item wrapperCol={{ offset: 11 }}>
          <DatePicker
            size="large"
            style={{
              margin: '5% 0px 8% 0px',
              fontSize: '40px',
            }}
            defaultValue={moment(new Date(), 'YYYY-MM-DD')}
            className="datePic"
          />
        </Form.Item>
        <Form.Item label="시간">
          <TimePicker
            size="large"
            format={'h:mm a'}
            defaultValue={moment(new Date(), 'HH:MM')}
          />
        </Form.Item>
        <Form.Item label="혈압 수축">
          <InputNumber size="large" />
          mmHg
        </Form.Item>
        <Form.Item label="혈압 이완">
          <InputNumber size="large" />
          mmHg
        </Form.Item>
        <Form.Item label="심박수">
          <InputNumber size="large" />
          bpm
        </Form.Item>
        <Form.Item label="메모" wrapperCol={{ span: 13 }}>
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
      </Form>
    </div>
  );
};

export default enroll;
