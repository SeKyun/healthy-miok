import React from 'react';
import PropTypes from 'prop-types';
import Home from '../organisms/home/Home';
import Record from '../organisms/record/Record';
import Graph from '../organisms/graph/Graph';
import Calendar from '../organisms/calendar/Calendar';
import Error from './Error/Error';

const SelectMenu = ({ menuIdx }) => {
  if (menuIdx === 0) {
    return <Home />;
  }
  if (menuIdx === 1) {
    return <Record />;
  }
  if (menuIdx === 2) {
    return <Graph />;
  }
  if (menuIdx === 3) {
    return <Calendar />;
  }
  return <Error />;
};

SelectMenu.propTypes = {
  menuIdx: PropTypes.number.isRequired,
};

export default SelectMenu;
