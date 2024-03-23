import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
// import { HeaderSort, IndeterminateCheckbox, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

//------------------------------------------------------ Code ----------------------------------------------------------------//
const { useTheme } = require('@emotion/react');

const useColumns = (handleAdd, setCustomer) => {
  const theme = useTheme();

  const columns = [
    {
      title: 'Row Selection',
      // eslint-disable-next-line
      // Header: ({ getToggleAllPageRowsSelectedProps }) => <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />,
      accessor: 'selection',
      // eslint-disable-next-line
      // Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
      disableSortBy: true
      // hidden: true
    },
    {
      Header: 'Work Id',
      accessor: 'id',
      disableSortBy: true
    },
    {
      Header: 'Work Name',
      accessor: 'workNo',
      disableSortBy: true
    },
    {
      Header: 'Detail',
      accessor: 'detail',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Created At',
      accessor: 'createdAt'
    },
    {
      Header: 'Start Date',
      accessor: 'startDate',
      disableSortBy: true
    },
    {
      Header: 'End Date',
      accessor: 'endDate',
      disableSortBy: true
    },
    {
      Header: 'Note',
      accessor: 'note',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Actions',
      className: 'cell-center',
      disableSortBy: true,
      // eslint-disable-next-line
      Cell: ({ row }) => {
        const theme = useTheme();
        // eslint-disable-next-line
        const { values, isExpanded, toggleRowExpanded } = row;
        const collapseIcon = isExpanded ? (
          <CloseOutlined style={{ color: theme.palette.error.main }} />
        ) : (
          <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
        );
        return (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            <Tooltip title="View">
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
                }}
              >
                <DeleteTwoTone twoToneColor={theme.palette.error.main} />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      }
    }
  ];
  return columns;
};

export default useColumns;
