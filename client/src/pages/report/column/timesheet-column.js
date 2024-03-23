import React, { useMemo } from 'react';
import { Chip, Typography } from '@mui/material';
import LinearWithLabel from 'components/@extended/Progress/LinearWithLabel';
import Avatar from 'components/@extended/Avatar';
import NumberFormat from 'react-number-format';
import { IndeterminateCheckbox } from 'components/third-party/ReactTable';
import { roundedMedian, filterGreaterThan, SelectColumnFilter, SliderColumnFilter, NumberRangeColumnFilter } from 'utils/react-table';

const avatarImage = require.context('assets/images/users', true);

const useColumns = (handleAdd, setCustomer, handleDeleteCustomer) => {
  const columns = [
    {
      title: 'Row Selection',
      // eslint-disable-next-line
      Header: ({ getToggleAllPageRowsSelectedProps }) => <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />,
      Footer: '#',
      accessor: 'selection',
      // eslint-disable-next-line
      Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
      disableSortBy: true,
      disableFilters: true,
      disableGroupBy: true,
      Aggregated: () => null
    },
    {
      Header: '#',
      Footer: '#',
      accessor: 'id',
      className: 'cell-center',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Avatar',
      Footer: 'Avatar',
      accessor: 'avatar',
      className: 'cell-center',
      disableFilters: true,
      disableGroupBy: true,
      // eslint-disable-next-line
      Cell: ({ value }) => <Avatar alt="Avatar 1" size="sm" src={avatarImage(`./avatar-${!value ? 1 : value}.png`)} />
    },
    {
      Header: 'First Name',
      Footer: 'First Name',
      accessor: 'firstName',
      disableGroupBy: true,
      aggregate: 'count',
      Aggregated: ({ value }) => `${value} Person`
    },
    {
      Header: 'Last Name',
      Footer: 'Last Name',
      accessor: 'lastName',
      filter: 'fuzzyText',
      disableGroupBy: true
    },
    {
      Header: 'Father Name',
      Footer: 'Father Name',
      accessor: 'fatherName',
      disableGroupBy: true
    },
    {
      Header: 'Email',
      Footer: 'Email',
      accessor: 'email',
      disableGroupBy: true
    },
    {
      Header: 'Age',
      Footer: 'Age',
      accessor: 'age',
      className: 'cell-right',
      Filter: SliderColumnFilter,
      filter: 'equals',
      aggregate: 'average',
      Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`
    },
    {
      Header: 'Role',
      Footer: 'Role',
      accessor: 'role',
      disableGroupBy: true
    },
    {
      Header: 'Contact',
      Footer: 'Contact',
      accessor: 'contact',
      disableGroupBy: true
    },
    {
      Header: 'Country',
      Footer: 'Country',
      accessor: 'country',
      disableGroupBy: true
    },
    {
      Header: 'Visits',
      accessor: 'visits',
      className: 'cell-right',
      Filter: NumberRangeColumnFilter,
      filter: 'between',
      disableGroupBy: true,
      aggregate: 'sum',
      Aggregated: ({ value }) => `${value} (total)`,
      Footer: (info) => {
        const { rows } = info;
        // only calculate total visits if rows change
        const total = useMemo(() => rows.reduce((sum, row) => row.values.visits + sum, 0), [rows]);

        return (
          <Typography variant="subtitle1">
            <NumberFormat value={total} displayType="text" thousandSeparator />
          </Typography>
        );
      }
    },
    {
      Header: 'Status',
      Footer: 'Status',
      accessor: 'status',
      Filter: SelectColumnFilter,
      filter: 'includes',
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
      Footer: 'Profile Progress',
      accessor: 'progress',
      Filter: SliderColumnFilter,
      filter: filterGreaterThan,
      disableGroupBy: true,
      aggregate: roundedMedian,
      Aggregated: ({ value }) => `${value} (med)`,
      // eslint-disable-next-line
      Cell: ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 140 }} />
    }
  ];

  return columns;
};

export default useColumns;
