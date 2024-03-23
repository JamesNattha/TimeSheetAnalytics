import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';

// called api
import api from '_api';

export default function SelectButton({ rowId, onClickOpen, onSelectUsername }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataWorkno, setDataWorkno] = useState([]);
  const [rows, setRows] = useState([]);
  const [isStatus, setIsStatus] = useState([]);
  const [sendTo, setSendTo] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  // const [selectedRowString, setSelectedRowString] = useState([]);
  const [error, setError] = useState(false); // Error state

  const fetchUser = async () => {
    try {
      const { data, isStatus } = await api.report.fetchUser();
      if (isStatus) {
        setData(data);
        setIsStatus(isStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllUser = async () => {
    try {
      const { data, isStatus } = await api.report.fetchAllUsers();
      if (isStatus) {
        // Assign a unique id to each row based on userId
        const rowsWithIds = data.map((row) => ({ ...row, id: row.userId, username: row.username }));
        setRows(rowsWithIds);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const workNoData = async () => {
    try {
      const { data, isStatus } = await api.workno.fetchWorkTable();
      if (isStatus) {
        setDataWorkno(data);
        setIsStatus(isStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleButtonClick = () => {
  //   console.log(selectedRow);
  //   handleConfirm(selectedRow);
  // };

  const handleClickOpen = (row) => {
    console.log(rowId); // Access the rowId value
    console.log(rows);
    console.log(dataWorkno);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //   const selectedRowData = rows.filter((row) => selectedRow.includes(row.id));
  //   const selectedUsername = selectedRowData.length > 0 ? selectedRowData[0].username : '';

  //   setSendTo(selectedUsername);
  //   setOpen(false);
  //   console.log('test select', selectedUsername);

  //   // Convert selectedRow to a string
  //   const selectedRowString = selectedRow.join(',');

  //   // Update the sendTo field in dataWorkno array
  //   const updatedRows = dataWorkno.map((item) => {
  //     if (item.worknoId === rowId) {
  //       return {
  //         ...item,
  //         sendTo: selectedRowString,
  //       };
  //     }
  //     return item;
  //   });

  //   try {
  //     const updateResponse = await api.aswork.updateSendto(updatedRows);
  //     console.log(updateResponse);
  //     setIsStatus(true);
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   // Call the callback function with the selected username
  //   onSelectUsername(selectedUsername);
  // };

  const handleButtonClick = async (row) => {
    const selectedRowData = rows.filter((row) => selectedRow.includes(row.id));
    const selectedUsernames = selectedRowData.map((row) => row.username);

    setSendTo(selectedUsernames);
    setOpen(false);
    console.log('Selected Usernames:', selectedUsernames);

    // Convert selectedRow to a string
    const selectedRowString = selectedRow.join(',');

    // Update the sendTo field in dataWorkno array
    const updatedRows = dataWorkno.map((item) => {
      if (item.worknoId === rowId) {
        return {
          ...item,
          sendTo: selectedRowString
        };
      }
      return item;
    });

    try {
      const updateResponse = await api.aswork.updateSendto(updatedRows);
      console.log(updateResponse);
      setIsStatus(true);
    } catch (error) {
      console.error(error);
    }

    // Call the callback function with the selected usernames
    onSelectUsername(selectedUsernames);
  };

  const columns = [{ field: 'username', headerName: 'Mail Contact', width: 300 }];

  useEffect(() => {
    fetchUser();
    fetchAllUser();
    workNoData();
    console.log('', selectedRow);
  }, [selectedRow]);

  return (
    <div>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Send To
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <Button onClick={handleButtonClick} style={{ marginBottom: '16px' }}>
                Submit
              </Button>
              {error && <p style={{ color: 'red' }}>Please select a recipient.</p>}
              <div style={{ height: 400, width: 500, position: 'relative' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick={true}
                  getRowId={(row) => row.username}
                  onSelectionModelChange={(newSelection) => {
                    setSelectedRow(newSelection);
                    setError(false); // Reset error state when selection changes
                  }}
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
