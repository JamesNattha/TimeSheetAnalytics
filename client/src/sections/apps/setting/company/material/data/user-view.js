//React
import React, { useCallback, useState } from 'react';

//MUI
import { useTheme } from '@mui/material/styles';

// material
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTableDT';

import useNewPerson from './user-data';
import useColumns from './column-user';

// ==============================|| CUSTOMER - LIST VIEW ||============================== //

const CustomerList = ({ dataDepartment }) => {
  const theme = useTheme();
  console.log('dataDepartment', dataDepartment.profile);
  const name = dataDepartment.company;
  const data = useNewPerson(dataDepartment.profile, name);
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const [status, setStatus] = useState(true);
  const namePage = 'user';

  const handleAdd = () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
  };

  const columns = useColumns(handleAdd, setCustomer, namePage, theme, status);
  if (dataDepartment.profile.length > 0) {
    return (
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
          <ReactTable
            columns={columns}
            data={data}
            namepage={namePage}
            handleAdd={handleAdd}
            getHeaderProps={(column) => column.getSortByToggleProps()}
            sortColumn={'no'}
          />
        </ScrollX>
      </div>
    );
  } else {
    null
  }
};

export default CustomerList;
