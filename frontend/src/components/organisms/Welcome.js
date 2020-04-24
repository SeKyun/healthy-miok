import React, { useEffect } from 'react';
import history from '../pages/history';

const Welcome = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/main');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return <div>미옥님 환영합니다! 잠시만 기다려주세요!</div>;
};

export default Welcome;
