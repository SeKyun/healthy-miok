import React from 'react';
import {
  Form,
  Radio,
  DatePicker,
  TimePicker,
  Input,
  Button,
  InputNumber,
} from 'antd';
import moment from 'moment';
import './enroll.scss';
const Enroll = () => {
  const dateFormat = 'YYYY/MM/DD';

  return (
    <div className="enroll">
      <Form>
        <Form.Item name="radio-group" label="측정 시기">
          <Radio.Group>
            <div>
              <Radio value="a">아침 식전</Radio>
              <Radio value="b">아침 식후</Radio>
            </div>
            <div>
              <Radio value="c">점심 식전</Radio>
              <Radio value="d">점심 식후</Radio>
            </div>
            <div>
              <Radio value="e">저녁 식전</Radio>
              <Radio value="f">저녁 식후</Radio>
              <Radio value="g">취침 전</Radio>
            </div>
            <div>
              <Radio value="h">운동 후</Radio>
              <Radio value="i">새벽</Radio>
              <Radio value="j">기타</Radio>
            </div>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="Day" label="측정 시간">
          <DatePicker
            defaultValue={moment('2020/01/01', dateFormat)}
            format={dateFormat}
          />
          <TimePicker use12Hours format="h:mm a" />
        </Form.Item>
        <Form.Item label="InputNumber">
          <Form.Item name="input-number" noStyle>
            <InputNumber min={0} max={800} />
          </Form.Item>
          <span className="ant-form-text">mg/dL</span>
        </Form.Item>
        <Form.Item name="memo" label="memo">
          <Input.TextArea rows={4} placeholder="메모를 적어주세요" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Enroll;
