import React from 'react';
import {
  Form,
  Radio,
  Button,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './TreatmentEnroll.scss';

const { RangePicker } = DatePicker;
const TreatmentEnroll = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [state, setState] = React.useState(false);
  return (
    <div className="TreatmentEnroll">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="날짜" name="날짜">
          <DatePicker />
        </Form.Item>
        <Form.Item label="시간">
          <TimePicker />
        </Form.Item>
        <Form.Item label="종류 추가">
          <Button
            type="primary"
            shape="circle"
            style={{ margin: '0 2rem 0 0' }}
            icon={<PlusOutlined />}
            onClick={() => {
              setState(true);
            }}
          />
          <Select style={{ width: '50%' }} />
        </Form.Item>
        <Form.Item label="메모">
          <Input.TextArea style={{ width: '50%' }} />
        </Form.Item>
      </Form>
      <Modal
        title="새로운 처치 등록"
        visible={state}
        centered
        onCancel={() => {
          setState(false);
        }}
        okText={'확인'}
        footer={null}
      >
        <p>명칭</p>
        <Input placeholder="명칭을 입력하세요" />
        <Button style={{ display: 'flex', float: 'right' }}>등록하기</Button>
      </Modal>
    </div>
  );
};

export default TreatmentEnroll;
