import PropTypes from 'prop-types';
import React, { useEffect, useMemo, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Typography,
  Grid,
  TableContainer,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Tooltip
} from '@mui/material';

import IconButton from 'components/@extended/IconButton';

//Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows } from '@fortawesome/free-brands-svg-icons'; // Import the specific icon
import { faFileImport, faClock, faCircleCheck, faRepeat, faSearch } from '@fortawesome/free-solid-svg-icons';

import { styled } from '@mui/material/styles';

// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

// assets
import { PlusOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import { IndeterminateCheckbox } from 'components/third-party/ReactTable';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent, handleAdd, namepage }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'fatherName', desc: false };
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
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
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
        pageSize: 10,
        hiddenColumns: columns.filter((column) => column.hidden).map((column) => column.accessor),
        sortBy: [{ id: 'code', desc: false }, sortBy]
      }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <>
      <div>
        <TableRowSelection selected={Object.keys(selectedRowIds).length} />
        <Stack spacing={3}>
          <Paper
            variant="outlined"
            sx={{
              mt: 2,
              py: 1.2,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ccc',
              borderRadius: '10px'
            }}
          >
            <div style={{ display: 'flex', padding: '5px 10px 5px 10px', alignItems: 'center' }}>
              {/* <TextField
                fullWidth
                placeholder="&#xf002; Type something"
                InputProps={{
                  sx: { borderRadius: 20, backgroundColor: '#F3F4F6' },
                  endAdornment: <FontAwesomeIcon icon={faRepeat} />
                }}
              /> */}
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                size="small"
                fullWidth
                sx={{ borderRadius: 20, backgroundColor: '#F3F4F6', margin: '5px' }}
              />
              <IconButton shape="rounded" variant="contained" style={{ margin: '5px' }}>
                <FontAwesomeIcon icon={faRepeat} />
              </IconButton>
              <Button variant="contained" style={{ width: '150px', margin: '5px', borderRadius: '40px', height: '37px' }}>
                <FontAwesomeIcon icon={faSearch} style={{ fontSize: '15px' }} />
                Search
              </Button>
            </div>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              mt: 2,
              py: 1.2,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ccc',
              borderRadius: '10px',
              marginBottom: '5px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', padding: '5px 7px 5px 7px', alignItems: 'center' }}>
                {/* <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} /> */}
                {/* <p> หน้า 1/1-10 จาก 20 รายการ </p> */}
                <Button
                  variant="outlined"
                  onClick={handleAdd}
                  style={{ width: '150px', margin: '5px', marginLeft: '20px', height: 'auto', borderRadius: '40px' }}
                >
                  + Add {namepage}
                </Button>
              </div>
              <div style={{ marginRight: '20px' }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    placeholder="เรียงตามข้อมูลที่เก่าที่สุด"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ borderRadius: '40px', width: '300px', backgroundColor: '#F3F4F6' }}
                  >
                    <MenuItem value="" sx={{ color: 'text.secondary' }}>
                      Select Age
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </Paper>

          {/* <div style={{ padding: '0 0 10px 5px', marginBottom: '20px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Typography variant="h4">All</Typography>
              </div> */}
          <div style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            <Table {...getTableProps()}>
              <TableHead style={{ backgroundColor: '#E6F0FF' }}>
                {headerGroups.map((headerGroup, i) => (
                  <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                    {headerGroup.headers.map((column, index) => (
                      <TableCell key={index} {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
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
                      {row.isExpanded && (
                        <TableCell colSpan={9} sx={{ height: '100%' }}>
                          {renderRowSubComponent({ row, rowProps, visibleColumns })}
                        </TableCell>
                      )}
                    </Fragment>
                  );
                })}
                <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                  <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                    <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Stack>
      </div>
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
