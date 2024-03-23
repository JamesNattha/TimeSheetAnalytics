import PropTypes from 'prop-types';
import React, { useEffect, useMemo, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { useMediaQuery, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';

// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

// assets
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { filteredPosition } from '../recoil';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent, handleAdd, namepage, sortColumn }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: sortColumn, desc: false };
  const location = useLocation();
  const { id } = location.state || {};

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    getToggleAllPageRowsSelectedProps,
    rows,
    // @ts-ignore
    page,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { globalFilter, selectedRowIds, pageIndex },
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,

    // @ts-ignore
    setSortBy
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      filterTypes,
      // @ts-ignore
      initialState: {
        pageIndex: 0,
        pageSize: 200,
        hiddenColumns: columns.filter((column) => column.hidden).map((column) => column.accessor),
        sortBy: [sortBy]
      },
      useGlobalFilter
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );
  const [filter, setFilter] = useRecoilState(filteredPosition);

  console.log('filter', filter);

  const filtered = () => {
    setGlobalFilter(filter);
  };

  useEffect(() => {
    if (filter) {
      filtered();
    } else {
      setGlobalFilter('');
    }
  }, [filter]);

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack sx={{ width: '1' }}>
        <div style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff', maxHeight: '500px', overflowY: 'auto' }}>
          <Table {...getTableProps()}>
            <TableHead style={{ backgroundColor: '#E0E0E0', position: 'sticky', top: '0', zIndex: '1' }}>
              {headerGroups.map((headerGroup, i) => (
                <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '60px' } }}>
                  {headerGroup.headers.map((column, index) => (
                    <TableCell
                      key={index}
                      {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                      sx={{
                        width: column.width || 'auto',
                        ':not(:last-of-type)::after': {
                          position: 'inherit '
                        }
                      }}
                    >
                      <HeaderSort column={column} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                const rowProps = row.getRowProps();

                return (
                  <Fragment key={i}>
                    <TableRow
                      {...row.getRowProps()}
                      onClick={() => {
                        row.toggleRowSelected();
                      }}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit'
                      }}
                    >
                      {/* {console.log(
                        'มองทำไร , row',
                        row.cells.filter((item) => item.render('Cell'))
                      )} */}
                      {row.cells.map((cell, index) => (
                        <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                          <Tooltip title={index === 0 || index === row.cells.length - 1 ? null : cell.render('Cell')} arrow>
                            <span>{cell.render('Cell')}</span>
                          </Tooltip>
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  handleAdd: PropTypes.func,
  renderRowSubComponent: PropTypes.any
};

export default ReactTable;
