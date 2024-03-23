import React from 'react';

import { IndeterminateCheckbox } from 'components/third-party/ReactTable';

const useColumns = () => {
  const columns = [
    {
      Header: <div style={{ textAlign: 'center' }}>No.</div>,
      accessor: 'autoNumber',
      className: 'cell-right',
      disableSortBy: true
    },
    {
      Header: 'Client Id',
      accessor: 'client_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Client Name',
      accessor: 'client_name',
      truncate: 20,
      disableSortBy: true
    },
    {
      Header: 'ProjectId',
      accessor: 'project_id',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Project Names',
      accessor: 'project_name',
      truncate: 17,
      disableSortBy: true
    },
    {
      Header: 'Group Id',
      accessor: 'group_id',
      truncate: 17,
      hidden: true,
      disableSortBy: true
    },
    {
      Header: 'Group Names',
      accessor: 'group_name',
      truncate: 17,
      disableSortBy: true
    },
    {
      Header: 'Start Date',
      accessor: 'start_date',
      disableSortBy: true
    },
    {
      Header: 'Finish Date',
      accessor: 'finish_date',
      disableSortBy: true
    },
    {
      Header: 'Go Live',
      accessor: 'due_date',
      disableSortBy: true
    },
    {
      Header: 'CreateDate',
      accessor: 'created_date',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Is Active',
      accessor: 'is_active',
      disableSortBy: true,
      hidden: true
    },
    {
      Header: 'Is Deleted',
      accessor: 'is_deleted',
      disableSortBy: true,
      hidden: true
    }
  ];

  return columns;
};

export default useColumns;
