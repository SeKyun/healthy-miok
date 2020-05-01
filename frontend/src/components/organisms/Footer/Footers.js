import React from 'react';
import './Footers.scss';
import { Button } from 'antd';
const Footers = () => {
  return (
    <div className="Footer">
      <div className="question">문의 : healthymiok@gmail.com</div>
      <div className="maker">
        <Button>정보</Button>
        <div>Backend : Sein Joo</div>
        <div>Frontend : Kyun Heo</div>
      </div>
    </div>
  );
};

export default Footers;
