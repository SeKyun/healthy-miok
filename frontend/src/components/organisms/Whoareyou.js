import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import history from '../pages/history';
import './Whoareyou.scss';
const Whoareyou = () => {
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
            size="middle"
            onSearch={(value) => {
              value === '박미옥'
                ? history.push('/secondpage')
                : history.push('/Error');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Whoareyou;
