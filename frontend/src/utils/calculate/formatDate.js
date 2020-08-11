export const formatDate = (d) => {
  const year = d._d.getFullYear();
  let month = d._d.getMonth() + 1;
  let date = d._d.getDate();
  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  return `${year}-${month}-${date}`;
};

export const formatTime = (d) => {
  let hours = d._d.getHours();
  let minute = d._d.getMinutes();
  let seconds = d._d.getSeconds();

  hours = hours < 10 ? `0${hours}` : hours;
  minute = minute < 10 ? `0${minute}` : minute;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${hours}:${minute}:${seconds}`;
};
