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
        <img src="/images/menu/diabetes.png" alt="혈당" />
      </Button>

      <Button
        onClick={() => {
          history.push('/bloodPressure');
        }}
      >
        <img src="/images/menu/blood_pressure.png" alt="혈압" />
      </Button>
      <Button
        onClick={() => {
          history.push('/weight');
        }}
      >
        <img src="/images/menu/weight.png" alt="체중" />
      </Button>

      <Button
        onClick={() => {
          history.push('/insulin');
        }}
      >
        <img src="/images/menu/insuline.png" alt="인슐린" />
      </Button>
      <Button
        onClick={() => {
          history.push('/treatment');
        }}
      >
        <img src="/images/menu/injectOrTreatment.png" alt="투약 및 치료" />
      </Button>
      <Button
        onClick={() => {
          history.push('/exercise');
        }}
      >
        <img src="/images/menu/exercise.png" alt="운동" />
      </Button>

      <Button
        onClick={() => {
          history.push('/foods');
        }}
      >
        <img src="/images/menu/foodCare.png" alt="식단" />
      </Button>
      <Button
        onClick={() => {
          history.push('/stressAndHappy');
        }}
      >
        <img
          src="/images/menu/stressAndHappiness.png"
          alt="스트레스와행복"
          className={'stress'}
        />
      </Button>
      <Button
        onClick={() => {
          history.push('/todayJob');
        }}
      >
        <img src="/images/menu/todayJob.png" alt="식단" />
      </Button>
    </div>
  );
};

export default Home;
