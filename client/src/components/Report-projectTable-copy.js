import PropTypes, {func} from "prop-types";
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
  InputLabel,
  DataGrid,
  Typography,
  Grid,
  Pagination
} from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
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
import DateRangePicker from "components/DateRangePicker";
// import CustomPanigation from "./CustomPanigation";
import CustomTablePanigation from "./CustomTablePanigation";
import CustomeTable from "./CustomeTable";
// assets
import {DownOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {filteredPosition} from "../recoil";

// ==============================|| REACT TABLE ||============================== //

function ReactTable({
  columns,
  data,
  projectData,
  positionData,
  startDate,
  endDate,
  fetchData,
  getHeaderProps,
  renderRowSubComponent,
  handleAdd,
  handleOnChangeDate,
  handleProjectFilterChange,
  handlePositionFilterChange,
  nameCreateButton,
  valueStart,
  valueEnd,
  setStartDate,
  setEndDate,
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
        pageSize: 2,
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

  //==============================Pagination=============================================
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10); // 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.filter((row) => row.type === "work").slice(firstIndex, lastIndex);

  // console.log("current recordsPerPage", recordsPerPage);
  // console.log("current records", records);
  const npage = Math.ceil(data.length / recordsPerPage);
  // console.log("current npage", npage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const changeRecords = (records) => {
    setRecordsPerPage(records);
  };

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangePagination = (event, value) => {
    gotoPage(value - 1);
  };

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  //==============================Searching=============================================
  const [filters, setFilters] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [searchFilters, setSearchFilters] = useState("");

  const count = preGlobalFilteredRows.length;

  const searchFiltered = (searchInput) => {
    setSearchFilters(searchInput);
  };
  const clearSearchInput = () => {
    setSearchFilters("");
    setSearchInput("");
  };

  //=======================================================================================

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
  const [selectedProjectValue, setSelectedProjectValue] = useState("all");
  const [selectedProjectFilter, setSelectedProjectFilter] = useState("all"); // Set the default value to 'all'
  const handleProjectChange = (event, selectedProjectName) => {
    // console.log("event.target.value", event.target.value);

    if (selectedProjectName) {
      setSelectedProjectValue(event.target.value);
      setSelectedProjectFilter(selectedProjectName);
      handleProjectFilterChange(selectedProjectName);
    } else {
      setSelectedProjectValue("all");
      setSelectedProjectFilter("all");
      handleProjectFilterChange("all");
    }

    // setGlobalFilter(selectedProjectName);
  };

  //------------------------------ SET SELECT VALUE OF SELECT POSITION NAME BAR ---------------------------------------------------------
  const [filtered, setFilter] = useState("all");
  const [selectedPositionValue, setSelectedPositionValue] = useState("all"); // Set the default value to 'all'
  const handlePositionChange = (event, selectedPositionName) => {
    // console.log("event.target.value", selectedPositionName);
    setSelectedPositionValue(event.target.value);
    // console.log("selectedPositionName", selectedPositionValue);
    if (selectedPositionName) {
      setGlobalFilter(selectedPositionName);
      setFilter(selectedPositionName);
      handlePositionFilterChange(selectedPositionName);
      // console.log("setFilter", filtered);
    } else {
      setFilter("all");
      setSelectedPositionValue("all");
      handlePositionFilterChange("all");
    }

    // setGlobalFilter(selectedPositionName);
  };

  //--------------------------------------------------------DATE RANGE PICKER------------------------------------------------//
  // const [valueStart, setValueStart] = useState(new Date());
  // const [valueEnd, setValueEnd] = useState(new Date());

  const handleApplyFilter = () => {
    handleDateRangeChange(valueStart, valueEnd); // Pass the dates as arguments
  };
  // };

  // console.log("data table", data);

  // const uniqueNoHiddenValues = [...new Set(data.map((row) => ({no_hidden: row.no_hidden, project_name: row.project_name})))];
  const uniqueNoHiddenValues = [
    ...new Map(
      data
        .filter((row) => row.type === "project")
        .map((row) => [`${row.no_hidden}-${row.project_name}-${row.project_code}-${row.assign_time}-${row.actual_time}-${row.total}`, row])
    ).values()
  ];

  // console.log("uniqueNoHiddenValues", uniqueNoHiddenValues);

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
                  searchFiltered(searchInput); // Apply the global filter with the search input value
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
                    onChange={(event) => handleProjectChange(event, projectData[event.target.value]?.project_name)}
                  >
                    <MenuItem value={"all"}>Select Project Name</MenuItem>
                    {projectData?.map((position, index) => (
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
                    onChange={(event) => handlePositionChange(event, positionData[event.target.value]?.position_id)}
                  >
                    <MenuItem value={"all"}>Select Position Name</MenuItem>
                    {positionData?.map((position, index) => (
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
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
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
                <InputLabel>
                  <SyncAltIcon />
                </InputLabel>
              </div>
              <div style={{marginRight: "5px"}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
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
              {/* <div style={{marginRight: "5px"}}>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(start_date, end_date) => {
                    if ((start_date == null || start_date === "") && (end_date == null || end_date === "")) {
                      // console.log("startlog notthing", start_date, end_date);
                      handleOnChangeDate("", "");
                    } else {
                      let start = start_date;
                      let end = end_date;
                      handleOnChangeDate(start, end);
                      // console.log("start log", start, end);
                    }
                  }}
                />
              </div> */}
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
            <div>
              {selectedProjectValue !== "" && selectedProjectValue !== "all" ? (
                <Paper
                  variant="outlined"
                  sx={{
                    py: 1,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    pt: "14px",
                    mb: "14px"
                  }}
                >
                  <CustomeTable
                    data={data.filter((row) => row.project_name === selectedProjectFilter && row.type === "project")}
                    dataRow={data
                      .filter((item) => {
                        return searchFilters.toLowerCase() === ""
                          ? item
                          : item.worker_name.toLowerCase().includes(searchFilters.toLowerCase()) ||
                              item.work_name.toLowerCase().includes(searchFilters.toLowerCase()) ||
                              item.work_code.toLowerCase().includes(searchFilters.toLowerCase()) ||
                              item.position_name.toLowerCase().includes(searchFilters.toLowerCase()) ||
                              item.start_date.toLowerCase().includes(searchFilters.toLowerCase()) ||
                              item.end_date.toLowerCase().includes(searchFilters.toLowerCase()) ||
                              item.assign_time.toLowerCase().includes(searchFilters.toLowerCase()) ||
                              item.actual_time.toLowerCase().includes(searchFilters.toLowerCase()) ||
                              item.total.toLowerCase().includes(searchFilters.toLowerCase());
                      })
                      .filter((row) =>
                        filtered !== "" && filtered !== "all"
                          ? row.project_name === selectedProjectFilter && row.position_code === filtered
                          : row.project_name === selectedProjectFilter
                      )}
                    selectedProjectFilter={selectedProjectFilter}
                    // noHiddenValue={noHiddenValue}
                    filteredPosition={filtered}
                    searchFilters={searchFilters}
                  />
                </Paper>
              ) : (
                uniqueNoHiddenValues.map((noHiddenValue, i) => (
                  <Paper
                    key={i}
                    variant="outlined"
                    sx={{
                      py: 1,
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      pt: "14px",
                      mb: "14px"
                    }}
                  >
                    <CustomeTable
                      data={[noHiddenValue]}
                      dataRow={data
                        .filter((item) => {
                          return searchFilters.toLowerCase() === ""
                            ? item
                            : item.worker_name.toLowerCase().includes(searchFilters.toLowerCase()) ||
                                item.work_name.toLowerCase().includes(searchFilters.toLowerCase()) ||
                                item.work_code.toLowerCase().includes(searchFilters.toLowerCase()) ||
                                item.position_name.toLowerCase().includes(searchFilters.toLowerCase()) ||
                                item.start_date.toLowerCase().includes(searchFilters.toLowerCase()) ||
                                item.end_date.toLowerCase().includes(searchFilters.toLowerCase()) ||
                                item.assign_time.toLowerCase().includes(searchFilters.toLowerCase()) ||
                                item.actual_time.toLowerCase().includes(searchFilters.toLowerCase()) ||
                                item.total.toLowerCase().includes(searchFilters.toLowerCase());
                        })
                        .filter((row) =>
                          filtered !== "" && filtered !== "all"
                            ? row.no_hidden === noHiddenValue.no_hidden && row.position_code === filtered
                            : row.no_hidden === noHiddenValue.no_hidden
                        )}
                      selectedProjectFilter={selectedProjectFilter}
                      noHiddenValue={noHiddenValue}
                      filteredPosition={filtered}
                      searchFilters={searchFilters}
                    />
                  </Paper>
                ))
              )}
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
