import React from 'react';
import {
  Button,
  DatePicker,
  Form,
  Radio,
  TimePicker,
  InputNumber,
  Input,
} from 'antd';
import './enroll.scss';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import moment from 'moment';


const Enroll = () => {
  const dateFormat = 'YYYY/MM/DD';
  const [date, setDate] = React.useState(moment(new Date(), dateFormat));
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const SubmitFunc = () => {
    
  };
  return (
    <div className="enroll">
      <Form colon={false} size="large" {...formItemLayout}>
        <Form.Item
          name="datePickLayout"
          label="날짜"
          labelCol={{ span: 12, offset: 1 }}
          wrapperCol={{ span: 12, offset: 11 }}
        >
          <Button
            type="link"
            size="large"
            icon={<CaretLeftOutlined />}
            onClick={() => {
              setDate(moment(date, dateFormat).subtract('days', 1));
            }}
          />
          <DatePicker
            defaultValue={moment(date, dateFormat)}
            format={dateFormat}
            value={moment(date, dateFormat)}
          />
          <Button
            type="link"
            size="large"
            icon={<CaretRightOutlined />}
            onClick={() => {
              setDate(moment(date, dateFormat).add('days', 1));
            }}
          />
        </Form.Item>
        <Form.Item name="timeLayout" label="시기">
          <Radio.Group>
            <Radio.Button value="기상 직후">기상 직후</Radio.Button>
            <Radio.Button value="아침 식전">아침 식전</Radio.Button>
            <Radio.Button value="점심 식전">점심 식전</Radio.Button>
            <Radio.Button value="저녁 식전">저녁 식전</Radio.Button>
            <Radio.Button value="취침 전">취침 전</Radio.Button>
            <Radio.Button value="새벽">새벽</Radio.Button>
            <Radio.Button value="아침 식후">아침식후</Radio.Button>
            <Radio.Button value="7">점심식후</Radio.Button>
            <Radio.Button value="8">저녁식후</Radio.Button>
            <Radio.Button value="9">기타</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="layout" label="시간">
          <TimePicker use12Hours format="h:mm a" />
          <DatePicker
            defaultValue={moment(new Date(), dateFormat)}
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item name="input-number" label="수치">
          <InputNumber min={0} max={800} />
          <span className="ant-form-text">mg/dL</span>
        </Form.Item>
        <Form.Item name="memo" label="메모">
          <Input.TextArea
            rows={10}
            placeholder="쓰고 싶은 말이 있으면 적어주세요~"
          />
        </Form.Item>
        <Form.Item colon={false} wrapperCol={{ span: 12, offset: 12 }}>
          <Button type="primary" onClick={SubmitFunc}>
            등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Enroll;
