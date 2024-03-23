import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Stack, Tooltip, Typography, Chip, Button } from '@mui/material';
import Resend from 'assets/images/icons-svg/resend';
import IconButton from 'components/@extended/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
// import { HeaderSort, IndeterminateCheckbox, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

//------------------------------------------------------ Code ----------------------------------------------------------------//
const { useTheme } = require('@emotion/react');

const useColumns = (handleAdd, setCustomer, namePage, theme, status, isDelete, handleResendEmail) => {
  const columns = [
    {
      Header: 'No.',
      accessor: 'autoNumber',
      disableSortBy: true,
      width: '5%'
      // hidden: true
    },
    {
      Header: 'Email',
      accessor: 'email',
      disableSortBy: true
    },
    {
      Header: `Full Name`,
      accessor: 'name',
      disableSortBy: true,
      Cell: ({ row }) => {
        const theme = useTheme();
        const { values } = row;

        // Define a custom text color based on the cell value
        const textColor = values.name === 'Pending' ? '#FBC756' : 'inherit';

        return <div style={{ color: textColor }}>{values.name}</div>;
      }
    },
    {
      Header: `NickName`,
      accessor: 'nickname',
      disableSortBy: true,
      Cell: ({ row }) => {
        const theme = useTheme();
        const { values } = row;
        console.log('values.nickname', values.nickname);
        // Define a custom text color based on the cell value
        const textColor = values.nickname === 'Pending' ? '#FBC756' : 'inherit';

        return <div style={{ color: textColor }}>{values.nickname}</div>;
      }
    },
    {
      Header: 'Year Experience',
      accessor: 'exp',
      disableSortBy: true,
      // width: 'auto'
    },
    {
      Header: 'Data Person',
      accessor: 'person',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'active',
      accessor: 'active',
      disableSortBy: true,
      hidden: true,
    },
    {
      Header: <div style={{ textAlign: 'center' }}>Status</div>,
      accessor: 'status',
      className: 'cell-center',
      disableSortBy: true,
      Cell: ({ row }) => {
        const theme = useTheme();
        const { values, isExpanded, toggleRowExpanded } = row;

        console.log('data value in column', values);
        const joinStatus = values.status?.join;
        const deleteStatus = values.status?.delete;
        const activeStatus = values.status?.active;
        if (joinStatus === true) {
          // Status is true, display "Joined" Chip
          return (
            <Stack
              direction="column"
              alignItems="center" // Center horizontally
              justifyContent="center" // Center vertically
              spacing={0}
            >
              <Chip
                sx={{
                  width: '80px',
                  borderRadius: 30,
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap'
                }}
                size="small"
                color="success"
                label="Joined"
              />
            </Stack>
          );
        } else if (deleteStatus === true) {
          // Status is true, display "Joined" Chip
          return (
            <Stack
              direction="column"
              alignItems="center" // Center horizontally
              justifyContent="center" // Center vertically
              spacing={0}
            >
              <Chip
                sx={{
                  p: '4px 12px',
                  width: '80px',
                  borderRadius: 30,
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap'
                }}
                size="small"
                color="error"
                label="Deleted"
              />
            </Stack>
          );
        } else if (activeStatus === false) {
          // Status is false, display the Stack with "Invited" Chip and Button

          return (
            <Stack
              direction="column"
              alignItems="center" // Center horizontally
              justifyContent="center" // Center vertically
              spacing={0}
            >
              <Chip
                sx={{
                  width: '80px',
                  borderRadius: 30,
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap'
                }}
                size="small"
                color="primary"
                label="Inactive"
              />
            </Stack>
          );
        } else if (joinStatus === false) {
          // Status is true, display "Joined" Chip
          return (
            <Stack
              direction="column"
              alignItems="center" // Center horizontally
              justifyContent="center" // Center vertically
              spacing={0}
            >
              <>
                <Chip
                  sx={{
                    p: '4px 12px',
                    width: '130px',
                    borderRadius: 30
                  }}
                  size="small"
                  color="warning"
                  // variant="outlined"
                  label="Invited Process"
                />
              </>
            </Stack>
          );
        }
      }
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
        const collapseIcon = isExpanded ? (
          <CloseOutlined style={{ color: theme.palette.error.main }} />
        ) : (
          <EyeTwoTone twotonecolor={theme.palette.secondary.main} />
        );

        if (!values.status.join && !values.active) {
          console.log ('value.status',values.status)
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Resend">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResendEmail(values);
                  }}
                >
                  <Resend />
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
                  <ModeEditOutlineIcon twoToneColor={theme.palette.primary.main} />
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
                  <DeleteIcon twoToneColor={theme.palette.error.main} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        } else {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <IconButton
                color="primary"
                disabled={!values.status.join ? false : true}
                onClick={(e) => {
                  e.stopPropagation();
                  handleResendEmail(values);
                  // handleResendEmail(values);
                }}
              >
                {/* <Resend /> */}
              </IconButton>

              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomer(values);
                    handleAdd();
                  }}
                >
                  <ModeEditOutlineIcon twoToneColor={theme.palette.primary.main} />
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
                  <DeleteIcon twoToneColor={theme.palette.error.main} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    }
  ];
  return columns;
};

useColumns.propTypes = {
  row: PropTypes.shape({
    values: PropTypes.shape({
      name: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      status: PropTypes.shape({
        join: PropTypes.bool.isRequired,
        delete: PropTypes.bool.isRequired,
        active: PropTypes.bool.isRequired
      }).isRequired
    }).isRequired
  })
};

export default useColumns;
