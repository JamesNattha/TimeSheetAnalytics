import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DeleteWork from 'sections/apps/project_fetch/DeleteWork';

const { useTheme } = require('@emotion/react');

const useColumns = (handleAdd, setCustomer, handleDelete, customerId) => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate

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
      Header: 'Project Id',
      accessor: 'id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Project Name',
      accessor: 'projectName',
      disableSortBy: true
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
      Header: 'Sum Time',
      accessor: 'timeSet',
      disableSortBy: true
    },
    {
      Header: 'Status',
      accessor: 'projectStatus',
      disableSortBy: true,
      hidden: true
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
            <Tooltip title="View">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to the project_fetch/work_table.js page with the id as a query parameter
                  navigate('/work', { state: { id: values.id } });
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
                  const handleDeleteClick = DeleteWork({ projectId: values.id });
                  handleDeleteClick();
                  // console.log('values.id', values.id);
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
