//React
import React, { useState, useCallback } from 'react';

//MUI
import { useTheme } from '@mui/material/styles';
// import { Dialog, Typography } from '@mui/material';
// import { Typography } from '@mui/material';

//Component
import ReactTable from 'components/third-party/ReactTableDT';
import ScrollX from 'components/ScrollX';

//Other
import useNewPerson from '../Data/data_sub_position';
import useColumns from '../Column/column_sub_position';

const SubItems = (DatafromIndex) => {
  // console.log('DatafromIndex',DatafromIndex)
  // console.log('DatafromIndex', DatafromIndex);
  const theme = useTheme();
  const data = useNewPerson(DatafromIndex);
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const [worknoId, setWorknoId] = useState(null);

  const handleAdd = () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
  };

  const handleDelete = (worknoId) => {
    setCustomer(null);
    setAdd(false);
    setWorknoId(worknoId);
  };

  const columns = useColumns(handleAdd, setCustomer, handleDelete, worknoId);

  return (
    <>
      <div
        style={{
          width: '100%',
          // margin: '10px',
          border: '1px solid #ccc',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px'
        }}
      >
        <ScrollX>
          <ReactTable columns={columns} data={data} handleAdd={handleAdd} getHeaderProps={(column) => column.getSortByToggleProps()} />
        </ScrollX>
      </div>
    </>
  );
};

export default SubItems;
