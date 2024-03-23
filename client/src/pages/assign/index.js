import React, { useEffect, useState } from 'react';
import api from '_api';
import PropTypes from 'prop-types';

import AssignUser from './assign';
import { Paper, Table, TableContainer, FormControl, Select, MenuItem, InputLabel, InputBase, styled, alpha, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { MenuIcon, KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '@mui/icons-material/KeyboardArrowDown';
import SelectButton from './button';
import { debounce } from 'lodash';

//Data
export default function BasicTable() {
  const [data, setData] = useState([]);
  const [isStatus, setIsStatus] = useState([]);
  const [select, setSelect] = React.useState(2);

  //Connect API
  const fetchUser = async () => {
    try {
      const { data, isStatus } = await api.reports.fetchUser();
      // console.log(data);
      if (isStatus) setData(data), setIsStatus(isStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllUser = async () => {
    try {
      const { data, isStatus } = await api.reports.fetchAllUser();
      // console.log(data);
      if (isStatus) setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  //fn fetchUser เป็นการดึงข้อมูล จาก data จาก api ที่เรากำหนดใน reports แล้วเรียกใช้ fn fetchUser แล้วเก็บข้อมูล data ไว้ใน data in useState
  useEffect(() => {
    //set function call database to show 1
    fetchUser();
    fetchAllUser();
  }, []);

  //Select
  const handleChange = (event) => {
    setSelect(event.target.value);
    console.log(event.target.value);
    if (event.target.value == 1) {
      fetchUser();
    } else if (event.target.value == 2) {
      fetchAllUser();
    }
  };

  const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
    paddingTop: 2,
    paddingLeft: 1.5,
    paddingRight: 1.5
  });

  return (
    // Select data in dropdown
    <TableContainer sx={{ p: '20px' }}>
      <Paper>
        <AssignUser />
      </Paper>
    </TableContainer>
  );
}
