import React from 'react';
import { Button, DatePicker, Form, Radio, InputNumber, Input } from 'antd';
import './enroll.scss';
import moment from 'moment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { formatDate } from '../../../../../utils/formatDate';
import 'react-toastify/dist/ReactToastify.css';

const Enroll = () => {
  const dateFormat = 'YYYY/MM/DD';
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const [form] = Form.useForm();
  const [dataID, setDataID] = React.useState();
  const [isDisable, setDisable] = React.useState(true);
  const [isUpdate, setUpdate] = React.useState(false);
  const [today, setToday] = React.useState(
    formatDate(moment(new Date(), dateFormat)),
  );

  const removeFormData = () => {
    form.setFieldsValue({
      desc_etc: null,
      value: null,
      memo: null,
    });
  };
  const onChange = async (e) => {
    if (e.target.value === '기타') {
      setDisable(false);
    } else {
      setDisable(true);
    }
    const response = await axios.get(
      `http://miok.site:3001/api/blood-sugar/record/`,
      {
        params: {
          today,
          when: e.target.value,
        },
      },
    );
    if (response.status === 200) {
      setUpdate(true);
      setDataID(response.data.result[0].id);
      form.setFieldsValue({
        desc_etc: response.data.result[0].desc_etc,
        value: response.data.result[0]._value,
        memo: response.data.result[0].memo,
      });
    } else if (response.status === 204) {
      setUpdate(false);
      removeFormData();
    } else {
      console.log('에러코드 발생');
    }
  };

  const onChangeToday = (date, dateString) => {
    console.log(dateString);
    setToday(dateString);
    removeFormData();
    setUpdate(false);
    setDisable(true);
  };

  const onFinish = async (data) => {
    data.today = formatDate(data.today);
    console.log(data);
    if (isUpdate) {
      const response = await axios
        .put(`http://miok.site:3001/api/blood-sugar/id/${dataID}`, data)
        .catch(() => {
          toast.error('에러가 났어요!');
        });
      toast.success('수정에 성공하였습니다!');
      console.log(response);
    } else {
      const response = await axios.post(
        'http://miok.site:3001/api/blood-sugar',
        data,
      );
      removeFormData();
      toast.success('등록에 성공하였습니다!');
      console.log(response);
    }
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
          <Radio.Group onChange={onChange} buttonStyle="solid">
            <Radio.Button value="기상 직후">기상 직후</Radio.Button>
            <Radio.Button value="아침 식전">아침 식전</Radio.Button>
            <Radio.Button value="점심 식전">점심 식전</Radio.Button>
            <Radio.Button value="저녁 식전">저녁 식전</Radio.Button>
            <Radio.Button value="기타">기타</Radio.Button>
            <br />
            <Radio.Button value="아침 식후">아침 식후</Radio.Button>
            <Radio.Button value="점심 식후">점심 식후</Radio.Button>
            <Radio.Button value="저녁 식후">저녁 식후</Radio.Button>
            <Radio.Button value="취침 전">취침 전</Radio.Button>
            <Radio.Button value="새벽">새벽</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="desc_etc" label="기타내용">
          <Input
            placeholder="기타내용을 선택시 입력합니다"
            disabled={isDisable}
          />
        </Form.Item>

        <Form.Item
          name="value"
          label="수치"
          rules={[{ required: true, message: '수치를 선택해주세요' }]}
        >
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
            {isUpdate ? '수정' : '등록'}
          </Button>
        </Form.Item>
      </Form>
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
