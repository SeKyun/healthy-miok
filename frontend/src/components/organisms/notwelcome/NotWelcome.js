import React from 'react';
import './NotWelcome.scss';
import { Button } from 'antd';
import history from '../../pages/history';

const NotWelcome = () => {
  return (
    <div className="NotWelcome">
      <div>허가된 사용자가 아닙니다. 돌아가주세요..</div>
      <Button
        size="large"
        onClick={() => {
          history.push('/');
        }}
      >
        돌아가기
      </Button>
    </div>
  );
};

export default NotWelcome;
