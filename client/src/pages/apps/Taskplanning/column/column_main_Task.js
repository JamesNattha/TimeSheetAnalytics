import React, { useState } from 'react';

import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

import { Stack, Tooltip, Popover, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { useNavigate } from 'react-router-dom';
import DeleteWork from 'sections/apps/customer_ev2/delete/DeleteWork';
// import CellExpander from 'components/third-party/CellExpanded';
const { useTheme } = require('@emotion/react');
// import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const useColumns = (handleAdd, setCustomer, handleDelete) => {
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
      Header: 'Client Id',
      accessor: 'client_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Client',
      accessor: 'client_name',
      disableSortBy: true
    },
    {
      Header: 'ProjectId',
      accessor: 'project_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Project',
      accessor: 'project_name',
      disableSortBy: true
    },
    {
      Header: 'Work Id',
      accessor: 'work_id',
      hidden: true,
      disableSortBy: true
    },
    {
      Header: 'Work Code',
      accessor: 'work_code',
      disableSortBy: true
    },
    {
      Header: 'Work',
      accessor: 'work_name',
      disableSortBy: true
    },
    {
      Header: 'Work Type',
      accessor: 'work_type_name',
      disableSortBy: true
    },
    {
      Header: 'Work Level',
      accessor: 'work_level',
      disableSortBy: true
    },
    {
      Header: 'Status',
      accessor: 'work_status',
      disableSortBy: true
    },
    {
      Header: 'Details',
      accessor: 'detail',
      disableSortBy: true
    },
    {
      Header: 'Start Date',
      accessor: 'start_date',
      disableSortBy: true
    },
    {
      Header: 'End Date',
      accessor: 'end_date',
      disableSortBy: true
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
                  setCustomer(values.work_id);
                  // console.log('values.id', values.work_id);
                  handleAdd();
                  // handlePopoverClose();
                }}
              >
                <ListItemIcon>
                  <EditTwoTone fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
              <MenuItem
                disabled={values.is_active}
                onClick={() => {
                  handleDelete(values);
                  // console.log('values.id', values);
                }}
              >
                <ListItemIcon>
                  <DeleteTwoTone fontSize="small" />
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
