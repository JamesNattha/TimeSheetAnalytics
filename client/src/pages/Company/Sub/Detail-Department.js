import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import MainCard from 'components/MainCard';

const ImportPopup = ({ data }) => {
  console.log('data dddddddddddddddddddd', data);

  const [newData, setNewData] = useState(data.position);
  console.log('new dATA', newData);

  return (
    <MainCard>
      <>
        <div className="row">
          <div className="col-sm-6 offset-3">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Position Code</TableCell>
                  <TableCell>Position Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newData.map((item, index) => (
                  <TableRow key={item.position_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.position_code}</TableCell>
                    <TableCell>{item.position_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    </MainCard>
  );
};

export default ImportPopup;
