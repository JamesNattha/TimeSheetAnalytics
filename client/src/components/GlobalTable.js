import PropTypes from 'prop-types';
import React, { useState, useMemo, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  OutlinedInput,
  Box
} from '@mui/material';

import IconButton from 'components/@extended/IconButton';

//Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faSearch } from '@fortawesome/free-solid-svg-icons';

// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { HeaderSort, TablePagination, SortingSelect, TableRowSelection } from 'components/third-party/ReactTable';

// assets
import { DownOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({
  columns,
  data,
  getHeaderProps,
  renderRowSubComponent,
  handleAdd,
  nameCreateButton,
  sortColumn,
  isExpand,
  expandPage,
  permission
}) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);

  const sortBy = { id: sortColumn, desc: false };

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
        sortBy: [sortBy]
      }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  // const { globalFilter } = state;
  const [filters, setFilters] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const count = preGlobalFilteredRows.length;
  const clearSearchInput = () => {
    setGlobalFilter('');
    setSearchInput('');
  };

  const CellExpander = ({ row }) => {
    const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;
    return (
      <Tooltip title="Tooltip Content">
        <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
          {collapseIcon}
        </Box>
      </Tooltip>
    );
  };

  CellExpander.propTypes = {
    row: PropTypes.object
  };

  //------------------------------ SET SELECT VALUE OF SELECT BAR ---------------------------------------------------------

  const [selectedValue, setSelectedValue] = useState(1); // Set the default value to 1

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    if (event.target.value === 1) {
      setSortBy([{ id: sortColumn, desc: false }]); // Sort by 'fatherName' column in ascending order
    } else {
      // Set sorting criteria for other cases if needed
      // For example, you can set it to descending order for other values
      setSortBy([{ id: sortColumn, desc: true }]); // Sort by 'fatherName' column in descending order
    }
  };

  return (
    <>
      <div>
        <TableRowSelection selected={Object.keys(selectedRowIds).length} />
        <Stack spacing={2}>
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
                placeholder={`Type something (${count} Records)`}
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
                    value={selectedValue}
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Sort by the oldest</MenuItem>
                    <MenuItem value={2}>Sort by the newest</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ display: 'flex', padding: '5px 7px 5px 7px', alignItems: 'center' }}>
                <Button
                  onClick={handleAdd}
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
                  + {nameCreateButton}
                </Button>
              </div>
            </div>
          </Paper>
          {isExpand ? (
            <Paper
              variant="outlined"
              sx={{
                py: 1,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid #ccc',
                borderRadius: '10px',
                pt: '14px'
              }}
            >
              {expandPage}
            </Paper>
          ) : null}
          {/* Table------------------------------------------------------------------------------------------------- */}
          <div style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            <Table {...getTableProps()}>
              <TableHead style={{ backgroundColor: '#E0E0E0' }}>
                {headerGroups.map((headerGroup, i) => (
                  <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
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
                        {row.cells.map((cell, index) => (
                          <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                            <Tooltip title={index === 0 || index === row.cells.length - 1 ? null : cell.render('Cell')} arrow>
                              <span>
                                {cell.column.truncate && cell.value.length > cell.column.truncate
                                  ? `${cell.value.slice(0, cell.column.truncate)}...`
                                  : cell.render('Cell')}
                              </span>
                            </Tooltip>
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.isExpanded && (
                        <TableCell colSpan={9} sx={{ height: '100%', width: '100%' }}>
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
