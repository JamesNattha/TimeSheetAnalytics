import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import TimesheetItem from './TimeSheetTable';

const TimesheetSelf = ({ data,  formatDate, formatTime,   }) => {
  const sortByWorkNo = (a, b) => {
    if (a.workNo < b.workNo) {
      return -1;
    }
    if (a.workNo > b.workNo) {
      return 1;
    }
    return 0;
  };

  const sortBycreatedAt = (a, b) => {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      {data.map((item, index) => (
          <React.Fragment key={index}>
              <TableContainer component={Paper} sx={{ pb: 2 }}>
              <Paper variant="outlined" sx={{ py: 2, px: 3 }}>
                <Typography variant="h5">
                  {item.firstName} {item.lastName}
                </Typography>
              </Paper>
              {item.tbTimeSheetHDs.sort(sortBycreatedAt).map((tbTimeSheetHDs, i) => (
                <React.Fragment key={i}>
                  <Table key={i} sx={{ minWidth: 650 }} aria-label="tableTitle">
                    <Container>
                      <Table sx={{ mt: 3, pt: 2 }}>
                        <span>วันที่ Timesheet : {formatDate(tbTimeSheetHDs.createdAt)}</span>
                      </Table>
                      <TableHead component={Paper} elevation={3}>
                        <TableRow>
                          <TableCell align="center" sx={{ width: '15%' }}>
                            Work No
                          </TableCell>
                          <TableCell align="left">Work Detail</TableCell>
                          <TableCell align="center" sx={{ width: '7.8%' }}>
                            Time Start
                          </TableCell>
                          <TableCell align="center " sx={{ width: '7.5%' }}>
                            Time Stop
                          </TableCell>
                          <TableCell align="center" sx={{ width: '10%' }}>
                            Total
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      
                          <TimesheetItem tbTimeSheetHDs={tbTimeSheetHDs} formatTime={formatTime}/>

                    </Container>
                  </Table>
                </React.Fragment>
              ))}
            </TableContainer>
            </React.Fragment>
          ))}
    </div>
  );
};

export default TimesheetSelf;
