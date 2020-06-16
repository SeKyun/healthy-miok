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
import axios from 'axios';
import { formatDate, formatTime } from '../../../../../utils/formatDate';
import { ToastContainer, toast } from 'react-toastify';

const { Option } = Select;
const { TextArea } = Input;

const Enroll = () => {
  const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13 },
  };
  const [form] = Form.useForm();
  const [state, setState] = useState(false);
  const [insulinType, setinsulinType] = useState([]);
  const [insulinName, setinsulinName] = useState('');
  const [insulinSpecies, setinsulinSpecies] = useState('지속성');
  const [isDisable, setDisable] = useState(true);
  const [etcDisable, setEtcDisable] = useState(true);
  const [today, setToday] = React.useState(
    formatDate(moment(new Date(), 'YYYY-MM-DD')),
  );
  const [isUpdate, setUpdate] = React.useState(false);
  const [dataID, setDataID] = React.useState();
  const showModal = () => {
    setState(true);
  };
  const handleOk = () => {
    setState(false);
  };
  const getinsulinType = async () => {
    const response = await axios.get(`http://miok.site:3001/api/type-insulin`);
    console.log(response);
    setinsulinType(response.data.result);
  };
  const enrollinsulinType = async () => {
    console.log(insulinName);
    console.log(insulinSpecies);
    handleOk();
    const data = {
      name: insulinName,
      type: insulinSpecies,
    };
    const response = await axios.post(
      `http://miok.site:3001/api/type-insulin`,
      data,
    );
    getinsulinType();
    console.log(response);
  };
  const onChangeType = (e) => {
    setinsulinSpecies(e.target.value);
  };
  const removeFormData = () => {
    form.setFieldsValue({
      type: null,
      unit: null,
      desc_etc: null,
      time: null,
      memo: null,
    });
  };
  const onChangeToday = (date, dateString) => {
    console.log(dateString);
    setToday(dateString);
    removeFormData();
    setUpdate(false);
    setDisable(true);
  };
  const whenChange = async (e) => {
    if (e.target.value === '기타1' || e.target.value === '기타2') {
      setEtcDisable(false);
    } else {
      setEtcDisable(true);
    }
    const response = await axios.get(
      `http://miok.site:3001/api/insulin/record`,
      {
        params: {
          today: today,
          when: e.target.value,
        },
      },
    );
    console.log(response);
    if (response.status === 200) {
      setUpdate(true);
      setDataID(response.data.result[0].id);
      const parseTime = response.data.result[0]._time.substring(0, 5);
      console.log(parseTime);
      form.setFieldsValue({
        desc_etc: response.data.result[0].desc_etc,
        time: moment(parseTime, 'HH:mm'),
        unit: response.data.result[0].unit,
        type: response.data.result[0]._type,
        memo: response.data.result[0].memo,
      });
    } else if (response.status === 204) {
      setUpdate(false);
      removeFormData();
    } else {
      console.log('에러코드 발생');
    }
  };
  const onFinish = async (data) => {
    data.today = formatDate(data.today);
    data.time = formatTime(data.time);
    console.log(data);
    if (isUpdate) {
      const response = await axios
        .put(`http://miok.site:3001/api/insulin/id/${dataID}`, data)
        .catch((error) => {
          toast.error('에러가 났어요!');
        });
      toast.success('수정에 성공하였습니다!');
      console.log(response);
    } else {
      const response = await axios.post(
        'http://miok.site:3001/api/insulin',
        data,
      );
      removeFormData();
      toast.success('등록에 성공하였습니다!');
      console.log(response);
    }
  };
  React.useEffect(() => {
    getinsulinType();
  }, []);
  React.useEffect(() => {
    if (!isDisable && insulinName === '') {
      setDisable(true);
    }
    if (isDisable && insulinName !== '') {
      setDisable(false);
    }
  }, [insulinName, isDisable]);
  return (
    <div className="bloodPressureEnroll">
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        initialValues={{
          today: moment(new Date(), 'YYYY-MM-DD'),
          type: null,
          unit: null,
          when: null,
          desc_etc: null,
          time: moment(new Date(), 'HH:mm'),
          memo: null,
        }}
      >
        <Form.Item name="today" wrapperCol={{ offset: 11 }}>
          <DatePicker
            size="large"
            style={{
              margin: '5% 0px 0px 0px',
              fontSize: '40px',
            }}
            className="datePic"
            onChange={onChangeToday}
          />
        </Form.Item>
        <Form.Item name="when" label="시기">
          <Radio.Group onChange={whenChange}>
            <Radio value="아침 식전">아침식전</Radio>
            <Radio value="점심 식전">점심식전</Radio>
            <Radio value="저녁 식전">저녁식전</Radio>
            <Radio value="기타1">기타1</Radio>
            <Radio value="기타2">기타2</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="time" label="시간">
          <TimePicker size="large" format={'h:mm a'} />
        </Form.Item>
        <Form.Item label="종류">
          <Button
            type="primary"
            shape="circle"
            onClick={showModal}
            style={{ display: 'block' }}
            icon={<PlusOutlined />}
          />
          <Form.Item name="type" noStyle>
            <Select style={{ width: '50%' }}>
              {insulinType.map((it) => {
                return (
                  <Option value={it._name} key={it._name}>
                    {it._name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item name="unit" label="단위">
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item name="desc_etc" label="기타 내용">
          <Input
            placeholder="기타1 또는 기타2 선택시 입력"
            style={{ width: '50%' }}
            disabled={etcDisable}
          />
        </Form.Item>
        <Form.Item name="memo" label="메모" wrapperCol={{ span: 13 }}>
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
            {isUpdate ? '수정' : '등록'}
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
        <Input
          placeholder="인슐린 이름을 입력하세요."
          onChange={(e) => {
            setinsulinName(e.currentTarget.value);
          }}
        ></Input>
        <p>인슐린 종류</p>
        <Radio.Group
          defaultValue={'1'}
          onChange={onChangeType}
          value={insulinSpecies}
        >
          <Radio value="지속성">지속성</Radio>
          <Radio value="속효성">속효성</Radio>
        </Radio.Group>
        <Button
          style={{ display: 'flex', float: 'right' }}
          onClick={enrollinsulinType}
          disabled={isDisable}
        >
          등록하기
        </Button>
      </Modal>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Enroll;
