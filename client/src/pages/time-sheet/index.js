import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import api from "_api";
import service from "undefined-service-web";
import moment from "moment";

import Action from "./Action";

// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Stack,
  Button,
  InputLabel,
  Paper,
  Autocomplete,
  TextareaAutosize
} from "@mui/material";

import {DesktopDatePicker} from "@mui/x-date-pickers";
import IconButton from "components/@extended/IconButton";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

import Swal from "sweetalert2";
import {useLocation, useNavigate} from "react-router";
import {rowsMetaStateInitializer} from "@mui/x-data-grid/internals";
import {setWeek} from "date-fns";

// table filter
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// table header
const headCells = [
  {
    id: "auto_number",
    numeric: true,
    disablePadding: false,
    label: "No."
  },
  {
    id: "work_code",
    numeric: true,
    disablePadding: false,
    label: "Work Code"
  },
  {
    id: "project_name",
    numeric: true,
    disablePadding: false,
    label: "Project Name"
  },
  {
    id: "work_name",
    numeric: true,
    disablePadding: false,
    label: "Work Name"
  },
  {
    id: "work_type",
    numeric: true,
    disablePadding: false,
    label: "Work Type"
  },
  {
    id: "detail",
    numeric: true,
    disablePadding: false,
    label: "Detail"
  },
  {
    id: "start_time",
    numeric: false,
    disablePadding: true,
    label: "Start Time"
  },
  {
    id: "end_time",
    numeric: false,
    disablePadding: true,
    label: "End Time"
  },
  {
    id: "total",
    numeric: false,
    disablePadding: true,
    label: "Total"
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Action"
  }
];

// ==============================|| TABLE - HEADER ||============================== //

function EnhancedTableHead({onRequestSort}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{backgroundColor: "#E0E0E0", borderRadius: "10px"}}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "100px" // Adjust the max-width as needed
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

// ==============================|| TABLE - DATA TABLE ||============================== //

