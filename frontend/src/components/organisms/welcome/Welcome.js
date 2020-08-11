import React, { useEffect, useState } from 'react';
import history from '../../pages/history';
import { greeting } from '../../../utils/api/greeting';

const Welcome = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    try {
      greeting().then((response) => {
        setMessage(response.data.result[0].content);
      });
    } catch (error) {
      setMessage('서버에서 데이터를 받아오지 못했어요..!');
    }
    const timer = setTimeout(() => {
      history.push('/main');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return <div>{message}</div>;
};

export default Welcome;
