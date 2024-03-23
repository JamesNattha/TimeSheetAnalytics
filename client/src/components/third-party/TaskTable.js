import PropTypes from 'prop-types';
import React, { useState, useMemo, Fragment } from 'react';

// Import Material-UI components and styles
import { alpha, useTheme, styled } from '@mui/material/styles';
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
  Box,
  Grid,
  TableContainer
} from '@mui/material';

// Import custom components and icons
import IconButton from 'components/@extended/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faSearch } from '@fortawesome/free-solid-svg-icons';
import { DownOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';

// Import third-party React Table hooks and components
import { useTable, useGlobalFilter, useFilters, useSortBy, useExpanded, usePagination, useRowSelect, selectedFlatRows } from 'react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { TablePagination, TableRowSelection, IndeterminateCheckbox } from 'components/third-party/ReactTable';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectTab } from './recoil';
// Import the SearchBar component
// import SearchBar from './SearchBar';

import Send from 'pages/apps/Taskplanning/column/Send_white';
import Complete from 'pages/apps/Taskplanning/column/Complete_white';
import { useNavigate } from 'react-router';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({
  columns,
  data,
  renderRowSubComponent,
  handleAdd,
  nameCreateButton,
  countData,
  sortColumn,
  fixColumnR,
  fixColumnR2,
  fixColumnR3,
  fixColumnL,
  fixColumnL2,
  handleUpdate,
  fetchWorkTable
}) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);

  const sortBy = { id: sortColumn, desc: false };

  // React Table configuration using hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
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
    state: { selectedRowIds, pageIndex, pageSize },
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,
    // @ts-ignore
    selectedFlatRows,
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

  // Function to expand/collapse rows
  const CellExpander = ({ row }) => {
    const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;
    return (
      <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
        {collapseIcon}
      </Box>
    );
  };

  CellExpander.propTypes = {
    row: PropTypes.object
  };

  // Set values to set data for select
  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedCount, setSelectedCount] = useState(0);
  const count = preGlobalFilteredRows.length;

  // Function Search bar
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const clearSearchInput = () => {
    setSearchInput('');
    setGlobalFilter('');
  };

  // Function to handle select value change
  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    if (event.target.value === 1) {
      setSortBy([{ id: sortColumn, desc: false }]);
    } else {
      setSortBy([{ id: sortColumn, desc: true }]);
    }
  };

  // Function Tab

  const [activeTab, setActiveTab] = useState('all');
  const [newDataActive, setNewDataActive] = useRecoilState(selectTab);
  const [clickedItem, setClickedItem] = useState(activeTab);

  useEffect(() => {
    setNewDataActive(activeTab);
  }, [activeTab]);

  const Item = styled(Paper)(({ theme, isclicked }) => ({
    backgroundColor: isclicked ? '#000000' : theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: isclicked ? '#ffffff' : theme.palette.text.secondary,
    '& svg path': {
      fill: isclicked ? '#ffffff' : '#333436'
    },
    height: 100,
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: isclicked ? '#000000' : '#000000', // Change background color on hover
      '& svg path': {
        fill: isclicked ? '#ffffff' : '#ffffff' // Change SVG fill color on hover
      },
      '& p': {
        color: isclicked ? '#ffffff' : '#ffffff' // Change text color on hover
      }
    }
  }));

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const onItemClick = (tab) => {
    setClickedItem(tab);
  };

  const selectedRowCount = selectedFlatRows.length;
  // console.log('selectedRowCount',selectedRowCount)

  const sendDataToTable = (rowData) => {
    // Implement your logic to send data to the ReactTable here
    console.log('Sending data:', rowData);
    // You can use this data in the ReactTable as needed
  };

  const handleCompleteClick = () => {
    // Access the data of selected rows
    const selectedData = selectedFlatRows.map((row) => row.original);

    // Now you can pass the selected data to the Complete function
    console.log('HA HA HA DATA INSIDE', selectedData);
    handleUpdate(selectedData, fetchWorkTable);
  };

  const FnTimeSheet = () => {
    const selectedData = selectedFlatRows.map((row) => row.original);
    navigate('/timesheet', { state: { data: selectedData } });
    window.location.reload();
  };

  return (
    <>
      <div>
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

          {/* Test Tab */}
          <TableContainer>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ marginBottom: '5px' }}>
                <Grid item xs={4}>
                  <Item
                    onClick={() => {
                      handleTabClick('all');
                      onItemClick('all');
                    }}
                    style={{ cursor: 'pointer' }}
                    isclicked={clickedItem === 'all' ? 1 : 0}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', justifyItems: 'center' }}>
                      <div style={{ marginLeft: '10px' }}>
                        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.0507812 1.56641C0.0507812 1.01412 0.498497 0.566406 1.05078 0.566406H15.0508C15.6031 0.566406 16.0508 1.01412 16.0508 1.56641V15.5664C16.0508 16.1187 15.6031 16.5664 15.0508 16.5664H1.05078C0.498497 16.5664 0.0507812 16.1187 0.0507812 15.5664V1.56641ZM21.0508 0.566406C20.4985 0.566406 20.0508 1.01412 20.0508 1.56641V15.5664C20.0508 16.1187 20.4985 16.5664 21.0508 16.5664H35.0508C35.6031 16.5664 36.0508 16.1187 36.0508 15.5664V1.56641C36.0508 1.01412 35.6031 0.566406 35.0508 0.566406H21.0508ZM21.0508 20.501C20.4985 20.501 20.0508 20.9487 20.0508 21.501V35.501C20.0508 36.0533 20.4985 36.501 21.0508 36.501H35.0508C35.6031 36.501 36.0508 36.0533 36.0508 35.501V21.501C36.0508 20.9487 35.6031 20.501 35.0508 20.501H21.0508ZM1.05078 20.501C0.498497 20.501 0.0507812 20.9487 0.0507812 21.501V35.501C0.0507812 36.0533 0.498497 36.501 1.05078 36.501H15.0508C15.6031 36.501 16.0508 36.0533 16.0508 35.501V21.501C16.0508 20.9487 15.6031 20.501 15.0508 20.501H1.05078Z"
                            fill="#333436"
                          />
                        </svg>
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        <p style={{ fontSize: '16px' }}>
                          All
                          <br />
                          {countData.all}
                        </p>
                      </div>
                    </div>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item
                    onClick={() => {
                      handleTabClick('assigned');
                      onItemClick('assigned');
                    }}
                    style={{ cursor: 'pointer' }}
                    isclicked={clickedItem === 'assigned' ? 1 : 0}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ marginLeft: '10px' }}>
                        <svg width="36" height="41" viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.2094 9.29668V26.0271C30.0340 25.7684 29.8317 25.5224 29.6025 25.2931C27.6502 23.3402 24.4844 23.3397 22.5314 25.2921L17.7346 30.0875C15.7814 32.04 15.7812 35.2062 17.7340 37.1591L20.9954 40.4204H4.06541C2.00269 40.4204 0.330566 38.7483 0.330566 36.6856V9.29668C0.330566 7.23395 2.00269 5.56183 4.06541 5.56183H10.2902C10.2902 2.81594 12.5241 0.582031 15.2700 0.582031C18.0159 0.582031 20.2498 2.81594 20.2498 5.56183H26.4745C28.5372 5.56183 30.2094 7.23395 30.2094 9.29668ZM27.4804 30.2426L26.0980 31.6245H30.2094H33.1040C34.2086 31.6245 35.1040 32.5199 35.1040 33.6245C35.1040 34.7291 34.2086 35.6245 33.1040 35.6245H30.2094H26.0990L27.4806 37.0062C27.9231 37.4487 28.1150 38.0470 28.0561 38.6245C28.0110 39.0664 27.8192 39.4961 27.4806 39.8346C27.0906 40.2247 26.5796 40.4199 26.0684 40.4204C26.0671 40.4204 26.0658 40.4204 26.0645 40.4204C25.5533 40.4199 25.0422 40.2247 24.6522 39.8346L19.8553 35.0377C19.7289 34.9113 19.6230 34.7722 19.5375 34.6245C19.4487 34.4711 19.3820 34.3085 19.3374 34.1412C19.2469 33.8023 19.2470 33.4444 19.3374 33.1056C19.3819 32.9391 19.4482 32.7772 19.5364 32.6245C19.6221 32.4760 19.7285 32.3361 19.8556 32.2091L24.6524 27.4137C24.7501 27.3161 24.8553 27.2307 24.9662 27.1575C25.7426 26.6450 26.7975 26.7306 27.4809 27.4141C27.8194 27.7528 28.0111 28.1826 28.0561 28.6245C28.1149 29.2020 27.9230 29.8002 27.4804 30.2426ZM15.2700 3.6944C14.2386 3.6944 13.4025 4.5305 13.4025 5.5618C13.4025 6.5932 14.2386 7.4293 15.2700 7.4293C16.3013 7.4293 17.1374 6.5932 17.1374 5.5618C17.1374 4.5305 16.3013 3.6944 15.2700 3.6944ZM22.7397 12.5647V11.0085C22.7397 10.8847 22.6905 10.7659 22.6029 10.6784C22.5154 10.5908 22.3966 10.5416 22.2728 10.5416H8.26712C8.14330 10.5416 8.02455 10.5908 7.93700 10.6784C7.84945 10.7659 7.80026 10.8847 7.80026 11.0085V12.5647C7.80026 12.6885 7.84945 12.8072 7.93700 12.8948C8.02455 12.9823 8.14330 13.0315 8.26712 13.0315H22.2728C22.39660 13.0315 22.51540 12.9823 22.60290 12.8948C22.69050 12.8072 22.73970 12.6885 22.7397 12.5647Z"
                            fill="#333436"
                          />
                        </svg>
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        <p style={{ fontSize: '16px' }}>
                          Assigned <br />
                          {countData.assign}
                        </p>
                      </div>
                    </div>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item
                    onClick={() => {
                      handleTabClick('inprogress');
                      onItemClick('inprogress');
                    }}
                    style={{ cursor: 'pointer' }}
                    isclicked={clickedItem === 'inprogress' ? 1 : 0}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ marginLeft: '10px' }}>
                        <svg width="36" height="41" viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.2094 9.29668V26.0271C30.0340 25.7684 29.8317 25.5224 29.6025 25.2931C27.6502 23.3402 24.4844 23.3397 22.5314 25.2921L17.7346 30.0875C15.7814 32.04 15.7812 35.2062 17.7340 37.1591L20.9954 40.4204H4.06541C2.00269 40.4204 0.330566 38.7483 0.330566 36.6856V9.29668C0.330566 7.23395 2.00269 5.56183 4.06541 5.56183H10.2902C10.2902 2.81594 12.5241 0.582031 15.2700 0.582031C18.0159 0.582031 20.2498 2.81594 20.2498 5.56183H26.4745C28.5372 5.56183 30.2094 7.23395 30.2094 9.29668ZM27.4804 30.2426L26.0980 31.6245H30.2094H33.1040C34.2086 31.6245 35.1040 32.5199 35.1040 33.6245C35.1040 34.7291 34.2086 35.6245 33.1040 35.6245H30.2094H26.0990L27.4806 37.0062C27.9231 37.4487 28.1150 38.0470 28.0561 38.6245C28.0110 39.0664 27.8192 39.4961 27.4806 39.8346C27.0906 40.2247 26.5796 40.4199 26.0684 40.4204C26.0671 40.4204 26.0658 40.4204 26.0645 40.4204C25.5533 40.4199 25.0422 40.2247 24.6522 39.8346L19.8553 35.0377C19.7289 34.9113 19.6230 34.7722 19.5375 34.6245C19.4487 34.4711 19.3820 34.3085 19.3374 34.1412C19.2469 33.8023 19.2470 33.4444 19.3374 33.1056C19.3819 32.9391 19.4482 32.7772 19.5364 32.6245C19.6221 32.4760 19.7285 32.3361 19.8556 32.2091L24.6524 27.4137C24.7501 27.3161 24.8553 27.2307 24.9662 27.1575C25.7426 26.6450 26.7975 26.7306 27.4809 27.4141C27.8194 27.7528 28.0111 28.1826 28.0561 28.6245C28.1149 29.2020 27.9230 29.8002 27.4804 30.2426ZM15.2700 3.6944C14.2386 3.6944 13.4025 4.5305 13.4025 5.5618C13.4025 6.5932 14.2386 7.4293 15.2700 7.4293C16.3013 7.4293 17.1374 6.5932 17.1374 5.5618C17.1374 4.5305 16.3013 3.6944 15.2700 3.6944ZM22.7397 12.5647V11.0085C22.7397 10.8847 22.6905 10.7659 22.6029 10.6784C22.5154 10.5908 22.3966 10.5416 22.2728 10.5416H8.26712C8.14330 10.5416 8.02455 10.5908 7.93700 10.6784C7.84945 10.7659 7.80026 10.8847 7.80026 11.0085V12.5647C7.80026 12.6885 7.84945 12.8072 7.93700 12.8948C8.02455 12.9823 8.14330 13.0315 8.26712 13.0315H22.2728C22.39660 13.0315 22.51540 12.9823 22.60290 12.8948C22.69050 12.8072 22.73970 12.6885 22.7397 12.5647Z"
                            fill="#333436"
                          />
                        </svg>
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        <p style={{ fontSize: '16px' }}>
                          Inprogress <br />
                          {countData.inprogress}
                        </p>
                      </div>
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </TableContainer>
          {/* Create zone */}
          <Paper
            variant="outlined"
            sx={{
              py: 1,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ccc',
              borderRadius: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '7px' }}>
              <div style={{ display: 'flex' }}>
                {/* Render select all checkbox and selected items count */}
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                {/* {console.log('IndeterminateCheckbox', getToggleAllPageRowsSelectedProps())} */}
                <p>
                  {selectedRowCount} items from {count} items
                </p>
                {selectedRowCount > 0 ? (
                  <>
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
                        },
                        '& svg': {
                          marginRight: '8px',
                          fill: '#ffffff'
                        }
                      }}
                      onClick={FnTimeSheet}
                    >
                      <Send />
                      <p>Send</p>
                    </Button>
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
                        },
                        '& svg': {
                          marginRight: '8px'
                        }
                      }}
                      onClick={handleCompleteClick}
                    >
                      <Complete />
                      <p>Complete</p>
                    </Button>
                  </>
                ) : null}
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '5px', marginTop: '2px' }}>
                  {/* Select to choose sorting */}
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
                  {/* Button to add a new item */}
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
            </div>
          </Paper>
          {/* Table */}
          <div>
            <div style={{ borderRadius: '10px 10px 0 0', overflowX: 'auto', backgroundColor: '#ffffff' }}>
              <Table {...getTableProps()}>
                <TableHead style={{ backgroundColor: '#E0E0E0' }}>
                  {headerGroups.map((headerGroup, i) => (
                    <TableRow key={i} {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#E0E0E0' }}>
                      {headerGroup.headers.map((column, index) => (
                        <TableCell
                          key={index}
                          {...column.getHeaderProps([{ style: column.style }])}
                          style={{
                            width: column.width || 'auto',
                            position:
                              column.id === fixColumnR ||
                              column.id === fixColumnR2 ||
                              column.id === fixColumnR3 ||
                              column.id === fixColumnL2 ||
                              column.id === fixColumnL
                                ? 'sticky'
                                : 'inherit',
                            right:
                              column.id === fixColumnR
                                ? 0
                                : column.id === fixColumnR2
                                ? '144px'
                                : column.id === fixColumnR3
                                ? '244px'
                                : 'auto',
                            left: column.id === fixColumnL2 ? 0 : column.id === fixColumnL ? '58px' : 'auto',
                            zIndex:
                              column.id === fixColumnR || column.id === fixColumnR2 || column.id === fixColumnL2 || column.id === fixColumnL
                                ? 1
                                : 'auto',
                            textAlign: column.id === fixColumnR ? 'center' : 'left',
                            backgroundColor: column.id === fixColumnR || column.id === fixColumnL2 ? '#E0E0E0' : 'inherit',
                            minWidth:
                              column.id === fixColumnR
                                ? '144px'
                                : column.id === fixColumnR2
                                ? '100px'
                                : column.id === fixColumnR3
                                ? '50px'
                                : column.id === fixColumnL
                                ? '40px'
                                : column.id === fixColumnL2
                                ? '58px'
                                : '150px',
                            ...column.style
                          }}
                        >
                          {column.render('Header')}
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
                          sx={{
                            cursor: 'pointer',
                            bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit'
                          }}
                          onClick={() => sendDataToTable(row.original)}
                        >
                          {row.cells.map((cell, index) => (
                            <TableCell
                              key={index}
                              {...cell.getCellProps([{ className: cell.column.className }])}
                              sx={{
                                position:
                                  cell.column.id === fixColumnR ||
                                  cell.column.id === fixColumnR2 ||
                                  cell.column.id === fixColumnR3 ||
                                  cell.column.id === fixColumnL2 ||
                                  cell.column.id === fixColumnL
                                    ? 'sticky'
                                    : 'inherit',
                                right:
                                  cell.column.id === fixColumnR
                                    ? 0
                                    : cell.column.id === fixColumnR2
                                    ? '144px'
                                    : cell.column.id === fixColumnR3
                                    ? '244px'
                                    : 'auto',
                                left: cell.column.id === fixColumnL2 ? 0 : cell.column.id === fixColumnL ? '58px' : 'auto',
                                zIndex:
                                  cell.column.id === fixColumnR ||
                                  cell.column.id === fixColumnR2 ||
                                  cell.column.id === fixColumnR3 ||
                                  cell.column.id === fixColumnL2 ||
                                  cell.column.id === fixColumnL
                                    ? 1
                                    : 'auto',
                                bgcolor:
                                  cell.column.id === fixColumnR ||
                                  cell.column.id === fixColumnR2 ||
                                  cell.column.id === fixColumnR3 ||
                                  fixColumnL ||
                                  fixColumnL2
                                    ? '#ffffff'
                                    : 'none'
                              }}
                              // Conditionally apply onClick to fixColumnL2 cell
                              onClick={() => {
                                if (cell.column.id === fixColumnL2) {
                                  row.toggleRowSelected();
                                }
                              }}
                            >
                              <Tooltip title={index === 0 || index === row.cells.length - 1 ? null : cell.render('Cell')} arrow>
                                <span>
                                  {cell.column.truncate && cell.value && cell.value.length > cell.column.truncate
                                    ? `${cell.value.slice(0, cell.column.truncate)}...`
                                    : cell.render('Cell')}
                                </span>
                              </Tooltip>
                            </TableCell>
                          ))}
                        </TableRow>

                        {row.isExpanded && (
                          <TableCell colSpan={columns.length} sx={{ height: '100%', width: '100%' }}>
                            {renderRowSubComponent({ row, rowProps, visibleColumns })}
                          </TableCell>
                        )}
                      </Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '0 0 10px 10px', padding: '15px' }}>
              {/* Pagination */}
              <TablePagination
                gotoPage={gotoPage}
                rows={rows}
                setPageSize={setPageSize}
                pageSize={pageSize}
                pageIndex={pageIndex}
                // Add these styles to match the table size
                sx={{
                  height: 'auto', // Adjust the height as needed
                  borderRadius: 0, // Remove border-radius if not needed
                  borderTop: 'none' // Remove top border if not needed
                }}
              />
            </div>
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
