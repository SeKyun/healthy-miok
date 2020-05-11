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
      <Form
        size="large"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item
          name="radio-group"
          label="측정 시기"
          rules={[{ required: true, message: '측정 시기를 선택해주세요' }]}
        >
          <Radio.Group>
            <Radio value="a">아침 식전</Radio>
            <Radio value="b">아침 식후</Radio>
            <Radio value="c">점심 식전</Radio>
            <Radio value="d">점심 식후</Radio>
            <Radio value="e">저녁 식전</Radio>
            <Radio value="f">저녁 식후</Radio>
            <Radio value="g">취침 전</Radio>
            <Radio value="h">운동 후</Radio>
            <Radio value="i">새벽</Radio>
            <Radio value="j">기타</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="Day"
          label="측정 날짜"
          rules={[{ required: true, message: '측정 날짜를 선택해주세요' }]}
        >
          <DatePicker defaultValue={moment(new Date(), dateFormat)} />
        </Form.Item>
        <Form.Item
          name="time"
          label="측정 시간"
          rules={[{ required: true, message: '측정 시간을 선택해주세요' }]}
        >
          <TimePicker use12Hours format="h:mm a" defaultValue={moment()}/>
        </Form.Item>
        <Form.Item
          name="input-number"
          label="수치"
          rules={[{ required: true, message: '수치를 입력해주세요' }]}
        >
          <InputNumber min={0} max={800} />
          <span className="ant-form-text">mg/dL</span>
        </Form.Item>
        <Form.Item name="memo" label="메모">
          <Input.TextArea
            rows={4}
            placeholder="쓰고 싶은 말이 있으면 적어주세요~"
          />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Enroll;
