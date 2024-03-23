import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';

// import { HeaderSort, IndeterminateCheckbox, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

//------------------------------------------------------ Code ----------------------------------------------------------------//
const { useTheme } = require('@emotion/react');

const useColumns = (handleAdd, setCustomer, namePage, theme, status ,isDelete) => {
  const columns = [
    {
      Header: 'no',
      accessor: 'no',
      disableSortBy: true,
      className: 'cell-right'
    },
    {
      Header: 'id',
      accessor: 'profile_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: `Full name`,
      accessor: 'profile_name',
      disableSortBy: true,
      Cell: ({ value }) => {
        if (value === null) {
          return (
            <span style={{ color: '#FBC756' }}>Pending</span>
          );
        }
        return value;
      },
      
    },
    {
      Header: `Nick Name`,
      accessor: 'profile_nickname',
      disableSortBy: true,
      Cell: ({ value }) => {
        if (value === null) {
          return (
            <span style={{ color: '#FBC756' }}>Pending</span>
          );
        }
        return value;
      },
    },
    {
      Header: 'Email',
      accessor: 'profile_email',
      disableSortBy: true,
    },
    {
      Header: 'create',
      accessor: 'profile_date',
      disableSortBy: true,
      hidden: true,
    },

    {
      Header: 'starting working date',
      accessor: 'profile_startworkdate',
      disableSortBy: true,
    },
    {
      Header: 'Role',
      accessor: 'profile_role',
      disableSortBy: true,
    },
  ];
  return columns;
};

export default useColumns;
