import React from 'react';
import history from '../pages/history';

const Welcome = () => {
  return (
    <div onClick={() => history.push('/main')}>
      Miok님 환영합니다! 화면을 터치해주세요!
    </div>
  );
};

export default Welcome;
