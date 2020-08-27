import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import './Whoareyou.scss';
import history from '../../pages/history';

const name = '박미옥';

const Whoareyou = () => {
  const searchFunc = (value) => {
    if (value === name) {
      history.push('/secondpage');
    } else {
      history.push('/Error');
    }
  };
  const { Search } = Input;
  return (
    <div className="Whoareyou">
      <img src="/images/banner/healthymiok_banner_1.jpg" alt="인슐린" />
      <div className="Whoareyou2">
        <div className="title">이름이 어떻게 되세요?</div>
        <div className="yesno">
          <Search
            placeholder="이름을 입력하세요"
            enterButton="확인"
            size="large"
            onSearch={searchFunc}
          />
        </div>
      </div>
    </div>
  );
};

export default Whoareyou;
