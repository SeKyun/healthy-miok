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
  InputNumber,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './MedicineEnroll.scss';

const MedicineEnroll = () => {
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
    <div className="MedicineEnroll">
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
        <Form.Item label="시기" name="password">
          <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">아침</Radio.Button>
            <Radio.Button value="b">점심</Radio.Button>
            <Radio.Button value="c">저녁</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="종류 추가">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            style={{ margin: '0 2rem 0 0' }}
            onClick={() => {
              setState(true);
            }}
          />
          <Select style={{ width: '40%' }} />
        </Form.Item>
        <Form.Item label="단위">
          <InputNumber />
        </Form.Item>
        <Form.Item label="메모">
          <Input.TextArea style={{ width: '50%' }} />
        </Form.Item>
      </Form>
      <Modal
        title="약 등록하기"
        visible={state}
        centered
        onCancel={() => {
          setState(false);
        }}
        okText={'확인'}
        footer={null}
      >
        <p>약 이름</p>
        <Input placeholder="약 이름을 입력하세요."></Input>
        <p>제조 업체</p>
        <Input placeholder="제조업체를 입력하세요."></Input>
        <p>용량</p>
        <InputNumber />
        <Radio.Group defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">mg</Radio.Button>
          <Radio.Button value="b">g</Radio.Button>
        </Radio.Group>
        <p>메모</p>
        <Input.TextArea style={{ width: '50%' }} />
        <p>약 관련 링크</p>
        <Input placeholder="약 관련 링크를 입력하세요."></Input>
        <Button style={{ display: 'flex', margin: '1rem 0' }}>등록하기</Button>
      </Modal>
    </div>
  );
};

export default MedicineEnroll;
