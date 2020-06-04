import React from 'react';
import { Form, DatePicker, InputNumber, Input, Button, Select } from 'antd';
import './enroll.scss';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

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
        <Form.Item label="종류">
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
        <Form.Item label="단위">
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item label="시기">
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item label="시간">
          <InputNumber size="large" />
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
