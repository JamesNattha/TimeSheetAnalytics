import React, { useEffect, useState } from 'react';
import api from '_api';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';
import SelectButton from './button';
import moment from 'moment';

export default function AssignUser() {
  const [data, setData] = useState([]);
  const [isStatus, setIsStatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sendTo, setSendTo] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); // Define selectedRow state
  const [user, setUser] = useState([]);
  const [checked, setChecked] = useState(false);

  const fetchAllUser = async () => {
    try {
      const { data, isStatus } = await api.workno.fetchWorkTable({ searchQuery });
      if (isStatus) {
        setData(data);
        setFilteredData(data);
        setIsStatus(isStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const { data, isStatus } = await api.report.fetchUser({ searchQuery });
      if (isStatus) {
        setUser(data);
        setIsStatus(isStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUser();
    fetchUser();
  }, []);

  const columns = [
    { field: 'workName', headerName: 'Work name', width: 120 },
    { field: 'detail', headerName: 'Detail', width: 450 },
    { field: 'startDate', headerName: 'Start date', width: 170 },
    { field: 'endDate', headerName: 'End date', width: 170 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <SelectButton rowId={params.row.worknoId} onClickOpen={handleClickOpen} onSelectUsername={handleSelectUsername} />
      )
    }
  ];

  const handleClickOpen = (row) => {};

  const handleSelectUsername = (selectedUsername) => {
    // Update the sendTo state with the selected username
    setSendTo(selectedUsername);
  };

  // const handleSelectionModelChange = (newSelectionModel) => {
  //   setSelectedUsers(newSelectionModel);
  //   const selectedRows = newSelectionModel.map((rowId) => rows.find((row) => row.id === rowId));
  // };

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectedUsers(newSelectionModel);
    setSelectedRow(rows.find((row) => row.id === newSelectionModel[0]));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);
    const filteredRows = data.filter((row) => row.workName.includes(searchValue));
    setFilteredData(filteredRows);
  };

  const rows = filteredData
    .filter((row) => user.find((u) => u.user_id === row.createdBy))
    .map((row, index) => {
      return {
        ...row,
        id: index + 1,
        createdByUsername: user.find((u) => u.user_id === row.created_by)?.username || '',
        startDate: moment(row.startDate).format('DD-MM-YYYY'),
        endDate: moment(row.endDate).format('DD-MM-YYYY')
      };
    });

  console.log(rows); // Log the user array outside the mapping

  return (
    <div style={{ height: 400, width: '100%', position: 'relative' }}>
      <Paper>
        <TextField value={searchQuery} onChange={handleSearch} id="filled-search" label="Search field" type="search" variant="filled" />
        {selectedUsers.length > 0 && ( // Show the button only if a checkbox is checked
          <SelectButton rowId={selectedRow?.worknoId} onClickOpen={handleClickOpen} onSelectUsername={handleSelectUsername} />
        )}
      </Paper>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        checkboxSelection
        disableSelectionOnClick={true}
        onSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectedUsers}
      />
    </div>
  );
}
