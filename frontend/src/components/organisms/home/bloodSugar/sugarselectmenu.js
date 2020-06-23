import React from 'react';
import PropTypes from 'prop-types';
import Graph from './graph/graph';
import History from './history/history';
import Enroll from './enroll/enroll';
import Error from '../../../pages/Error/Error';

const SugarselectMenu = ({ menuIdx }) => {
  if (menuIdx === 0) {
    return <Enroll />;
  }
  if (menuIdx === 1) {
    return <History />;
  }
  if (menuIdx === 2) {
    return <Graph />;
  }
  return <Error />;
};

SugarselectMenu.propTypes = {
  menuIdx: PropTypes.number.isRequired,
};

export default SugarselectMenu;
