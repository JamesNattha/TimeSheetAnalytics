import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faCirclePause, faPaperPlane, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
// import { HeaderSort, IndeterminateCheckbox, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

//------------------------------------------------------ Code ----------------------------------------------------------------//
const { useTheme } = require('@emotion/react');

const useColumns = (handleAdd, setCustomer, handleDelete, worknoId) => {
  // Add handleDelete as a parameter
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
      Header: 'id',
      accessor: 'id' || 'worknoId',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Project',
      accessor: 'projectName',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Subitems Name',
      accessor: 'subitemName',
      disableSortBy: true
    },
    {
      Header: 'Owner',
      accessor: 'owner',
      hidden: true
    },
    {
      Header: 'Email',
      accessor: 'email',
      disableSortBy: true,
      // hidden: true
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
      Header: 'Status',
      accessor: 'status',
      disableSortBy: true
    },
    {
      Header: 'Timer',
      accessor: 'timer',
      disableSortBy: true
    },
    {
      Header: 'Actions',
      className: 'cell-center',
      disableSortBy: true,
      Cell: ({ row }) => {
        const theme = useTheme();
        const { values, isExpanded, toggleRowExpanded } = row;
        const collapseIcon = isExpanded ? (
          <CloseOutlined style={{ color: theme.palette.error.main }} />
        ) : (
          <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
        );
        return (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
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
            </Tooltip> */}
            <Tooltip title="Start">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRowExpanded();
                }}
              >
                <FontAwesomeIcon icon={faPlay} style={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Stop">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRowExpanded();
                }}
              >
                <FontAwesomeIcon icon={faStop} style={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Pause">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRowExpanded();
                }}
              >
                <FontAwesomeIcon icon={faCirclePause} style={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRowExpanded();
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} style={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRowExpanded();
                }}
              >
                <FontAwesomeIcon icon={faCircleXmark} rotation={90} style={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Edit">
              <IconButto
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
                  handleDelete(values.worknoId, worknoId); // Pass both values.worknoId and worknoId
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
