import React from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, Paper } from '@mui/material';
import TimesheetAlluser from './TimeSheetAllUser';
import TimesheetSelf from './TimeSheetSelf';

const MainComponent = ({ data, select, handleChange, formatDate, formatTime }) => {
  return (
    <div>
      {select === 1 && (
        <TimesheetSelf data={data} handleChange={handleChange} formatDate={formatDate} formatTime={formatTime} />
      )}
      {select === 2 && (
        <TimesheetAlluser data={data} handleChange={handleChange} formatDate={formatDate} formatTime={formatTime} />
      )}
    </div>
  );
};

export default MainComponent;
