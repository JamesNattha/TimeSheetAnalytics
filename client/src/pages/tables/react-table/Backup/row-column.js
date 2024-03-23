import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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
    Header: 'Age',
    accessor: 'age',
    className: 'cell-right'
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    className: 'cell-right'
  },
  {
    Header: 'Status',
    accessor: 'status',
    // eslint-disable-next-line
    Cell: ({ value }) => {
      switch (value) {
        case 'Complicated':
          return <Chip color="error" label="Complicated" size="small" variant="light" />;
        case 'Relationship':
          return <Chip color="success" label="Relationship" size="small" variant="light" />;
        case 'Single':
        default:
          return <Chip color="info" label="Single" size="small" variant="light" />;
      }
    }
  },
  {
    Header: 'Profile Progress',
    accessor: 'progress',
    // eslint-disable-next-line
    Cell: ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
  }
];
