import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useFilters, useRowSelect, useTable, usePagination } from 'react-table';

// project import
// import MainCard from 'components/MainCard';
// import ScrollX from 'components/ScrollX';
// import LinearWithLabel from 'components/@extended/Progress/LinearWithLabel';
// import makeData from 'data/react-table';
// import SyntaxHighlight from 'utils/SyntaxHighlight';
import { renderFilterTypes } from 'utils/react-table';
import { IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

// ==============================|| REACT TABLE ||============================== //

export default function ReactTable({ columns, data }) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    // @ts-ignore
    page,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { selectedRowIds, pageIndex, pageSize },
    // @ts-ignore
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      filterTypes,
      // @ts-ignore
      // initialState: { pageIndex: 0, pageSize: 10, selectedRowIds: { 0: true, 5: true, 7: true } }
    },
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: 'row-selection-chk',
          accessor: 'Selection',
          // eslint-disable-next-line
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
          ),
          // eslint-disable-next-line
          Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ]);
    }
  );

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  key={i}
                  {...row.getRowProps()}
                  onClick={() => {
                    row.toggleRowSelected();
                  }}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit'
                  }}
                >
                  {row.cells.map((cell, i) => (
                    <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell sx={{ p: 2, pb: 0 }} colSpan={8}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Show JSON File ALL SHOULD COMMENT */}
        {/* <SyntaxHighlight>
          {JSON.stringify(
            {
              selectedRowIndices: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map((d) => d.original)
            },
            null,
            2
          )}
        </SyntaxHighlight> */}
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};
