import React from 'react';
import './Footers.scss';
import { Modal, Button } from 'antd';

const Footers = () => {
  const [state, setState] = React.useState(false);
  const showModal = () => {
    setState(true);
  };
  const handleOk = () => {
    setState(false);
  };

  return (
    <div className="Footer">
      <div className="question">문의 : healthymiok@gmail.com</div>
      <Modal
        title="정보"
        visible={state}
        onCancel={handleOk}
        centered
        okText="확인"
        footer={null}
      >
        주세인 :{' '}
        <a
          href="https://github.com/dodi258"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>{' '}
        <br />
        허균 :{' '}
        <a
          href="https://github.com/Kyun2da"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>{' '}
        <br />
        디자인 도움 : 채희원
        <br />
      </Modal>
      <div>Backend : Sein Joo</div>
      <div>Frontend : Kyun Heo</div>
      <Button onClick={showModal} size="small">
        정보
      </Button>
    </div>
  );
};

export default Footers;
