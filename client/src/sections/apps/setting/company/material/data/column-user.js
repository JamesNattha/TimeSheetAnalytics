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
      accessor: 'id',
      disableSortBy: true,
      hidden: status
    },
    {
      Header: `Full name`,
      accessor: 'name',
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
      accessor: 'nickname',
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
      accessor: 'email',
      disableSortBy: true,
    },
    {
      Header: 'create',
      accessor: 'created_date',
      disableSortBy: true,
      hidden: true,
    },

    {
      Header: 'starting working date',
      accessor: 'startDate',
      disableSortBy: true,
    },
    {
      Header: 'Role',
      accessor: 'role',
      disableSortBy: true,
    },
  ];
  return columns;
};

export default useColumns;
