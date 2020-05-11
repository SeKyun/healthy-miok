import React from 'react';
import { Button } from 'antd';
import './Home.scss';
import history from '../../pages/history';
const Home = () => {
  return (
    <div className="Home">
      <Button
        onClick={() => {
          history.push('/bloodSugar');
        }}
      >
        혈당
        {/* <img src="/images/diabetes.png" alt="diabetes" /> */}
      </Button>

      <Button
        onClick={() => {
          history.push('/bloodPressure');
        }}
      >
        혈압
      </Button>
      <Button
        onClick={() => {
          history.push('/weight');
        }}
      >
        체중
      </Button>

      <Button
        onClick={() => {
          history.push('/insulin');
        }}
      >
        인슐린
      </Button>
      <Button
        onClick={() => {
          history.push('/treatment');
        }}
      >
        투약 및 처치
      </Button>
      <Button
        onClick={() => {
          history.push('/exercise');
        }}
      >
        운동
      </Button>

      <Button
        onClick={() => {
          history.push('/foods');
        }}
      >
        음식
      </Button>
      <Button
        onClick={() => {
          history.push('/stressAndHappy');
        }}
      >
        스트레스 & 행복지수
      </Button>
      <Button
        onClick={() => {
          history.push('/todayJob');
        }}
      >
        오늘의 일
      </Button>
    </div>
  );
};

export default Home;
