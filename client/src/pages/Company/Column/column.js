import React, { useState } from 'react';
import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Stack, Tooltip, Popover, ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import CellExpander from 'components/third-party/CellExpanded';
import IconButton from 'components/@extended/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { HeaderSort, IndeterminateCheckbox, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

//------------------------------------------------------ Code ----------------------------------------------------------------//
const { useTheme } = require('@emotion/react');

const useColumns = (handleAdd, setCustomer, namePage, status, isDelete) => {
  console.log('in column', status);
  const columns = [
    {
      Header: ' ',
      accessor: 'id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'No.',
      accessor: 'autoNumber',
      disableSortBy: true,
      className: 'cell-right',
      width: '5%'
      // hidden: true
    },
    {
      Header: `${namePage} Code`,
      accessor: 'code',
      disableSortBy: true,
      width: '20%'
    },
    {
      Header: `${namePage} Name`,
      accessor: 'name',
      disableSortBy: true
    },
    {
      Header: `Department`,
      accessor: 'department',
      disableSortBy: true,
      hidden: namePage !== 'position'
    },
    {
      Header: ' ',
      accessor: 'nos',
      disableSortBy: true
      // hidden: true
    },

    {
      Header: `depart_id`,
      accessor: 'dp_id',
      disableSortBy: true,
      hidden: status
    },
    {
      Header: 'Email',
      accessor: 'email',
      disableSortBy: true,
      hidden: status
    },

    {
      Header: 'starting working date',
      accessor: 'startDate',
      disableSortBy: true,
      hidden: status
    },
    {
      Header: 'Nickname',
      accessor: 'nickname',
      disableSortBy: true,
      hidden: status
    },
    {
      Header: 'Role',
      accessor: 'role',
      disableSortBy: true,
      hidden: status
    },
    {
      Header: ' ',
      accessor: 'status_de',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: ' ',
      accessor: 'profile',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: ' ',
      accessor: 'createAt',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Actions',
      className: 'cell-center',
      disableSortBy: true,
      accessor: 'act',
      hidden: !status,
      // eslint-disable-next-line
      Cell: ({ row }) => {
        const theme = useTheme();
        // eslint-disable-next-line
        const { values, isExpanded, toggleRowExpanded } = row;
        const [popoverAnchor, setPopoverAnchor] = useState(null);
        const collapseIcon = isExpanded ? (
          <CloseOutlined style={{ color: theme.palette.error.main }} />
        ) : (
          <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
        );

        const handleSeeMoreClick = (e) => {
          setPopoverAnchor(e.currentTarget);
        };

        const handlePopoverClose = () => {
          setPopoverAnchor(null);
        };

        const cellExpander = values.profile.length > 0 ? <CellExpander row={row} /> : <CellExpander row={row} hidden={true} />;

        return (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            <Tooltip title="See More">
              <IconButton color="secondary" onClick={handleSeeMoreClick}>
                {/* Material-UI "MoreVert" Icon */}
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
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
                // eslint-disable-next-line
                disabled={values.status_de}
                onClick={() => {
                  handlePopoverClose();
                  isDelete(values);
                }}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="small" sx={{ color: '#ED4040' }} />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
            </Popover>
            {/* <CellExpander row={row} /> */}
            {cellExpander}
            {/* <Tooltip title="View">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRowExpanded();
                }}
              >
                {collapseIcon}
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setCustomer(values);
                  handleAdd();
                }}
              >
                <EditTwoTone twoToneColor={theme.palette.primary.main} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  isDelete(values);
                }}
              >
                <DeleteTwoTone twoToneColor={theme.palette.error.main} />
              </IconButton>
            </Tooltip> */}
          </Stack>
        );
      }
    }
  ];
  return columns;
};

export default useColumns;
