import React from 'react';
import { Form, Radio, Button, Input, DatePicker } from 'antd';

const { RangePicker } = DatePicker;
const Chubang = () => {
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

  const [, setState] = React.useState(false);
  return (
    <div className="TreatmentEnroll">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="약 이름" name="약 이름">
          <Input />
        </Form.Item>
        <Form.Item label="기간">
          <RangePicker />
          <Button
            type="primary"
            style={{ margin: '0 2rem 0 0' }}
            onClick={() => {
              setState(true);
            }}
          >
            종료
          </Button>
        </Form.Item>
        <Form.Item label="주기">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="a">매일</Radio.Button>
            <Radio.Button value="a">특정 요일</Radio.Button>
            <Radio.Button value="a">특정 날짜</Radio.Button>
            <Radio.Button value="a">월</Radio.Button>
            <Radio.Button value="a">화</Radio.Button>
            <Radio.Button value="a">수</Radio.Button>
            <Radio.Button value="a">목</Radio.Button>
            <Radio.Button value="b">금</Radio.Button>
            <Radio.Button value="b">토</Radio.Button>
            <Radio.Button value="b">일</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="횟수">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="a">1회</Radio.Button>
            <Radio.Button value="a">2회</Radio.Button>
            <Radio.Button value="a">3회</Radio.Button>
            <Radio.Button value="a">4회</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label=" ">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="a">기상직후</Radio.Button>
            <Radio.Button value="a">아침식전</Radio.Button>
            <Radio.Button value="a">점심식전</Radio.Button>
            <Radio.Button value="a">저녁식전</Radio.Button>
            <Radio.Button value="a">취침전</Radio.Button>
            <Radio.Button value="a">아침식사</Radio.Button>
            <Radio.Button value="a">점심식사</Radio.Button>
            <Radio.Button value="a">저녁식사</Radio.Button>
            <Radio.Button value="a">기타</Radio.Button>
            <Radio.Button value="a">아침식후</Radio.Button>
            <Radio.Button value="a">점심식후</Radio.Button>
            <Radio.Button value="a">저녁식후</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="메모">
          <Input.TextArea style={{ width: '50%' }} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Chubang;
