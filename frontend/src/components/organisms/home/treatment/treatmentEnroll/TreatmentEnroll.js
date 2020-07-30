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
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="날짜"
          name="날짜"
          rules={[{ required: true, message: '날짜를 입력해주세요!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="시간">
          <TimePicker />
        </Form.Item>
        <Form.Item label="종류 추가">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              setState(true);
            }}
          />
          <Select />
        </Form.Item>
        <Form.Item label="메모">
          <Input.TextArea />
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
        <p>이름</p>
        <Input placeholder="새로운 처치 이름을 입력하세요."></Input>
        <p>기간</p>
        <RangePicker />
        <p>주기</p>
        <Radio.Group defaultValue={'1'}>
          <Radio value="매일">매일</Radio>
          <Radio value="특정요일">특정요일</Radio>
          <Radio value="특정날짜">특정날짜</Radio>
          <Radio value="매일">월</Radio>
          <Radio value="매일">화</Radio>
          <Radio value="매일">수</Radio>
          <Radio value="매일">목</Radio>
          <Radio value="매일">금</Radio>
          <Radio value="매일">토</Radio>
          <Radio value="매일">일</Radio>
        </Radio.Group>
        <p>메모</p>
        <Input.TextArea />
        <Button style={{ display: 'flex', float: 'right' }}>등록하기</Button>
      </Modal>
    </div>
  );
};

export default TreatmentEnroll;
