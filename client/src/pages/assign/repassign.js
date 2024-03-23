import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import SearchInput from '../../components/SearchInput';
import WorkTable from '../../components/WorkTable';

//called api
import api from '_api';

export default function RepAssign() {
  const [data, setData] = useState([]);
  const [dataWork, setDataWork] = useState([]);
  const [isStatus, setIsStatus] = useState([]);
  const [select, setSelect] = React.useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUser = async () => {
    try {
      const { data, isStatus } = await api.report.fetchUser({ searchQuery });
      if (isStatus) setData(data), setIsStatus(isStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllUser = async () => {
    try {
      const { data, isStatus } = await api.reports.fetchAllUser({ searchQuery });
      if (isStatus) setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWork = async () => {
    try {
      const { data, isStatus } = await api.workno.fetchWorkTable();
      // console.log(data);
      if (isStatus) setDataWork(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(dataWork);

  //fn fetchUser เป็นการดึงข้อมูล จาก data จาก api ที่เรากำหนดใน reports แล้วเรียกใช้ fn fetchUser แล้วเก็บข้อมูล data ไว้ใน data in useState
  useEffect(() => {
    //set function call database to show 1
    fetchUser();
    fetchAllUser();
    fetchWork();
  }, []);

  // console.log(data);

  function Row(data) {
    // console.log(data);
    const { row } = data;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.username} {/* Use row.username instead of data.username */}
          </TableCell>
          <TableCell align="left">{row.firstName + ' ' + row.lastName}</TableCell>
          {/* <TableCell align="left">{row.lastName}</TableCell> */}
          <TableCell align="center">{moment(row.createdAt).format('DD-MM-YYYY')}</TableCell>
          <TableCell align="center">{row.createdBy}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Other!
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ width: 130 }}>
                        WorkNo
                      </TableCell>
                      <TableCell>Detail</TableCell>
                      <TableCell align="center" style={{ width: 150 }}>
                        Start Time
                      </TableCell>
                      <TableCell align="center" style={{ width: 150 }}>
                        End Time
                      </TableCell>
                      <TableCell align="center" style={{ width: 150 }}>
                        Note
                      </TableCell>
                      <TableCell align="center" style={{ width: 150 }}>
                        Send To
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataWork.map((work, workIndex) => (
                      <React.Fragment key={workIndex}>
                        {row.userId === work.createdBy || row.username === work.sendTo ? (
                          <TableRow key={workIndex} component="Paper">
                            <TableCell align="center" component="th" scope="row" style={{ width: 130 }}>
                              {work.workName}
                            </TableCell>
                            <TableCell>{work.detail}</TableCell>
                            <TableCell align="center">{moment(work.startDate).format('DD-MM-YYYY')}</TableCell>
                            <TableCell align="center">{moment(work.endDate).format('DD-MM-YYYY')}</TableCell>
                            <TableCell align="center">{work.note}</TableCell>
                            <TableCell align="center">{work.sendTo}</TableCell>
                          </TableRow>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table component={Paper}>
        <Paper>
          <TextField
            v
            alue={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
          />
        </Paper>
      </Table>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Username</TableCell>
            <TableCell align="left" style={{ width: 300 }}>
              Name
            </TableCell>
            {/* <TableCell align="left"  style={{ width: 200 }}>Last Name(g)</TableCell> */}
            <TableCell align="center">Created At;(g)</TableCell>
            <TableCell align="center">Created By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((row) => row.username.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((row) => (
              <Row key={row.username} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
