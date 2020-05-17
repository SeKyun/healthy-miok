import React, { useEffect, useState } from 'react';
import history from '../pages/history';
import axios from 'axios';

const Welcome = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    try {
      axios.get('http://miok.site:3001/api/greeting').then((response) => {
        console.log(response);
        setMessage(response.data.result[0].content);
      });
    } catch (error) {
      console.error(error);
    }
    const timer = setTimeout(() => {
      history.push('/main');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return <div>{message}</div>;
};

export default Welcome;
