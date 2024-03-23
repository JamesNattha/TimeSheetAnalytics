import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Stack, Tooltip, Popover, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
const { useTheme } = require('@emotion/react');
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CellExpander from 'components/third-party/CellExpanded';

const useColumns = (handleAdd, setCustomer, handleDeleteCustomer) => {
  const theme = useTheme();
  // const navigate = useNavigate();

  const columns = [
    {
      Header: 'PositionID',
      accessor: 'Position_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Position Code',
      accessor: 'position_code',
      disableSortBy: true,
      truncate: 10,
      width: '10%'
    },
    {
      Header: 'Position Name',
      accessor: 'position_name',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'Manday (hours)',
      accessor: 'manday',
      disableSortBy: true
      //   hidden: true
    },
    {
      Header: 'Actual (hours)',
      accessor: 'actual',
      disableSortBy: true
      //   hidden: true
    },
    {
      Header: 'Total (hour)',
      accessor: 'total',
      disableSortBy: true,
      // hidden: true
    },

    {
      Header: 'Start Date',
      accessor: 'start_date',
      disableSortBy: true,
      hidden: true
      // width: '70%'
    },
    {
      Header: 'Finish Date',
      accessor: 'finish_date',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Go Live',
      accessor: 'due_date',
      hidden: true
    },
    {
      Header: 'CreateDate',
      accessor: 'created_date',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Is Active',
      accessor: 'is_active',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Is Deleted',
      accessor: 'is_deleted',
      disableSortBy: true,
      hidden: true
    }
  ];

  return columns;
};

export default useColumns;
