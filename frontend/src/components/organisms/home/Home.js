import React from 'react';
import { Button } from 'antd';
import './Home.scss';
const Home = () => {
  return (
    <div className="Home">
      <div>
        <Button>
          혈당
          <img src="/images/diabetes.png" alt="diabetes" />
        </Button>
        <Button>혈압</Button>
        <Button>체중</Button>
      </div>
      <div>
        <Button>인슐린</Button>
        <Button>투약 및 처치</Button>
        <Button>운동</Button>
      </div>
      <div>
        <Button>음식</Button>
        <Button>스트레스 & 행복지수</Button>
        <Button>오늘의 일</Button>
      </div>
    </div>
  );
};

export default Home;
