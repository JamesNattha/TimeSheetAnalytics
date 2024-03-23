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
      Header: 'PositionId',
      accessor: 'position_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Position Code',
      accessor: 'position_code',
      disableSortBy: true,
      width: '20%'
    },
    {
      Header: 'Position Name',
      accessor: 'position_name',
      disableSortBy: true,
      width: '20%'
    },
    {
      Header: 'Position Date',
      accessor: 'created_date',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Department Name',
      accessor: 'department_name',
      width: '50%',
      disableSortBy: true
    },
    {
      Header: 'Department Id',
      accessor: 'department_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Profile id',
      accessor: 'profile_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Profile Firstname',
      accessor: 'profile_firstname',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Profile Lastname',
      accessor: 'profile_lastname',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Profile Nickname',
      accessor: 'profile_nickname',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'have data',
      accessor: 'is_disabled',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Profile Email',
      accessor: 'profile_email',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Profile startwork',
      accessor: 'profile_startworkdate',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Profile Role',
      accessor: 'profile_role',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Profile Date',
      accessor: 'profile_date',
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
                  handleAdd(values);
                  // handlePopoverClose();
                }}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" sx={{ color: '#0066FF' }} />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>

              <MenuItem
                disabled={values.is_disabled}
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
