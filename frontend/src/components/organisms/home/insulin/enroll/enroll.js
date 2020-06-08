import React, { useState } from 'react';
import {
  Form,
  DatePicker,
  InputNumber,
  Input,
  Button,
  Select,
  Modal,
  Radio,
  TimePicker,
} from 'antd';
import './enroll.scss';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Enroll = () => {
  const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };
  const [state, setState] = useState(false);
  const showModal = () => {
    setState(true);
  };
  const handleOk = () => {
    setState(false);
  };

  return (
    <div className="bloodPressureEnroll">
      <Form {...formItemLayout}>
        <Form.Item wrapperCol={{ offset: 11 }}>
          <DatePicker
            size="large"
            style={{
              margin: '5% 0px 0px 0px',
              fontSize: '40px',
            }}
            defaultValue={moment(new Date(), 'YYYY-MM-DD')}
            className="datePic"
          />
        </Form.Item>
        <Form.Item label="종류">
          <Button
            type="primary"
            shape="circle"
            onClick={showModal}
            style={{ display: 'block' }}
            icon={<PlusOutlined />}
          />
          <Select defaultValue="lucy" style={{ width: 120 }}>
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option> */}
          </Select>
        </Form.Item>
        <Form.Item label="단위">
          <InputNumber size="large" />
          <Button></Button>
        </Form.Item>
        <Form.Item label="시기">
          <Radio.Group defaultValue={'1'}>
            <Radio value="1">아침식전</Radio>
            <Radio value="2">점심식전</Radio>
            <Radio value="3">저녁식전</Radio>
            <Radio value="4">기타</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="시간">
          <TimePicker size="large" format={'h:mm a'} />
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
      <Modal
        title="인슐린 등록"
        visible={state}
        onCancel={handleOk}
        centered
        okText={'확인'}
        footer={null}
      >
        <p>인슐린 이름</p>
        <Input placeholder="인슐린 이름을 입력하세요."></Input>
        <p>인슐린 종류</p>
        <Radio.Group defaultValue={'1'}>
          <Radio value="1">지속성</Radio>
          <Radio value="2">속효성</Radio>
        </Radio.Group>
        <Button style={{ display: 'flex', float: 'right' }}>등록하기</Button>
      </Modal>
    </div>
  );
};

export default Enroll;
