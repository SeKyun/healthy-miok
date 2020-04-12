import React from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';

const Whoareyou = () => {
  return (
    <div>
      <div className="title">미옥님 이세요?</div>
      <div className="yesno">
        <Button ghost>예</Button>
        <Button ghost>아니오</Button>
      </div>
    </div>
  );
};

export default Whoareyou;
