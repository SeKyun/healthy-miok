import client from './client';

//greeting api 받아오기
export const greeting = () => client.get('/greeting');
