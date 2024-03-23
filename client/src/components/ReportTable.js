import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Paper,
  OutlinedInput,
  Button,
  MenuItem,
  FormControl,
  Select,
  TextField,
  InputLabel
} from '@mui/material';

import IconButton from 'components/@extended/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faSearch } from '@fortawesome/free-solid-svg-icons';

// third-party

import { LocalizationProvider, DatePicker, DesktopDatePicker } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import update from 'immutability-helper';

import {
  useColumnOrder,
  useExpanded,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';

// project import

import SyntaxHighlight from 'utils/SyntaxHighlight';
import { DraggableHeader, HeaderSort, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import { renderFilterTypes, DefaultColumnFilter } from 'utils/react-table';

// assets
import { DownOutlined, GroupOutlined, RightOutlined, UngroupOutlined, SearchOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'status', value: '' }],
      hiddenColumns: ['id', 'role', 'contact', 'country', 'fatherName'],
      columnOrder: ['selection', 'avatar', 'firstName', 'lastName', 'email', 'age', 'visits', 'status', 'progress'],
      pageIndex: 0,
      pageSize: 10
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    // @ts-ignore
    page,
    prepareRow,
    // @ts-ignore
    setColumnOrder,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    // @ts-ignore
    state: { globalFilter, hiddenColumns, pageIndex, pageSize, columnOrder, selectedRowIds },
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,
    // @ts-ignore
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      defaultColumn,
      // @ts-ignore
      initialState,
      filterTypes
    },
    useGlobalFilter,
    useFilters,
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  // const { globalFilter } = state;
  const [filters, setFilters] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState([null, null]);
  const [valueStart,setValueStart] = useState(new Date());
  const [valueEnd,setValueEnd] = useState(new Date());
  const clearSearchInput = () => {
    setGlobalFilter('');
    setSearchInput('');
  };

  const reorder = (item, newIndex) => {
    const { index: currentIndex } = item;

    const dragRecord = columnOrder[currentIndex];
    setColumnOrder(
      update(columnOrder, {
        $splice: [
          [currentIndex, 1],
          [newIndex, 0, dragRecord]
        ]
      })
    );
  };

  useEffect(() => {
    // @ts-ignore
    const newColumnOrder = visibleColumns.map((column) => column.id);
    setColumnOrder(newColumnOrder);

    // eslint-disable-next-line
  }, [hiddenColumns]);

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={2}>
        {/* <HidingSelect hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} allColumns={allColumns} /> */}

        <Paper
          variant="outlined"
          sx={{
            py: 1,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
            borderRadius: '10px'
          }}
        >
          <div style={{ display: 'flex', padding: '5px 10px 5px 10px', alignItems: 'center' }}>
            <OutlinedInput
              id="start-adornment-email"
              // placeholder={`Type something (${count} Records)`}
              startAdornment={<SearchOutlined />}
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              sx={{
                borderRadius: 20,
                backgroundColor: '#F3F4F6'
              }}
            />
            <Button
              variant="contained"
              sx={{
                width: '150px',
                margin: '5px',
                borderRadius: '40px',
                height: '37px',
                backgroundColor: '#232323',
                '&::after': {
                  boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.9)',
                  borderRadius: '40px'
                },
                '&:hover': {
                  backgroundColor: '#686868 !important'
                }
              }}
              onClick={() => {
                setGlobalFilter(searchInput); // Apply the global filter with the search input value
              }}
            >
              <FontAwesomeIcon icon={faSearch} style={{ fontSize: '15px' }} />
              Search
            </Button>
            <IconButton
              shape="rounded"
              variant="contained"
              style={{ margin: '5px', backgroundColor: '#232323' }}
              onClick={clearSearchInput}
              sx={{
                '&:hover': {
                  backgroundColor: '#686868 !important'
                }
              }}
            >
              <FontAwesomeIcon icon={faRepeat} />
            </IconButton>
          </div>
        </Paper>
        <Paper
          variant="outlined"
          sx={{
            py: 1,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
            borderRadius: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div style={{ marginRight: '5px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  value={valueStart}
                  onChange={(date) => setValueStart(date)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      // placeholder="Start Date"
                      // {...getFieldProps('start_date')}
                      // error={Boolean(touched.start_date && errors.start_date)}
                      // helperText={touched.start_date && errors.start_date}
                      // onChange={(e) => {
                      //   const enteredDate = e.target.value;
                      //   // Check if the entered date matches the desired format 'DD-MM-YYYY'
                      //   if (/^\d{2}-\d{2}-\d{4}$/.test(enteredDate)) {
                      //     formik.setFieldValue('start_date', enteredDate);
                      //   } else {
                      //     // Handle invalid date format here if needed
                      //   }
                      // }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          ...params.InputProps.sx,
                          borderRadius: '30px'
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div style={{ marginRight: '5px' }}>
              <InputLabel>To</InputLabel>
            </div>
            <div style={{ marginRight: '5px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  value={valueEnd}
                  onChange={(date) => setValueEnd(date)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      // placeholder="Start Date"
                      // {...getFieldProps('start_date')}
                      // error={Boolean(touched.start_date && errors.start_date)}
                      // helperText={touched.start_date && errors.start_date}
                      // onChange={(e) => {
                      //   const enteredDate = e.target.value;
                      //   // Check if the entered date matches the desired format 'DD-MM-YYYY'
                      //   if (/^\d{2}-\d{2}-\d{4}$/.test(enteredDate)) {
                      //     formik.setFieldValue('start_date', enteredDate);
                      //   } else {
                      //     // Handle invalid date format here if needed
                      //   }
                      // }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          ...params.InputProps.sx,
                          borderRadius: '30px'
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div style={{ marginRight: '5px' }}>
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    borderRadius: '40px',
                    width: '300px',
                    backgroundColor: '#F3F4F6',
                    padding: '0 0 0 10px',
                    '&:hover': {
                      borderColor: '#686868 !important',
                      color: '#686868'
                    }
                  }}
                  // value={selectedValue}
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Sort by the oldest</MenuItem>
                  <MenuItem value={2}>Sort by the newest</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ display: 'flex', padding: '5px 7px 5px 7px', alignItems: 'center' }}>
              <Button
                //   onClick={handleAdd}
                variant="outlined"
                sx={{
                  width: '150px',
                  marginRight: '10px',
                  height: 'auto',
                  borderRadius: '40px',
                  borderColor: '#232323',
                  color: '#232323',
                  '&:hover': {
                    borderColor: '#686868 !important',
                    color: '#686868'
                  }
                }}
              >
                + Export
              </Button>
            </div>
          </div>
        </Paper>

        <Box sx={{ width: '100%', overflowX: 'auto', display: 'block', bgcolor: '#ffffff' }}>
          <Table {...getTableProps()}>
            <TableHead sx={{ borderTopWidth: 2 }}>
              {headerGroups.map((headerGroup, i) => (
                <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => {
                    const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
                    return (
                      <TableCell key={`umbrella-header-cell-${index}`} {...column.getHeaderProps([{ className: column.className }])}>
                        <DraggableHeader reorder={reorder} key={column.id} column={column} index={index}>
                          <Stack direction="row" spacing={1.15} alignItems="center" sx={{ display: 'inline-flex' }}>
                            {column.canGroupBy ? (
                              <Box
                                sx={{
                                  color: column.isGrouped ? 'error.main' : 'primary.main',
                                  fontSize: '1rem'
                                }}
                                {...column.getGroupByToggleProps()}
                              >
                                {groupIcon}
                              </Box>
                            ) : null}
                            <HeaderSort column={column} sort />
                          </Stack>
                        </DraggableHeader>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            {/* striped table -> add class 'striped' */}
            <TableBody {...getTableBodyProps()} className="striped">
              {headerGroups.map((group, i) => (
                <TableRow key={i} {...group.getHeaderGroupProps()}>
                  {group.headers.map((column, index) => (
                    <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                      {column.canFilter ? column.render('Filter') : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
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
                    {row.cells.map((cell, i) => {
                      let bgcolor = 'inherit';
                      if (cell.isGrouped) bgcolor = 'success.lighter';
                      if (cell.isAggregated) bgcolor = 'warning.lighter';
                      if (cell.isPlaceholder) bgcolor = 'error.lighter';
                      if (cell.isPlaceholder) bgcolor = 'error.lighter';
                      if (row.isSelected) bgcolor = alpha(theme.palette.primary.lighter, 0.35);

                      const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

                      return (
                        <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])} sx={{ bgcolor }}>
                          {/* eslint-disable-next-line */}
                          {cell.isGrouped ? (
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
                              <Box
                                sx={{ pr: 1.25, fontSize: '0.75rem', color: 'text.secondary' }}
                                onClick={(e) => {
                                  row.toggleRowExpanded();
                                  e.stopPropagation();
                                }}
                              >
                                {collapseIcon}
                              </Box>
                              {cell.render('Cell')} ({row.subRows.length})
                            </Stack>
                          ) : // eslint-disable-next-line
                          cell.isAggregated ? (
                            cell.render('Aggregated')
                          ) : cell.isPlaceholder ? null : (
                            cell.render('Cell')
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>

            {/* footer table */}
            <TableFooter sx={{ borderBottomWidth: 2 }}>
              {footerGroups.map((group, i) => (
                <TableRow key={i} {...group.getFooterGroupProps()}>
                  {group.headers.map((column, index) => (
                    <TableCell key={index} {...column.getFooterProps([{ className: column.className }])}>
                      {column.render('Footer')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </Box>
        <Box sx={{ p: 2, py: 0 }}>
          <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
        </Box>

        <SyntaxHighlight>
          {JSON.stringify(
            {
              selectedRowIndices: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map((d) => d.original)
            },
            null,
            2
          )}
        </SyntaxHighlight>
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

export default ReactTable;
