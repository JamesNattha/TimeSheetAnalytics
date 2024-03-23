import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const WorkTable = ({ data, onDeleteClick, onEditClick, onUsernameClick, formatDate }) => {
  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Work</StyledTableCell>
            <StyledTableCell>detail</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">Stop Date</StyledTableCell>
            <StyledTableCell align="center">Send To</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow key={item.worknoId}>
              <StyledTableCell component="th" scope="row" onClick={() => onUsernameClick(item.worknoId)}>
                {item.workName}
              </StyledTableCell>
              <StyledTableCell align="left">{item.detail}</StyledTableCell>
              <StyledTableCell align="center">{formatDate(item.startDate)}</StyledTableCell>
              <StyledTableCell align="center">{formatDate(item.endDate)}</StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {item.sendTo}
              </StyledTableCell>
              <Stack direction="row" align="center">
                <StyledTableCell align="center" onClick={() => onEditClick(item.worknoId)}>
                  <ModeEditIcon />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <DeleteForeverIcon onClick={() => onDeleteClick(item.worknoId)} />
                </StyledTableCell>
              </Stack>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkTable;
