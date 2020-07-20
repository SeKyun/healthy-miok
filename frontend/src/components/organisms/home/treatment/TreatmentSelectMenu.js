import React from 'react';
import MedicineEnroll from './medicineEnroll/MedicineEnroll';
import TreatmentEnroll from './treatmentEnroll/TreatmentEnroll';
import History from './history/History';
import Info from './info/Info';

const TreatmentSelectMenu = (props) => {
  const { menuIdx } = props;

  if (menuIdx === 0) {
    return <MedicineEnroll />;
  } else if (menuIdx === 1) {
    return <TreatmentEnroll />;
  } else if (menuIdx === 2) {
    return <History />;
  } else {
    return <Info />;
  }
};

export default TreatmentSelectMenu;
