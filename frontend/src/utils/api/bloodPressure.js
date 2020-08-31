import client from './client';

const secondURL = 'blood-pressure';

//GET
//혈압 api 받아오기
export const getBloodPressureDate = (startDate, endDate) =>
  client.get(`${secondURL}/date`, {
    params: {
      startDate,
      endDate,
    },
  });

//POST
//혈압 등록하기
export const enrollBloodPressure = (data) => client.post(`${secondURL}`, data);

export const getGraphBloodPressure = (data, startDate, endDate) =>
  client.post(`${secondURL}/graph`, data, {
    params: {
      startDate,
      endDate,
    },
  });
//delete
//혈압 삭제하기
export const deleteBloodPressure = (id) =>
  client.delete(`${secondURL}/id/${id}`);
