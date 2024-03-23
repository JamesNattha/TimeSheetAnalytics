import React, { useState } from 'react';
const { useTheme } = require('@emotion/react');

import MoreVertIcon from '@mui/icons-material/MoreVert';

const useColumns = (handleAdd, setCustomer, handleDelete) => {
  const theme = useTheme();

  const columns = [
    {
      Header: 'ClientId',
      accessor: 'client_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Code.',
      accessor: 'client_code',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Person\u00A0in\u00A0charge',
      accessor: 'client_incharge',
      disableSortBy: true,
      width: '20%' // Set the width here (e.g., 150px)
    },
    {
      Header: 'Nickname',
      accessor: 'client_nickname',
      disableSortBy: true,
      width: '20%' // Set the width here (e.g., 150px)
    },

    {
      Header: 'Email',
      accessor: 'email',
      disableSortBy: true,
      width: '20%' // Set the width here (e.g., 180px)
    },
    {
      Header: 'Phone\u00A0number',
      accessor: 'client_phone',
      disableSortBy: true,
      width: '10%' // Set the width here (e.g., 150px)
    },
    {
      Header: 'Notes',
      accessor: 'client_detail',
      disableSortBy: true,
      width: '40%' // Set the width here (e.g., 200px)
    },
    {
      Header: 'Contact Date',
      accessor: 'createdAt',
      disableSortBy: true,
      width: '10%', // Set the width here (e.g., 160px)
      hidden: 'true'
    }
  ];

  return columns;
};

export default useColumns;