const TimeSheet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sendDataValue = location.state?.data;
  const [updateData, setUpdateData] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [isTimeError, setIsTimeError] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [selectEnum, setSelectEnum] = useState();
  const [checkWorkCode, setCheckWorkCode] = useState();
  const [getWorkCode, setGetWorkCode] = useState();
  const [addRows, setAddRows] = useState(false);

  const findMatchingWork = (workCode) => {
    return fetchData.find((work) => work.work_code === workCode);
  };

  // const setIdAndLocalStorage = (newId) => {
  //   setId(newId);
  //   // localStorage.setItem('timesheetId', newId); // Store the id in localStorage
  // };

  // console.log('data1121', newValue);

  const fetchWorkTable = async () => {
    try {
      const {data, isStatus} = await api.work.fetchDataWork();
      // console.log('after fetch', data);
      if (isStatus) setFetchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWorkCode = async () => {
    try {
      const {data, isStatus} = await api.work.fetchDataWork();
      // console.log('after fetch', data);
      if (isStatus) {
        const optionData = data.map((item) => ({
          work_code: item.work_code
        }));
        console.log("optionData", optionData);
        setCheckWorkCode(optionData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchGetWorkCode = async () => {
    try {
      const {data, isStatus} = await api.work.fetchGetWorkCode();
      // console.log('after fetch', data);
      if (isStatus) {
        const optionData = data.map((item) => ({
          work_code: item.work_code
        }));
        console.log("optionData", optionData);
        setGetWorkCode(optionData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnum = async () => {
    try {
      const {data, isStatus} = await api.enum.getEnum();
      // console.log('enumdata', data);
      if (isStatus) {
        const optionData = data.map((item) => ({
          work_type: item.enum_id,
          name_eng: item.name_eng
        }));
        // console.log('optionData', optionData);
        setSelectEnum(optionData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnum();
  }, []);

  // console.log('fetchData', fetchData);

  const handleChange = (newValue) => {
    setValue(newValue);
    fetchTimeSheet(newValue);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.name);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const fetchTimeSheet = async (newValue) => {
    const currentDate = new Date();
    const currentDateDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    setRows([]);

    try {
      // Fetch timesheet data
      const fetchValue = await api.timeSheet.fetchTimeSheetByDate({
        timesheet_date: newValue
      });

      let timesheetFound = false;

      if (fetchValue.data.length > 0) {
        const fetchDate = new Date(fetchValue.data[0].created_date);

        if (fetchDate.toDateString() === currentDateDate.toDateString()) {
          console.log("Ever", fetchDate);
          timesheetFound = true;

          // Check if a timesheethd_id exists
          if (fetchValue.data[0].timesheethd_id) {
            setId(fetchValue.data[0].timesheethd_id);
          }
        }

        if (fetchValue.data[0].TimeSheetDTs.length > 0) {
          const sortedTimeSheetDTs = fetchValue.data[0].TimeSheetDTs.slice().sort(
            (a, b) => new Date(a.created_date) - new Date(b.created_date)
          );

          // Use Promise.all to wait for all asynchronous operations to complete
          await Promise.all(
            sortedTimeSheetDTs.map(async (e) => {
              const matchingWork = await fetchMatchingWork(e.work_code);

              setRows((s) => [
                ...s,
                {
                  timesheetdt_id: e.timesheetdt_id,
                  project_name: e.project_name,
                  work_code: e.work_code,
                  work_name: e.work_name,
                  work_type: e.work_type,
                  detail: e.detail,
                  timeStart: new Date(e.start_time),
                  timeEnd: new Date(e.end_time),
                  errorWork: false,
                  errorCode: false,
                  errorType: false,
                  errorTime: false,
                  total: new Date(e.end_time).getTime() - new Date(e.start_time).getTime(),
                  matchingWork // Add matchingWork to the row data
                }
              ]);
            })
          );

          setAddRows(true);
        } else {
          if (!sendDataValue) {
            handleAddRow();
          }
        }
      } else if (!timesheetFound) {
        // Call the resetRowsAndId function if no timesheet was found
        if (!sendDataValue) {
          resetRowsAndId();
        }
      }
    } catch (error) {
      console.error("Error fetching timesheet data:", error);
    }
  };

  const fetchMatchingWork = (workCode) => {
    const matchingWork = fetchData.find((work) => work.work_code === workCode);
    return matchingWork
      ? {
          project_name: matchingWork.project_name,
          work_name: matchingWork.work_name,
          work_type: matchingWork.work_type,
          detail: matchingWork.detail
        }
      : null;
  };

  const handleAddRow = () => {
    const newRow = {
      timesheetdt_id: "",
      project_name: "",
      work_code: "", // Prepopulate work_code if provided
      work_name: "",
      work_type: "",
      detail: "",
      timeStart: new Date(),
      timeEnd: new Date(),
      errorWork: false,
      errorCode: false,
      errorType: false,
      errorTime: false,
      total: 0
    };

    setRows((s) => [...s, newRow]);
  };

  const clearLocationState = () => {
    navigate(location.pathname); // Navigate to the same location to clear the state
  };

  const handleRemoveRow = (index, row) => {
    Swal.fire({
      title: "Record removed",
      text: "After deleting the record, this process will not be able to be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0066FF",
      cancelButtonColor: "#0066FF",
      reverseButtons: true,
      confirmButtonText: "Confirm",
      customClass: {
        confirmButton: "confirm-rounded-button",
        cancelButton: "outlined-button"
      },
      iconHtml:
        '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#ff0000"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/></svg>'
    }).then((result) => {
      if (result.value) {
        if (row.timesheetdt_id) {
          let removeTimesheet = api.timeSheet.deleteTimeSheet({timesheetdt_id: row.timesheetdt_id}).then(() => {
            if (rows.length < 1) {
              console.log("rowss", row.timesheetdt_id);
              handleAddRow();
            }
          });

          Swal.fire({
            title: "Success",
            customClass: "modal-success",
            allowEscapeKey: true,
            timer: 2000,
            showConfirmButton: false,
            iconHtml:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'
          });
        }

        const rowss = [...rows];
        rowss.splice(index, 1);
        setRows(rowss);

        // Find the index of the item to remove in location.state.data
        const dataIndex = sendDataValue.findIndex((item) => item.timesheetdt_id === row.timesheetdt_id);

        console.log("row.timesheetdt_id", row.timesheetdt_id);
        console.log("sendDataValue", sendDataValue);
        console.log("dataIndex", dataIndex);

        if (dataIndex !== -1) {
          const newData = [...sendDataValue];
          newData.splice(dataIndex, 1);

          const newLocationState = {
            ...location.state,
            data: newData
          };

          // Update localStorage
          localStorage.setItem("timesheetData", JSON.stringify(newData));

          // Update location state
          navigate(location.pathname, {state: newLocationState});

          // Update sendDataValue locally
          setSendDataValue(newData);
        }
      }
    });
  };

  const handleSubmit = async () => {
    console.log("handleSubmit", rows);
    if (rows.length > 0) {
      if (!(await handleSubmitForm()) && !isTimeError) {
        let rowsSave = {
          timeSheetHd: {
            timesheet_date: value,
            timesheethd_id: id
          },
          timeSheetDt: rows
        };

        // console.log('rowsSave', !service.isNullOrEmpty(id));
        console.log("rowsSavessssss", rowsSave);

        let updatetimeSheet = "";
        let createTime = "";
        if (id) {
          updatetimeSheet = await api.timeSheet.updateTimeSheet(rowsSave);
          console.log("updatetimeSheet", updatetimeSheet);
          setData(rowsSave);
        } else {
          createTime = await api.timeSheet.createTimeSheet(rowsSave);
          console.log("createTime", createTime);
          setData(rowsSave);
        }
        clearLocationState();
        Swal.fire({
          title: "Success",
          customClass: "modal-success",
          allowEscapeKey: true,
          timer: 2000,
          showConfirmButton: false,
          iconHtml:
            '<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" fill="#76ca66"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.970-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>'
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Please check your data and try again. The time should be more than 0.",
          customClass: "modal-error",
          allowEscapeKey: true,
          icon: "warning",
          showConfirmButton: false,
          // timer: 2000,
          iconHtml:
            '<svg width="150" height="150" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.4339 0.666016C36.3209 0.666016 46.7673 11.1123 46.7673 23.9993C46.7673 36.8863 36.3209 47.3327 23.4339 47.3327C10.5469 47.3327 0.100586 36.8863 0.100586 23.9993C0.100586 11.1123 10.5469 0.666016 23.4339 0.666016ZM23.4339 5.33268C18.4832 5.33268 13.7353 7.29934 10.2346 10.8C6.73391 14.3007 4.76725 19.0486 4.76725 23.9993C4.76725 28.9501 6.73391 33.698 10.2346 37.1987C13.7353 40.6994 18.4832 42.666 23.4339 42.666C28.3846 42.666 33.1326 40.6994 36.6332 37.1987C40.1339 33.698 42.1006 28.9501 42.1006 23.9993C42.1006 19.0486 40.1339 14.3007 36.6332 10.8C33.1326 7.29934 28.3846 5.33268 23.4339 5.33268ZM23.4339 30.9993C24.0528 30.9993 24.6462 31.2452 25.0838 31.6828C25.5214 32.1203 25.7673 32.7138 25.7673 33.3327C25.7673 33.9515 25.5214 34.545 25.0838 34.9826C24.6462 35.4202 24.0528 35.666 23.4339 35.666C22.8151 35.666 22.2216 35.4202 21.784 34.9826C21.3464 34.545 21.1006 33.9515 21.1006 33.3327C21.1006 32.7138 21.3464 32.1203 21.784 31.6828C22.2216 31.2452 22.8151 30.9993 23.4339 30.9993ZM23.4339 9.99935C24.0528 9.99935 24.6462 10.2452 25.0838 10.6828C25.5214 11.1204 25.7673 11.7138 25.7673 12.3327V26.3327C25.7673 26.9515 25.5214 27.545 25.0838 27.9826C24.6462 28.4202 24.0528 28.666 23.4339 28.666C22.8151 28.666 22.2216 28.4202 21.784 27.9826C21.3464 27.545 21.1006 26.9515 21.1006 26.3327V12.3327C21.1006 11.7138 21.3464 11.1204 21.784 10.6828C22.2216 10.2452 22.8151 9.99935 23.4339 9.99935Z" fill="#ED4040"/></svg>'
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Please check your data and try again",
        customClass: "modal-error",
        allowEscapeKey: true,
        icon: "warning",
        showConfirmButton: false,
        // timer: 2000,
        iconHtml:
          '<svg width="150" height="150" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.4339 0.666016C36.3209 0.666016 46.7673 11.1123 46.7673 23.9993C46.7673 36.8863 36.3209 47.3327 23.4339 47.3327C10.5469 47.3327 0.100586 36.8863 0.100586 23.9993C0.100586 11.1123 10.5469 0.666016 23.4339 0.666016ZM23.4339 5.33268C18.4832 5.33268 13.7353 7.29934 10.2346 10.8C6.73391 14.3007 4.76725 19.0486 4.76725 23.9993C4.76725 28.9501 6.73391 33.698 10.2346 37.1987C13.7353 40.6994 18.4832 42.666 23.4339 42.666C28.3846 42.666 33.1326 40.6994 36.6332 37.1987C40.1339 33.698 42.1006 28.9501 42.1006 23.9993C42.1006 19.0486 40.1339 14.3007 36.6332 10.8C33.1326 7.29934 28.3846 5.33268 23.4339 5.33268ZM23.4339 30.9993C24.0528 30.9993 24.6462 31.2452 25.0838 31.6828C25.5214 32.1203 25.7673 32.7138 25.7673 33.3327C25.7673 33.9515 25.5214 34.545 25.0838 34.9826C24.6462 35.4202 24.0528 35.666 23.4339 35.666C22.8151 35.666 22.2216 35.4202 21.784 34.9826C21.3464 34.545 21.1006 33.9515 21.1006 33.3327C21.1006 32.7138 21.3464 32.1203 21.784 31.6828C22.2216 31.2452 22.8151 30.9993 23.4339 30.9993ZM23.4339 9.99935C24.0528 9.99935 24.6462 10.2452 25.0838 10.6828C25.5214 11.1204 25.7673 11.7138 25.7673 12.3327V26.3327C25.7673 26.9515 25.5214 27.545 25.0838 27.9826C24.6462 28.4202 24.0528 28.666 23.4339 28.666C22.8151 28.666 22.2216 28.4202 21.784 27.9826C21.3464 27.545 21.1006 26.9515 21.1006 26.3327V12.3327C21.1006 11.7138 21.3464 11.1204 21.784 10.6828C22.2216 10.2452 22.8151 9.99935 23.4339 9.99935Z" fill="#ED4040"/></svg>'
      });
    }
  };

  const handleSumTime = (total, index) => {
    setRows((s) => {
      const newArr = s.slice();
      newArr[index].total = total / 1000 / 60;
      newArr[index].errorTime = false;
      return newArr;
    });
  };

  function addRowsFromNewValue(sendDataValue) {
    console.log("sendDataValue", Array.isArray(sendDataValue));

    if (Array.isArray(sendDataValue)) {
      const newRows = sendDataValue.map((item) => {
        return {
          timesheetdt_id: "",
          project_name: item.project_name,
          work_id: item.work_id,
          work_code: item.work_code,
          work_name: item.work_name,
          work_type: item.work_type,
          detail: item.detail,
          timeStart: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
          // Set end time to current date at 18:00:00 GMT+0700
          timeEnd: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
          errorWork: false,
          errorCode: false,
          errorType: false,
          errorTime: false,
          total: 540,
          matchingWork: {
            project_name: item.project_name,
            work_name: item.work_name,
            work_type: item.work_type,
            detail: item.detail
          }
        };
      });

      setRows((prevRows) => [...prevRows, ...newRows]);
    } else if (sendDataValue) {
      const newDataRow = {
        timesheetdt_id: "",
        project_name: sendDataValue.project_name,
        work_id: sendDataValue.work_id,
        work_code: sendDataValue.work_code,
        work_name: sendDataValue.work_name,
        work_type: sendDataValue.work_type,
        detail: sendDataValue.detail,
        timeStart: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
        // Set end time to current date at 18:00:00 GMT+0700
        timeEnd: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
        errorWork: false,
        errorCode: false,
        errorType: false,
        errorTime: false,
        total: 540,
        matchingWork: {
          project_name: sendDataValue.project_name,
          work_name: sendDataValue.work_name,
          work_type: sendDataValue.work_type,
          detail: sendDataValue.detail
        }
      };

      setRows((prevRows) => [...prevRows, newDataRow]);
    }
    setUpdateData(true);
  }

  console.log("rows has more one", rows.length);

  function resetRowsAndId() {
    setRows((s) => [
      ...s,
      {
        timesheetdt_id: "",
        project_name: "",
        work_code: "",
        work_name: "",
        work_type: "",
        detail: "",
        timeStart: new Date(),
        timeEnd: new Date(),
        errorWork: false,
        errorCode: false,
        errorType: false,
        errorTime: false,
        total: 0
      }
    ]);

    setId(null);
  }

  useEffect(() => {
    fetchTimeSheet(value);
    fetchWorkCode();
    fetchWorkTable();
    fetchGetWorkCode();
    if (sendDataValue) {
      addRowsFromNewValue(sendDataValue);
    }
  }, [data, sendDataValue]);

  // --------------------- Use Delay ----------------------------------
  useEffect(() => {
    // Define a function to handle the submission
    const handleSubmission = () => {
      handleSubmit();
      setUpdateData(false);
    };

    if (updateData) {
      const delay = 700;

      // Use a timeout to delay the submission
      const timeoutId = setTimeout(handleSubmission, delay);

      // Cleanup function to clear the timeout in case the component unmounts or `updateData` changes before the delay
      return () => clearTimeout(timeoutId);
    }

    // Ensure to add `handleSubmit` to the dependency array if it's used within the `useEffect`
  }, [updateData, handleSubmit]);

  console.log("rows", rows);

  const handleChangeValidate = (e, index) => {
    setRows((s) => {
      const newArr = s.slice();
      newArr[index][e.target.name] = e.target.value;

      if (e.target.name === "work_code") {
        newArr[index]["errorWork"] = false;
        const matchingWork = findMatchingWork(e.target.value);

        if (matchingWork) {
          newArr[index]["project_name"] = matchingWork.project_name;
          newArr[index]["work_name"] = matchingWork.work_name;
          newArr[index]["work_type"] = matchingWork.work_type;
          newArr[index]["detail"] = matchingWork.detail;
          newArr[index]["timeStart"] = new Date();
          newArr[index]["timeEnd"] = new Date();
        }
      }
      return newArr;
    });
  };

  const handleSubmitForm = () => {
    console.log("total", rows);
    let isError = false;
    let newList = rows.map((item) => {
      if (service.isNullOrEmpty(item.work_code) || service.isNullOrEmpty(item.work_type) || item.total <= 0) {
        isError = true;
      }
      return {
        ...item,
        errorCode: service.isNullOrEmpty(item.work_code),
        errorType: service.isNullOrEmpty(item.work_type),
        errorTime: item.total <= 0
      };
    });

    if (isError) {
      setIsTimeError(true);
    } else {
      setIsTimeError(false);
    }

    setRows(newList);
    return isError;
  };

  const calculateSumTime = (row) => {
    if (!isNaN(new Date(row.timeStart)) && !isNaN(new Date(row.timeEnd))) {
      if (row.timeStart != null && row.timeEnd != null) {
        row.timeStart = new Date(moment(new Date()).format("YYYY/MM/DD") + " " + moment(row.timeStart).format("HH:mm:ss"));
        row.timeEnd = new Date(moment(new Date()).format("YYYY/MM/DD") + " " + moment(row.timeEnd).format("HH:mm:ss"));
        let tom = (row.timeEnd.getTime() - row.timeStart.getTime()) / 1000 / 60;
        let h = parseInt(tom / 60);
        let m = parseInt(tom % 60);

        return (
          <div style={{width: "60px", marginTop: "14px"}}>
            {h} H {m} M
          </div>
        );
      }
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function CardActionsComponent({handleSubmit}) {
    return (
      <Paper
        sx={{
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          marginTop: "60px",
          position: "sticky",
          bottom: 0,
          zIndex: 1
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            width: 1,
            padding: "10px"
          }}
        >
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Paper>
    );
  }

  const formatTime = (time) => {
    if (time instanceof Date) {
      const hours = String(time.getHours()).padStart(2, "0");
      const minutes = String(time.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return "";
  };

  // function updateTextFieldWidth(columnName, value) {
  //   const textField = document.querySelector(`.${columnName} .MuiInputBase-input`);
  //   const textLength = value.length;
  //   console.log('textLength', textLength);
  //   console.log('textField', value);

  //   let width;
  //   if (textLength > 20) {
  //     width = textLength * 8;
  //   } else {
  //     width = 10 * 10;
  //   } // Adjust the factor as needed
  //   textField.style.width = width + 'px';
  //   textField.classList.add('expanded');
  // }

  // function resetTextFieldWidth(columnName) {
  //   const textField = document.querySelector(`.${columnName} .MuiInputBase-input`);
  //   textField.style.width = ''; // Reset width to default (auto)
  //   textField.classList.remove('expanded');
  // }

  return (
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <Paper sx={{boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)", marginBottom: "10px", borderRadius: "10px"}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{width: 1, padding: "10px", borderRadius: "10px"}}>
          <Stack direction="row" spacing={1} sx={{px: 1.5, py: 0.75}}>
            <InputLabel sx={{textAlign: "center", padding: "10px 5px"}}>Time Sheet Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                //label="วันที่"
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={(e) => {
                  handleChange(e);
                }}
                renderInput={(params) => (
                  <TextField
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
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
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
              onClick={handleAddRow}
            >
              + Row
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <div style={{flex: 1, overflowY: "auto"}}>
        <Paper sx={{borderRadius: "10px"}}>
          <TableContainer sx={{borderRadius: "10px"}}>
            <Table sx={{minWidth: 750}} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {
                  // stableSort(rows, getComparator(order, orderBy))
                  //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  rows?.map((row, index) => {
                    /** Make sure no display bugs if row isn't an OrderData object */
                    if (typeof row === "number") return null;
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        sx={{verticalAlign: "top"}}
                      >
                        <TableCell style={{textAlign: "center", width: "5%"}}>
                          <div style={{marginTop: "14px"}}>{index + 1}</div>
                        </TableCell>

                        <TableCell style={{width: "15%"}}>
                          <Autocomplete
                            id="work_code"
                            title={(option) => option.work_code || ""}
                            fullWidth
                            style={{minWidth: "100px", maxWidth: "200px", marginTop: "5px"}}
                            value={getWorkCode ? getWorkCode.find((option) => option.work_code === row.work_code) || null : null}
                            onChange={(e, newValue) => {
                              handleChangeValidate(
                                {
                                  target: {
                                    name: "work_code",
                                    value: newValue ? newValue.work_code : ""
                                  }
                                },
                                index
                              );

                              console.log("rows.work_code", row);

                              // Find the corresponding work data in fetchData
                              const matchingWork = findMatchingWork(newValue ? newValue.work_code : "");
                              if (matchingWork) {
                                console.log("matchingWork", matchingWork);
                                setRows((s) => {
                                  const newArr = [...s];
                                  newArr[index] = {
                                    ...newArr[index],
                                    work_id: matchingWork.work_id,
                                    work_code: matchingWork.work_code,
                                    project_name: matchingWork.project_name,
                                    work_name: matchingWork.work_name,
                                    work_type: matchingWork.work_type,
                                    detail: matchingWork.detail,
                                    timeStart: new Date(),
                                    timeEnd: new Date()
                                  };
                                  return newArr;
                                });
                              }
                            }}
                            options={checkWorkCode ? checkWorkCode.sort((a, b) => (a.work_code > b.work_code ? 1 : -1)) : []}
                            getOptionLabel={(option) => option.work_code || ""}
                            isOptionEqualToValue={(option, value) => option.work_code === value}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Work Code"
                                className="work_code textfield-container"
                                error={row.errorWork}
                                helperText={row.errorWork && "Work Code is required"}
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
                        </TableCell>

                        <TableCell style={{width: "15%"}}>
                          <TextField
                            disabled
                            id={"project_name"}
                            fullWidth
                            name="project_name"
                            title={row.project_name}
                            className="project_name textfield-container"
                            style={{minWidth: "100px", maxWidth: "200px", marginTop: "5px"}}
                            value={row.project_name}
                            InputProps={{maxLength: 100, sx: {borderRadius: "30px", backgroundColor: "#F3F4F6"}}}
                            onChange={(e) => {
                              handleChangeValidate(e, index);
                            }}
                          />
                        </TableCell>
                        <TableCell style={{width: "15%"}}>
                          <TextField
                            disabled
                            id={"work_name"}
                            title={row.work_name}
                            fullWidth
                            name="work_name"
                            className="work_name textfield-container"
                            value={row.work_name}
                            style={{minWidth: "100px", maxWidth: "200px", marginTop: "5px"}}
                            InputProps={{maxLength: 100, sx: {borderRadius: "30px", backgroundColor: "#F3F4F6"}}}
                            onChange={(e) => {
                              handleChangeValidate(e, index);
                            }}
                          />
                        </TableCell>
                        <TableCell style={{width: "15%"}}>
                          <Autocomplete
                            id="work_type"
                            title={(option) => option.name_eng || ""}
                            fullWidth
                            style={{minWidth: "100px", maxWidth: "200px", marginTop: "5px"}}
                            value={selectEnum ? selectEnum.find((option) => option.work_type === row.work_type) || null : null}
                            onChange={(e, newValue) => {
                              handleChangeValidate(
                                {
                                  target: {
                                    name: "work_type",
                                    value: newValue ? newValue.work_type : ""
                                  }
                                },
                                index
                              );
                            }}
                            options={selectEnum}
                            getOptionLabel={(option) => option.name_eng || ""}
                            isOptionEqualToValue={(option, value) => option.work_type === value}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Work Type Name"
                                className="work_type textfield-container"
                                // onFocus={() => updateTextFieldWidth('work_type', row.work_type)}
                                // onBlur={() => resetTextFieldWidth('work_type')}
                                error={row.errorWork}
                                helperText={row.errorWork && "Work Type is required"}
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
                        </TableCell>
                        <TableCell style={{width: "100%"}}>
                          <TextareaAutosize
                            id={"detail"}
                            name="detail"
                            className="detail textfield-container"
                            minRows={1}
                            maxRows={10}
                            value={row.detail}
                            style={{
                              padding: "8px 12px",
                              borderRadius: "20px",
                              border: "1px solid #e0e0e0",
                              background: "none",
                              width: "350px",
                              height: '130px',
                              minWidth: "100px",
                              maxWidth: "400px",
                              maxHeight: "200px",
                              minHeight: "40px",
                              fontFamily: "inherit",
                              fontSize: "0.875rem",
                              lineHeight: "1.5",
                              marginTop: "5px",
                              outline: "none"
                            }}
                            onChange={(e) => {
                              handleChangeValidate(e, index);
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.border = "1px solid #03a9f4";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.border = "1px solid #e0e0e0";
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = "0 0 3px #29b6f6"; // Add box shadow on focus
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.border = "1px solid #e0e0e0";
                              e.currentTarget.style.boxShadow = "none"; // Remove box shadow on blur
                            }}
                            maxLength="500" // Set the maxLength attribute directly
                          />
                        </TableCell>

                        {/* <TableCell>
                          <TextField
                            type="time"
                            value={formatTime(row.timeStart)}
                            style={{marginTop: "5px"}}
                            InputProps={{sx: {borderRadius: "30px"}}}
                            onChange={(e) => {
                              const newTime = e.target.value;
                              const hours = parseInt(newTime.split(":")[0]);
                              const minutes = parseInt(newTime.split(":")[1]);
                              const newValue = new Date();
                              newValue.setHours(hours);
                              newValue.setMinutes(minutes);
                              handleSumTime(row.timeEnd.getTime() - newValue.getTime(), index);
                              setIsTimeError(false);
                              setRows((s) => {
                                const newArr = s.slice();
                                newArr[index].timeStart = newValue;
                                return newArr;
                              });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="time"
                            value={formatTime(row.timeEnd)}
                            style={{marginTop: "5px"}}
                            InputProps={{sx: {borderRadius: "30px"}}}
                            onChange={(e) => {
                              const newTime = e.target.value;
                              const hours = parseInt(newTime.split(":")[0]);
                              const minutes = parseInt(newTime.split(":")[1]);
                              const newValue = new Date();
                              newValue.setHours(hours);
                              newValue.setMinutes(minutes);
                              handleSumTime(newValue.getTime() - row.timeStart.getTime(), index);
                              setIsTimeError(false);
                              setRows((s) => {
                                const newArr = s.slice();
                                newArr[index].timeEnd = newValue;
                                return newArr;
                              });
                            }}
                          />
                        </TableCell> */}
                        <TableCell>
                          <TextField
                            type="time"
                            value={formatTime(row.timeStart)}
                            style={{marginTop: "5px"}}
                            InputProps={{sx: {borderRadius: "30px"}}}
                            onChange={(e) => {
                              const newTime = e.target.value;
                              const newValue = new Date(row.timeStart); // Clone the current timeStart
                              newValue.setHours(parseInt(newTime.split(":")[0]));
                              newValue.setMinutes(parseInt(newTime.split(":")[1]));
                              handleSumTime(row.timeEnd.getTime() - newValue.getTime(), index);
                              setIsTimeError(false);
                              setRows((s) => {
                                const newArr = s.slice();
                                newArr[index].timeStart = newValue;
                                return newArr;
                              });
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="time"
                            value={formatTime(row.timeEnd)}
                            style={{marginTop: "5px"}}
                            InputProps={{sx: {borderRadius: "30px"}}}
                            onChange={(e) => {
                              const newTime = e.target.value;
                              if (newTime) {
                                const newValue = new Date(row.timeEnd); // Clone the current timeEnd
                                newValue.setHours(parseInt(newTime.split(":")[0]));
                                newValue.setMinutes(parseInt(newTime.split(":")[1]));
                                handleSumTime(newValue.getTime() - row.timeStart.getTime(), index);
                                setIsTimeError(false);
                                setRows((s) => {
                                  const newArr = s.slice();
                                  newArr[index].timeEnd = newValue;
                                  return newArr;
                                });
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{width: "30%"}}>{calculateSumTime(row)}</TableCell>
                        <TableCell>
                          <IconButton
                            color="secondary"
                            style={{marginTop: "5px"}}
                            onClick={() => {
                              handleRemoveRow(index, row);
                            }}
                          >
                            <Action />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

      {/* I need to set CardActionsComponent at bottom 0 //heigh 10vh */}
      <CardActionsComponent handleSubmit={handleSubmit} />
    </div>
  );
};

export default TimeSheet;
