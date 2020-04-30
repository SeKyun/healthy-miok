import React from 'react';
import Home from '../organisms/home/Home';
import Record from '../organisms/record/Record';
import Graph from '../organisms/graph/Graph';
import Calendar from '../organisms/calendar/Calendar';

const SelectMenu = (props) => {
  const { menuIdx } = props;

  if (menuIdx === 0) {
    return <Home />;
  } else if (menuIdx === 1) {
    return <Record />;
  } else if (menuIdx === 2) {
    return <Graph />;
  } else if (menuIdx === 3) {
    return <Calendar />;
  }
};

export default SelectMenu;
