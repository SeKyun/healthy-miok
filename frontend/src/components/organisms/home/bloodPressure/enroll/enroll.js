import React from 'react';
import {
  Form,
  Radio,
  DatePicker,
  TimePicker,
  InputNumber,
  Input,
  Button,
} from 'antd';
import './enroll.scss';

const { TextArea } = Input;
const enroll = () => {
  const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 13 },
  };
  return (
    <div className="bloodPressureEnroll">
      <Form {...formItemLayout}>
        <Form.Item wrapperCol={{ offset: 12 }}>
          <DatePicker size="large" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11 }}>
          <Radio.Group name="radiogroup" size="large">
            <Radio value={1}>
              아침{' '}
              <span role="img" aria-label="morning">
                🌅
              </span>
            </Radio>
            <Radio value={2}>
              점심{' '}
              <span role="img" aria-label="afternoon">
                🌞
              </span>
            </Radio>
            <Radio value={3}>
              저녁{' '}
              <span role="img" aria-label="night">
                🌜
              </span>
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="시간">
          <TimePicker size="large" />
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
        </Form.Item>
        <Form.Item
          label="메모"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          <TextArea placeholder="쓰고싶은 말을 써주세요." />
        </Form.Item>
        <Form.Item colon={false} wrapperCol={{ span: 12, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default enroll;
