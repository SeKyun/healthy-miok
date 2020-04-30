import React from 'react';
import './Footer.scss';
import { Button } from 'antd';
const Footers = () => {
  return (
    <div className="Footer">
      <div className="question">문의 : healthymiok@gmail.com</div>
      <div className="maker">
        <div>Frontend : Kyun Heo</div>
        <div>Backend : Sein Joo</div>
        <Button>정보</Button>
      </div>
    </div>
  );
};

export default Footers;
