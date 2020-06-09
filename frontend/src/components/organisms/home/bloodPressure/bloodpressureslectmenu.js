import React from 'react';
import Graph from './graph/graph';
import History from './history/history';
import Enroll from './enroll/enroll';

const BloodpressureselectMenu = (props) => {
  const { menuIdx } = props;

  if (menuIdx === 0) {
    return <Enroll />;
  } else if (menuIdx === 1) {
    return <History />;
  } else if (menuIdx === 2) {
    return <Graph />;
  }
};

export default BloodpressureselectMenu;
