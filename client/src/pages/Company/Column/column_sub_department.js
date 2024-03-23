import { CloseOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';

// import { HeaderSort, IndeterminateCheckbox, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

//------------------------------------------------------ Code ----------------------------------------------------------------//
const { useTheme } = require('@emotion/react');

const useColumns = (handleAdd, setCustomer, namePage, status) => {
  const columns = [
    {
      Header: 'no',
      accessor: 'no',
      disableSortBy: true,
      className: 'cell-right',
      // hidden: true
    },
    {
      Header: 'id',
      accessor: 'position_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: `Position Code.`,
      accessor: 'position_code',
      disableSortBy: true
    },
    {
      Header: `Position Name`,
      accessor: 'position_name',
      disableSortBy: true
    },
    {
      Header: 'create',
      accessor: 'position_date',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'create',
      accessor: 'dummy1',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: ' ',
      accessor: 'dummy2',
      disableSortBy: true,
      hidden: false
    },
    {
      Header: ' ',
      accessor: 'dummy3',
      disableSortBy: true,
      hidden: false
    },
    {
      Header: ' ',
      accessor: 'dummy4',
      disableSortBy: true,
      hidden: false
    }
  ];
  return columns;
};

export default useColumns;
