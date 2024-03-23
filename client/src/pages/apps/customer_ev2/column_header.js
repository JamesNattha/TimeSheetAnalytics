import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { useNavigate } from 'react-router-dom';
import DeleteWork from 'sections/apps/customer_ev2/DeleteWork';

const { useTheme } = require('@emotion/react');

const useColumns = (handleAdd, setCustomer, handleDelete) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Row Selection',
      accessor: 'selection',
      disableSortBy: true
    },
    {
      Header: 'Work Id',
      accessor: 'id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Customer Name',
      accessor: 'customerName',
      disableSortBy: true
    },
    {
      Header: 'Address',
      accessor: 'customerAddress',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Email',
      accessor: 'customerEmail',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Phone Number',
      accessor: 'customerPhone',
      disableSortBy: true,
      hidden: true
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
      accessor: 'sumTime',
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
        const { values } = row;
        const collapseIcon = <EyeTwoTone twoToneColor={theme.palette.secondary.main} />;
        return (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            <Tooltip title="View">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/project', { state: { id: values.id } });
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
                  const handleDeleteClick = DeleteWork({ customerId: values.id });
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
