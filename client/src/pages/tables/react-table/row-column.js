import { Chip } from '@mui/material';
import LinearWithLabel from 'components/@extended/Progress/LinearWithLabel';

export const rowColumn = [
  {
    Header: 'First Name',
    accessor: 'firstName'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Create',
    accessor: 'age',
    className: 'cell-center'
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    className: 'cell-right'
  },
  {
    Header: 'Profile Progress',
    accessor: 'progress',
    Cell: ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
  }
];
