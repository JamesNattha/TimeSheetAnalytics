import React from 'react';
import { TableRow, TableCell ,TableBody} from '@mui/material';

const TimesheetItem = ({ tbTimeSheetHDs, formatTime }) => {
  const sortByWorkNo = (a, b) => {
    if (a.workNo < b.workNo) {
      return -1;
    }
    if (a.workNo > b.workNo) {
      return 1;
    }
    return 0;
  };

  return (
    <TableBody component={Paper} elevation={3}>                 
      {tbTimeSheetHDs.tbTimeSheetDTs.sort(sortByWorkNo).map((work, workIndex) => {
        const sumTime = Math.round(Math.abs(new Date(work.startTime) - new Date(work.endTime)));
        const hours = Math.floor(sumTime / 3600000); // Convert milliseconds to hours
        const minutes = Math.floor((sumTime / 60000) % 60); // Get remaining minutes
        return (
          <TableRow key={workIndex} sx={{ '&:last-child td, &lasy-child th': { border: 0 } }}>
            <TableCell scope="row" align="center">
              {work.workNo === '' ? '-' : work.workNo}
            </TableCell>
            <TableCell align="left">{work.detail}</TableCell>
            <TableCell align="center">{formatTime(work.startTime)}</TableCell>
            <TableCell align="center">{formatTime(work.endTime)}</TableCell>
            <TableCell align="center">{`${hours}:${minutes < 10 ? '0' : ''}${minutes} hr`}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TimesheetItem;
