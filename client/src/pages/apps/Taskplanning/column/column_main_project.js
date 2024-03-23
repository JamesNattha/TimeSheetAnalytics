import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Stack, Tooltip, Popover, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
const { useTheme } = require('@emotion/react');
import MoreVertIcon from '@mui/icons-material/MoreVert';

const useColumns = (handleAdd, setCustomer, handleDeleteCustomer) => {
  const theme = useTheme();
  // const navigate = useNavigate();

  const columns = [
    {
      Header: 'No',
      accessor: 'autoNumber',
      className: 'cell-right',
      width: '5%',
      disableSortBy: true
    },
    {
      Header: 'ProjectId',
      accessor: 'project_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Project Code',
      accessor: 'project_code',
      disableSortBy: true,
      truncate: 10,
      width: '10%'
    },
    {
      Header: 'Project Name',
      accessor: 'project_name',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'Client Id',
      accessor: 'client_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Client Name',
      accessor: 'client_name',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'Group Id',
      accessor: 'group_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Group',
      accessor: 'group_name',
      disableSortBy: true,
      hidden: true
    },

    {
      Header: 'Start Date',
      accessor: 'start_date',
      disableSortBy: true
      // width: '70%'
    },
    {
      Header: 'Finish Date',
      accessor: 'finish_date',
      disableSortBy: true
    },
    {
      Header: 'Go Live',
      accessor: 'due_date'
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
    },
    {
      Header: 'Actions',
      accessor: 'action',
      className: 'cell-center',
      width: '10%',
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

            {/* <CellExpander row={row} /> */}
          </Stack>
        );
      }
    }
  ];

  return columns;
};

export default useColumns;
