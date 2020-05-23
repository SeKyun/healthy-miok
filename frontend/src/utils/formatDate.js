export const formatDate = (d) => {
  console.log(d);
  const year = d._d.getFullYear();
  let month = d._d.getMonth() + 1;
  let date = d._d.getDate();
  console.log(month);
  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  return `${year}-${month}-${date}`;
};
