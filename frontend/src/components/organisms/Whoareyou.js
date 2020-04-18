import React from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import history from '../pages/history';
const Whoareyou = () => {
  return (
    <div>
      <div className="title">미옥님 이세요?</div>
      <div className="yesno">
        <Button ghost onClick={() => history.push('/secondpage')}>
          예
        </Button>
        <Button ghost onClick={() => history.push('/Error')}>
          아니오
        </Button>
      </div>
    </div>
  );
};

export default Whoareyou;
