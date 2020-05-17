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
import moment from 'moment';
import axios from 'axios';
const formatDate = (d) => {
  console.log(d);
  const year = d._d.getFullYear();
  let month = d._d.getMonth() + 1;
  let date = d._d.getDate();
  console.log(month);
  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  return `${year}-${month}-${date}`;
};
const Enroll = () => {
  const dateFormat = 'YYYY/MM/DD';
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const [form] = Form.useForm();
  const [isAvailable, setAvailable] = React.useState(true);
  const [today, setToday] = React.useState(
    formatDate(moment(new Date(), dateFormat)),
  );

  const onChange = async (e) => {
    if (e.target.value === '기타') {
      setAvailable(false);
    } else {
      setAvailable(true);
    }
    console.log(today);

    const response = await axios.get(
      `http://miok.site:3001/api/blood-sugar/date/${form.getFieldValue(today)}`,
    );
    console.log(response);
  };
  const onChangeToday = (date, dateString) => {
    console.log(dateString);
    setToday(dateString);
  };
  const onFinish = async (data) => {
    data.today = formatDate(data.today);
    data.time = data.time._d.toTimeString().split(' ')[0];
    data.date = formatDate(data.date);
    console.log(data);
    const response = await axios.post(
      'http://miok.site:3001/api/blood-sugar',
      data,
    );
    console.log(response);
  };
  return (
    <div className="enroll">
      <Form
        colon={false}
        size="large"
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        initialValues={{
          today: moment(new Date(), dateFormat),
          when: null,
          desc_etc: null,
          time: null,
          date: moment(new Date(), dateFormat),
          value: 0,
          memo: null,
        }}
      >
        <Form.Item name="today" wrapperCol={{ span: 12, offset: 11 }}>
          <DatePicker
            onChange={onChangeToday}
            format={dateFormat}
            value={moment(new Date(), dateFormat)}
          />
        </Form.Item>

        <Form.Item
          name="when"
          label="시기"
          rules={[{ required: true, message: '측정 시기를 선택해주세요' }]}
        >
          <Radio.Group onChange={onChange}>
            <Radio.Button value="기상 직후">기상 직후</Radio.Button>
            <Radio.Button value="아침 식전">아침 식전</Radio.Button>
            <Radio.Button value="점심 식전">점심 식전</Radio.Button>
            <Radio.Button value="저녁 식전">저녁 식전</Radio.Button>
            <Radio.Button value="취침 전">취침 전</Radio.Button>
            <Radio.Button value="새벽">새벽</Radio.Button>
            <Radio.Button value="아침 식후">아침 식후</Radio.Button>
            <Radio.Button value="점심 식후">점심 식후</Radio.Button>
            <Radio.Button value="저녁 식후">저녁 식후</Radio.Button>
            <Radio.Button value="기타">기타</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="desc_etc" label="기타내용">
          <Input
            placeholder="기타내용을 선택시 입력합니다"
            disabled={isAvailable}
          />
        </Form.Item>

        <Form.Item label="시간" style={{ marginBottom: 0 }}>
          <Form.Item
            name="time"
            style={{ display: 'inline-block' }}
            rules={[{ required: true, message: '측정 시간을 선택해주세요' }]}
          >
            <TimePicker use12Hours format="h:mm a" />
          </Form.Item>

          <Form.Item name="date" style={{ display: 'inline-block' }}>
            <DatePicker format={dateFormat} />
          </Form.Item>
        </Form.Item>

        <Form.Item name="value" label="수치">
          <InputNumber min={0} max={800} />
        </Form.Item>

        <Form.Item name="memo" label="메모">
          <Input.TextArea
            rows={10}
            placeholder="쓰고 싶은 말이 있으면 적어주세요~"
          />
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

export default Enroll;
