import PropTypes from "prop-types";
import React, {useState, useMemo, Fragment} from "react";

// material-ui
import {alpha, useTheme} from "@mui/material/styles";
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
  TextField,
  InputLabel
} from "@mui/material";

import IconButton from "components/@extended/IconButton";
import {LocalizationProvider, DatePicker, DesktopDatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {format} from "date-fns";

//Font Awesome Icon
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRepeat, faSearch} from "@fortawesome/free-solid-svg-icons";

// third-party
import {useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination} from "react-table";
import {renderFilterTypes, GlobalFilter} from "utils/react-table";
import {HeaderSort, TablePagination, SortingSelect, TableRowSelection} from "components/third-party/ReactTable";
import {DateRangeColumnFilter, dateBetweenFilterFn, Filter, DefaultColumnFilter} from "./third-party/Filtered";

// assets
import {DownOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {filteredPosition} from "../recoil";

// ==============================|| REACT TABLE ||============================== //

function ReactTable({
  columns,
  data,
  fetchData,
  getHeaderProps,
  renderRowSubComponent,
  handleAdd,
  nameCreateButton,
  valueStart,
  valueEnd,
  setValueStart,
  setValueEnd,
  sortColumn,
  isExpand,
  expandPage,
  handleDateRangeChange,
  permission
}) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);

  const sortBy = {id: sortColumn, desc: false};

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
    state: {globalFilter, selectedRowIds, pageIndex, pageSize},
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
      defaultColumn: {Filter: DefaultColumnFilter},
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
  const [searchInput, setSearchInput] = useState("");
  // const [valueStart, setValueStart] = useState(new Date());
  // const [valueEnd, setValueEnd] = useState(new Date());
  const count = preGlobalFilteredRows.length;
  const clearSearchInput = () => {
    setGlobalFilter("");
    setSearchInput("");
  };

  const CellExpander = ({row}) => {
    const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;
    return (
      <Tooltip title="Tooltip Content">
        <Box sx={{fontSize: "0.75rem", color: "text.secondary"}} {...row.getToggleRowExpandedProps()}>
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
      setSortBy([{id: sortColumn, desc: false}]); // Sort by 'fatherName' column in ascending order
    } else {
      setSortBy([{id: sortColumn, desc: true}]); // Sort by 'fatherName' column in descending order
    }
  };

  //------------------------------ SET SELECT VALUE OF SELECT PROJECT NAME BAR ---------------------------------------------------------
  const [selectedProjectValue, setSelectedProjectValue] = useState("all"); // Set the default value to 'all'
  const handleProjectChange = (event, selectedProjectName) => {
    console.log("event.target.value", selectedProjectName);
    setSelectedProjectValue(event.target.value);

    setGlobalFilter(selectedProjectName);
  };

  //------------------------------ SET SELECT VALUE OF SELECT POSITION NAME BAR ---------------------------------------------------------
  const [filter, setFilter] = useRecoilState(filteredPosition);
  const [selectedPositionValue, setSelectedPositionValue] = useState("all"); // Set the default value to 'all'
  const handlePositionChange = (event, selectedPositionName) => {
    console.log("event.target.value", selectedPositionName);
    setSelectedPositionValue(event.target.value);

    if (selectedPositionName) {
      setFilter(selectedPositionName);
    } else {
      setFilter(null);
    }

    // setGlobalFilter(selectedPositionName);
  };

  console.log("filter table", filter);

  //--------------------------------------------------------DATE RANGE PICKER------------------------------------------------//
  // const [valueStart, setValueStart] = useState(new Date());
  // const [valueEnd, setValueEnd] = useState(new Date());

  const handleApplyFilter = () => {
    handleDateRangeChange(valueStart, valueEnd); // Pass the dates as arguments
  };
  // };

  return (
    <>
      <div>
        <TableRowSelection selected={Object.keys(selectedRowIds).length} />
        <Stack spacing={2}>
          <Paper
            variant="outlined"
            sx={{
              py: 1,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ccc",
              borderRadius: "10px"
            }}
          >
            <div style={{display: "flex", padding: "5px 10px 5px 10px", alignItems: "center"}}>
              <OutlinedInput
                id="start-adornment-email"
                placeholder={`Type something (${count} Records)`}
                startAdornment={<SearchOutlined />}
                fullWidth
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                sx={{
                  borderRadius: 20,
                  backgroundColor: "#F3F4F6"
                }}
              />
              <Button
                variant="contained"
                sx={{
                  width: "150px",
                  margin: "5px",
                  borderRadius: "40px",
                  height: "37px",
                  backgroundColor: "#232323",
                  "&::after": {
                    boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.9)",
                    borderRadius: "40px"
                  },
                  "&:hover": {
                    backgroundColor: "#686868 !important"
                  }
                }}
                onClick={() => {
                  setGlobalFilter(searchInput); // Apply the global filter with the search input value
                }}
              >
                <FontAwesomeIcon icon={faSearch} style={{fontSize: "15px"}} />
                Search
              </Button>
              <IconButton
                shape="rounded"
                variant="contained"
                style={{margin: "5px", backgroundColor: "#232323"}}
                onClick={clearSearchInput}
                sx={{
                  "&:hover": {
                    backgroundColor: "#686868 !important"
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
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ccc",
              borderRadius: "10px"
            }}
          >
            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
              <div style={{marginLeft: "5px", padding: "5px 7px 5px 7px"}}>
                <FormControl sx={{minWidth: 60}}>
                  <Select
                    displayEmpty
                    inputProps={{"aria-label": "Without label"}}
                    sx={{
                      borderRadius: "40px",
                      width: "300px",
                      backgroundColor: "#F3F4F6",
                      padding: "0 0 0 10px",
                      "&:hover": {
                        borderColor: "#686868 !important",
                        color: "#686868"
                      }
                    }}
                    value={selectedProjectValue}
                    onChange={(event) => handleProjectChange(event, data[event.target.value]?.project_name)}
                  >
                    <MenuItem value={"all"}>Select All Project</MenuItem>
                    {data?.map((position, index) => (
                      <MenuItem key={index} value={index}>
                        {position.project_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{display: "flex", padding: "5px 7px 5px 7px", alignItems: "center"}}>
                <FormControl sx={{minWidth: 60}}>
                  <Select
                    displayEmpty
                    inputProps={{"aria-label": "Without label"}}
                    sx={{
                      borderRadius: "40px",
                      width: "300px",
                      backgroundColor: "#F3F4F6",
                      padding: "0 0 0 10px",
                      "&:hover": {
                        borderColor: "#686868 !important",
                        color: "#686868"
                      }
                    }}
                    value={selectedPositionValue}
                    onChange={(event) => handlePositionChange(event, fetchData[event.target.value]?.position_name)}
                  >
                    <MenuItem value={"all"}>Select All Position</MenuItem>
                    {fetchData?.map((position, index) => (
                      <MenuItem key={index} value={index}>
                        {position.position_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{marginRight: "5px"}}>
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
                            borderRadius: "30px"
                          }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div style={{marginRight: "5px"}}>
                <InputLabel>To</InputLabel>
              </div>
              <div style={{marginRight: "5px"}}>
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
                            borderRadius: "30px"
                          }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              py: 1,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ccc",
              borderRadius: "10px"
            }}
          >
            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
              <div style={{marginRight: "5px"}}>
                <FormControl sx={{minWidth: 120}}>
                  <Select
                    displayEmpty
                    inputProps={{"aria-label": "Without label"}}
                    sx={{
                      borderRadius: "40px",
                      width: "300px",
                      backgroundColor: "#F3F4F6",
                      padding: "0 0 0 10px",
                      "&:hover": {
                        borderColor: "#686868 !important",
                        color: "#686868"
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
              <div style={{display: "flex", padding: "5px 7px 5px 7px", alignItems: "center"}}>
                <Button
                  onClick={handleAdd}
                  variant="outlined"
                  sx={{
                    width: "150px",
                    marginRight: "10px",
                    height: "auto",
                    borderRadius: "40px",
                    borderColor: "#232323",
                    color: "#232323",
                    "&:hover": {
                      borderColor: "#686868 !important",
                      color: "#686868"
                    }
                  }}
                >
                  + Export
                </Button>
              </div>
            </div>
          </Paper>
          {isExpand ? (
            <Paper
              variant="outlined"
              sx={{
                py: 1,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ccc",
                borderRadius: "10px",
                pt: "14px"
              }}
            >
              {expandPage}
            </Paper>
          ) : null}
          {/* Table------------------------------------------------------------------------------------------------- */}
          <div style={{borderRadius: "10px", overflow: "hidden", backgroundColor: "#ffffff"}}>
            {/* <div>Project Name :</div> */}
            <Table {...getTableProps()}>
              <TableHead style={{backgroundColor: "#E0E0E0"}}>
                {headerGroups.map((headerGroup, i) => (
                  <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{"& > th:first-of-type": {width: "58px"}}}>
                    {headerGroup.headers.map((column, index) => (
                      <TableCell
                        key={index}
                        {...column.getHeaderProps([{className: column.className}, getHeaderProps(column)])}
                        sx={{
                          width: column.width || "auto",
                          ":not(:last-of-type)::after": {
                            position: "inherit "
                          }
                        }}
                      >
                        <HeaderSort column={column} />
                        {/* <Filter column={column} /> */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  return row.cells[0].value === "" ? null : (
                    <Fragment key={i}>
                      <TableRow
                        {...row.getRowProps()}
                        onClick={() => {
                          row.toggleRowSelected();
                        }}
                        sx={{
                          cursor: "pointer",
                          bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : "inherit"
                        }}
                      >
                        {row.cells.map((cell, index) => (
                          <TableCell key={index} {...cell.getCellProps([{className: cell.column.className}])}>
                            <Tooltip title={index === 0 || index === row.cells.length - 1 ? null : cell.render("Cell")} arrow>
                              <span>
                                {cell.column.truncate && cell.value.length > cell.column.truncate
                                  ? `${cell.value.slice(0, cell.column.truncate)}...`
                                  : cell.render("Cell")}
                              </span>
                            </Tooltip>
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.isExpanded && (
                        <TableCell colSpan={9} sx={{height: "100%", width: "100%"}}>
                          {renderRowSubComponent({row, rowProps, visibleColumns})}
                        </TableCell>
                      )}
                    </Fragment>
                  );
                })}
                <TableRow sx={{"&:hover": {bgcolor: "transparent !important"}}}>
                  <TableCell sx={{p: 2, py: 3}} colSpan={9}>
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
