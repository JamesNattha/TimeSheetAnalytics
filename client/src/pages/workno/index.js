import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, TextField } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { useRecoilState } from 'recoil';
import { isInfoEdit, isInfoState, isInfoButton } from '../../recoil';
import { useNavigate } from 'react-router-dom';

import api from '_api';
import Swal from 'sweetalert2';

import SearchInput from '../../components/SearchInput';
import WorkTable from '../../components/WorkTable';

export default function CreatedTableList() {
  const [data, setData] = useState([]);
  const [isStatus, setIsStatus] = useState([]);
  const [username, setUsername] = useRecoilState(isInfoState);
  const [edit, setEdit] = useRecoilState(isInfoEdit);
  const [text, setText] = useRecoilState(isInfoButton);
  const navigate = useNavigate();

  const fetchWork = async () => {
    try {
      const { data, isStatus } = await api.workno.fetchWorkTable();
      // console.log(data);
      if (isStatus) {
        const modifiedData = data.map((item) => ({
          ...item,
          sendTo: item.sendTo ? item.sendTo.replace(/,/g, '\n') : '' // Check for null or undefined
        }));

        setData(modifiedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWork();
  }, []);

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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  const DeleteClick = async (worknoId) => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่',
      text: 'จะลบข้อมูลจริงๆ ละน้า เอาคืนไม่ได้เน้อ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ฉันต้องการลบ',
      cancelButtonText: 'ฉันไม่ต้องการลบ'
    }).then(async (result) => {
      if (result.value) {
        try {
          const response = await api.workno.deleteWorkNo({ worknoId });
          Swal.fire('ลบข้อมูลเรียบร้อยแล้ว', '', 'success');
        } catch (error) {
          console.error(error);
          Swal.fire('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
        }
      }
      window.location.reload(true);
    });
  };

  const handleEditClick = (worknoId) => {
    //set ค่าลงใน recoil state
    setEdit(worknoId);
    navigate(`../edit`);
  };

  const handleUsernameClick = (worknoId) => {
    setUsername(worknoId);
    navigate('../info');
  };

  const handleCreateClick = () => {
    const text = 'Create';
    setText(text);
    navigate(`../list`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) => {
    // Perform case-insensitive search on the workName and detail properties
    const workName = item.workName.toLowerCase();
    const detail = item.detail.toLowerCase();
    const query = searchQuery.toLowerCase();

    return workName.includes(query) || detail.includes(query);
  });

  useEffect(() => {
    setText('Create');

    return () => {
      setText(''); // Clear the text value when the component is unmounted
    };
  }, [setText]);

  return (
    <div>
      <SearchInput value={searchQuery} onChange={handleSearchChange} onCreate={handleCreateClick} text={text} />
      <WorkTable
        data={filteredData}
        onDeleteClick={DeleteClick}
        onEditClick={handleEditClick}
        onUsernameClick={handleUsernameClick}
        formatDate={formatDate}
      />
    </div>
  );
}
