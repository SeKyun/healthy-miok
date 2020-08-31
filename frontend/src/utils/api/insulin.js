import client from './client';

const typeURL = 'type-insulin';

const insulinURL = 'insulin';
//GET
export const getLongtypeInsulin = () => client.get(`${typeURL}/long`);

export const getShorttypeInsulin = () => client.get(`${typeURL}/short`);

export const getInsulin = (today, when) =>
  client.get(`${insulinURL}/record/short`, {
    params: {
      today,
      when,
    },
  });

export const getInsulinLong = (today) =>
  client.get(`${insulinURL}/record/long`, {
    params: {
      today,
    },
  });

export const getInsulinDate = (startDate, endDate) =>
  client.get(`${insulinURL}/date`, {
    params: {
      startDate,
      endDate,
    },
  });
//POST
export const enrollInsulinType = (startDate, endDate) =>
  client.post(`${typeURL}/date`, {
    params: {
      startDate,
      endDate,
    },
  });

export const enrollInsulin = (data) => client.post(`${insulinURL}`, data);

export const getInsulinGraph = (data) =>
  client.post(`${insulinURL}/graph`, data);
//PUT
export const updateInsulin = (id, data) =>
  client.put(`${insulinURL}/id/${id}`, data);
