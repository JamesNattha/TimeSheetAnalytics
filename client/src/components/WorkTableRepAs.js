import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, FormControl, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { saveAs } from 'file-saver';
import moment from 'moment';
import IosShareIcon from '@mui/icons-material/IosShare';

const ExcelJS = require('exceljs');

const exportExcelFile = (selectedRows) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Report');

  // Add header row
  const headerRow = sheet.addRow(['WorknoId', 'Work Name', 'Detail', 'Start Date', 'End Date', 'Send To']);

  // Set the fill color for the header row
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '00FF00' } // Green color (hex code: #00FF00)
    };
  });

  // Add data from each selected row
  selectedRows.forEach((row) => {
    const rowData = [row.worknoId, `${row.workName} `, row.detail, row.startDate, row.endDate, row.sendTo];
    sheet.addRow(rowData);
  });

  // Auto-adjust column widths
  sheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  // Generate a unique filename
  const fileName = `work_report_${moment().format('YYYY-MM-DD_HH-mm-ss')}.xlsx`;

  // Save the workbook as a file
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);
  });
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  },
  whiteSpace: 'pre-line' // Add new line formatting
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const WorkTable = ({ data, onUsernameClick, formatDate }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  if (!data) {
    return <div>No data available.</div>;
  }

  // Modify the sendTo values by replacing commas with newlines
  const modifiedData = data.map((item) => ({
    ...item,
    sendTo: item.sendTo ? item.sendTo.replace(/,/g, '\n') : '' // Check for null or undefined
  }));

  const handleCheckboxChange = (event, item) => {
    const isChecked = event.target.checked;
    const updatedSelectedRows = [...selectedRows];

    if (isChecked) {
      updatedSelectedRows.push(item); // Add the item to selectedRows
    } else {
      const index = updatedSelectedRows.findIndex((row) => row.worknoId === item.worknoId);
      if (index > -1) {
        updatedSelectedRows.splice(index, 1); // Remove the item from selectedRows
      }
    }

    setSelectedRows(updatedSelectedRows);
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows(modifiedData);
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <TableContainer component={Paper}>
      <FormControl sx={{ mx: 2, my: 1, minWidth: 120 }}>
        <Button variant="outlined" onClick={() => exportExcelFile(selectedRows)} startIcon={<IosShareIcon />}>
          Export Data
        </Button>
      </FormControl>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Checkbox checked={selectedRows.length === modifiedData.length} onChange={handleSelectAllChange} />
            </StyledTableCell>
            <StyledTableCell>Work</StyledTableCell>
            <StyledTableCell>Detail</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
            <StyledTableCell align="center">Send To</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modifiedData.map((item) => (
            <StyledTableRow key={item.worknoId}>
              <StyledTableCell>
                <Checkbox
                  checked={selectedRows.some((row) => row.worknoId === item.worknoId)}
                  onChange={(event) => handleCheckboxChange(event, item)}
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" onClick={() => onUsernameClick(item.worknoId)}>
                {item.workName}
              </StyledTableCell>
              <StyledTableCell align="left">{item.detail}</StyledTableCell>
              <StyledTableCell align="center">{formatDate(item.startDate)}</StyledTableCell>
              <StyledTableCell align="center">{formatDate(item.endDate)}</StyledTableCell>
              <StyledTableCell align="left">{item.sendTo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkTable;
