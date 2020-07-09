const rows = [
  {
    id: 4740,
    _when: '아침 식후',
    _value: 155,
    today: '2020-01-01',
    _time: '09:00:00',
  },
  {
    id: 4741,
    _when: '점심 식후',
    _value: 156,
    today: '2020-01-01',
    _time: '12:00:00',
  },
  {
    id: 4742,
    _when: '저녁 식후',
    _value: 157,
    today: '2020-01-01',
    _time: '20:00:00',
  },
  {
    id: 4743,
    _when: '아침 식후',
    _value: 158,
    today: '2020-01-02',
    _time: '09:00:00',
  },
  {
    id: 4744,
    _when: '점심 식후',
    _value: 159,
    today: '2020-01-02',
    _time: '12:00:00',
  },
  {
    id: 4745,
    _when: '저녁 식후',
    _value: 160,
    today: '2020-01-02',
    _time: '20:00:00',
  },
  {
    id: 4746,
    _when: '아침 식후',
    _value: 161,
    today: '2020-01-03',
    _time: '09:00:00',
  },
  {
    id: 4747,
    _when: '점심 식후',
    _value: 162,
    today: '2020-01-03',
    _time: '12:00:00',
  },
  {
    id: 4748,
    _when: '저녁 식후',
    _value: 163,
    today: '2020-01-03',
    _time: '20:00:00',
  },
];

//date를 endDate일때까지 순환
let tmr = new Date('2020-01-01');
let date = tmr.toISOString().substring(0, 10);
const endDate = '2020-07-01';
const result = [];
let idx = 0;
while (date <= endDate) {
  //초기데이터
  let data = { id: result.length, today: date };
  let check = false;
  for (let i = idx; i < rows.length; i++) {
    if (date === rows[i].today) {
      data[rows[i]._when] = rows[i]._value;
      check = true;
    } else {
      console.log(check);
      if (check) {
        console.log('good');
        result.push(data);
      }
      idx = i;
      break;
    }

    if (i + 1 === rows.length) {
      result.push(data);
    }
  }

  console.log(data);
  console.log(date);
  //date를 1씩 더해준다.
  tmr.setDate(tmr.getDate() + 1);
  date = tmr.toISOString().substring(0, 10);
}

console.log(result);
