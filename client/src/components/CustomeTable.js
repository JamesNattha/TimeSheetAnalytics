import PropTypes, {func} from "prop-types";
import React, {useState, useMemo, Fragment} from "react";

// material-ui
import {alpha, useTheme} from "@mui/material/styles";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  OutlinedInput,
  Box,
  TextField,
  InputLabel,
  DataGrid,
  Typography,
  Grid,
  Pagination
} from "@mui/material";

import CustomTablePanigation from "./CustomTablePanigation";
import {useTable} from "react-table";

export default function CustomeTable({data, dataRow, filteredPosition, selectedProjectFilter, noHiddenValue, searchFilters}) {
  //==============================Pagination=============================================
    // console.log("selectedProjectFilter", selectedProjectFilter);
//   console.log("current recordsPerPage", dataRow);
  //   console.log("current newDataRow", dataRow.map((position) => position.position_code).includes(filteredPosition));

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10); // 5;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataRow.filter((row) => row.type === "work").slice(firstIndex, lastIndex);

//   console.log("current records", records);
  const npage = Math.ceil(dataRow.filter((row) => row.type === "work").length / recordsPerPage);
  //   console.log("current npage", npage);
  const numbers = [...Array(npage).keys()].slice(1);
  //   console.log("current noHiddenValue", numbers);

  const allPage = numbers.length;
  //   console.log("allPage", allPage);

  const changeRecords = (records) => {
    setRecordsPerPage(records);
  };

  const handleBeforePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirst = () => {
    setCurrentPage(firstIndex);
  };

  const handleLast = () => {
    setCurrentPage(lastIndex);
  };

  const handleSelectPage = (page) => {
    setCurrentPage(page);
  };

  const handleChangePagination = (event, value) => {
    gotoPage(value - 1);
  };

  const handleNextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div style={{borderRadius: "10px", overflow: "hidden", backgroundColor: "#ffffff"}}>
      <div>
        <div>
          <Grid container spacing={2} sx={{paddingLeft: "20px", paddingBottom: "15px"}}>
            <Grid item xs={3}>
              <Typography>
                Project Code:{" "}
                {selectedProjectFilter !== "" && selectedProjectFilter !=="all"
                  ? [...new Set(data.filter((row) => row.project_name === selectedProjectFilter).flatMap((row) => row.project_code))]
                  : data.map((row) => row.project_code)}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                Project Name:{" "}
                {selectedProjectFilter !== "" && selectedProjectFilter !=="all"
                  ? [...new Set(data.filter((row) => row.project_name === selectedProjectFilter).flatMap((row) => row.project_name))]
                  : data.map((row) => row.project_name)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                Assign Time:{" "}
                {selectedProjectFilter !== "" && selectedProjectFilter !=="all"
                  ? [...new Set(data.filter((row) => row.project_name === selectedProjectFilter).flatMap((row) => row.assign_time))]
                  : data.map((row) => row.assign_time)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                Actual Time:{" "}
                {selectedProjectFilter !== "" && selectedProjectFilter !=="all"
                  ? [...new Set(data.filter((row) => row.project_name === selectedProjectFilter).flatMap((row) => row.actual_time))]
                  : data.map((row) => row.actual_time)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                Total:{" "}
                {selectedProjectFilter !== "" && selectedProjectFilter !=="all"
                  ? [...new Set(data.filter((row) => row.project_name === selectedProjectFilter).flatMap((row) => row.total))]
                  : data.map((row) => row.total)}
              </Typography>
            </Grid>
          </Grid>

          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead style={{backgroundColor: "#E0E0E0"}}>
              <TableRow sx={{"& > th:first-of-type": {width: "58px"}}}>
                <TableCell
                  sx={{
                    width: "auto",
                    ":not(:last-of-type)::after": {
                      position: "inherit "
                    }
                  }}
                >
                  NO
                </TableCell>
                {/* <TableCell>Dessert (100g serving)</TableCell> */}
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">WORK CODE</TableCell>
                <TableCell align="center">WORK NAME</TableCell>
                <TableCell align="center">POSITION</TableCell>
                <TableCell align="center">START DATE</TableCell>
                <TableCell align="center">END DATE</TableCell>
                <TableCell align="right">ASSIGN TIME&nbsp;(Hr)</TableCell>
                <TableCell align="right">ACTUAL TIME&nbsp;(Hr)</TableCell>
                <TableCell align="right">TOTAL&nbsp;(Hr)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records
                .filter((item) => {
                  return searchFilters.toLowerCase() === ""
                    ? item
                    : item.worker_name.toLowerCase().includes(searchFilters.toLowerCase()) ||
                        item.work_name.toLowerCase().includes(searchFilters.toLowerCase()) ||
                        item.work_code.toLowerCase().includes(searchFilters.toLowerCase()) ||
                        item.position_name.toLowerCase().includes(searchFilters.toLowerCase()) ||
                        item.start_date.toLowerCase().includes(searchFilters.toLowerCase()) ||
                        item.end_date.toLowerCase().includes(searchFilters.toLowerCase()) ||
                        item.assign_time.toLowerCase().includes(searchFilters.toLowerCase()) ||
                        item.actual_time.toLowerCase().includes(searchFilters.toLowerCase()) ||
                        item.total.toLowerCase().includes(searchFilters.toLowerCase());
                })
                .filter((row) => row.type === "work")
                .map((row, i) => (
                  <TableRow key={i} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                    <TableCell component="th" scope="row">
                      {row.autoNumber}
                    </TableCell>
                    <TableCell align="right">{row.worker_name}</TableCell>
                    <TableCell align="right">{row.work_code}</TableCell>
                    <TableCell align="right">{row.work_name}</TableCell>
                    <TableCell align="right">{row.position_name}</TableCell>
                    <TableCell align="right">{row.start_date}</TableCell>
                    <TableCell align="right">{row.end_date}</TableCell>
                    <TableCell align="right">{row.assign_time}</TableCell>
                    <TableCell align="right">{row.actual_time}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <CustomTablePanigation
            handleFirst={handleFirst}
            handleLast={handleLast}
            handleBefore={handleBeforePage}
            handleNext={handleNextPage}
            handleSelect={handleSelectPage}
            recordsPerPage={recordsPerPage}
            allPage={allPage}
            nPage={npage}
            changeRecords={changeRecords}
            pageIndex={numbers}
            // setPage={changePage}
          />
        </div>
      </div>
    </div>
  );
}
