import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Stack, Tooltip, Popover, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import CellExpander from 'components/third-party/CellExpanded';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const useColumns = (handleAdd, setCustomer, handleDeleteCustomer) => {
  // const theme = useTheme();

  const columns = [
    {
      Header: 'No.',
      accessor: 'autoNumber',
      disableSortBy: true,
      className: 'cell-right'
    },
    {
      Header: 'ClientId',
      accessor: 'client_id',
      disableSortBy: true,

      hidden: true
    },
    {
      Header: 'Client Code',
      accessor: 'client_code',
      disableSortBy: true,
      truncate: 12,
      width: '15%'
    },
    {
      Header: 'Client Name',
      accessor: 'client_name',
      disableSortBy: true,
      width: '70%'
    },
    {
      Header: 'Detail',
      accessor: 'client_detail',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Nickname',
      accessor: 'client_nickname',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Person in charge',
      accessor: 'client_incharge',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Email',
      accessor: 'email',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Phone Number',
      accessor: 'client_phone',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Contact Date',
      accessor: 'created_date',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'IsActive',
      accessor: 'is_active',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'IsDeleted',
      accessor: 'is_deleted',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Actions',
      className: 'cell-center',
      width: '15%',
      disableSortBy: true,
      Cell: ({ row }) => {
        const { values, isExpanded, toggleRowExpanded } = row;
        const [popoverAnchor, setPopoverAnchor] = useState(null);

        const handleSeeMoreClick = (e) => {
          setPopoverAnchor(e.currentTarget);
        };

        const handlePopoverClose = () => {
          setPopoverAnchor(null);
        };

        return (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            {/* "See More" Icon */}
            <Tooltip title="See More">
              <IconButton color="secondary" onClick={handleSeeMoreClick}>
                {/* Material-UI "MoreVert" Icon */}
                <MoreVertIcon />
              </IconButton>
            </Tooltip>

            {/* Popover with Edit and Delete Icons */}
            <Popover
              open={Boolean(popoverAnchor)}
              anchorEl={popoverAnchor}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setCustomer(values);
                  // console.log('values.id', values);
                  handleAdd();
                  // handlePopoverClose();
                }}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" sx={{ color: '#0066FF' }} />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>

              <MenuItem
                disabled={values.is_active}
                onClick={() => {
                  handleDeleteCustomer(values);
                  // console.log('values.id', values);
                }}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="small" sx={{ color: '#ED4040' }} />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
            </Popover>

            <CellExpander row={row} />
          </Stack>
        );
      }
    }
  ];

  return columns;
};

export default useColumns;
