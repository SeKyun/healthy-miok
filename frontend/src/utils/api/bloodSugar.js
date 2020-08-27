import client from './client';

const secondURL = 'blood-sugar';
//GET
//혈당 api 받아오기
export const getBloodSugar = (today, when) =>
  client.get(`${secondURL}/record/`, { params: { today, when } });

export const getBloodSugarHistory = (startDate, endDate) =>
  client.get(`${secondURL}/date/`, { params: { startDate, endDate } });

export const getBloodSugarGraph = (whenData, startDate, endDate) =>
  client.get(`${secondURL}/when/${whenData}`, {
    params: { startDate, endDate },
  });
//POST
//혈당 등록하기
export const enrollBloodSugar = (data) => client.post(`${secondURL}`, data);

//PUT
//혈당 수정하기
export const updateBloodSugar = (id, data) =>
  client.put(`${secondURL}/id/${id}`, data);
