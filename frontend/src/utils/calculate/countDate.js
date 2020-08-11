export const countDate = (d1, d2, d3, d4) => {
  let cnt = 0;
  if (d1 !== '') {
    cnt++;
  }
  if (d2 !== '') {
    cnt++;
  }
  if (d3 !== '') {
    cnt++;
  }
  if (d4 !== '') {
    cnt++;
  }
  return cnt;
};

export const newArray = (d1, d2, d3, d4) => {
  const arr = [];
  if (d1 !== '') {
    arr.push(d1);
  }
  if (d2 !== '') {
    arr.push(d2);
  }
  if (d3 !== '') {
    arr.push(d3);
  }
  if (d4 !== '') {
    arr.push(d4);
  }
  return arr;
};
