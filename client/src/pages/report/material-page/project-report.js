import {useState, useEffect, useMemo, useCallback} from "react";

// third-party
import App from "components";
import {useTheme} from "@mui/material/styles";
import {Dialog} from "@mui/material";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {format} from "date-fns";
// import * as XLSX from 'xlsx';
import * as ExcelJS from "exceljs";
import {saveAs} from "file-saver";
import {read, utils, writeFile} from "xlsx";
import dayjs from "dayjs";
import moment from "moment";

// project import
import ScrollX from "components/ScrollX";
import makeData from "data/react-table";
import SubItems from "../sub/sub-position";

// assets
import useNewPerson from "../data/project-report";
import useColumns from "../column/project-report-column";
import ReactTable from "components/Report-projectTable-copy";
import api from "_api";
import DateRangePicker from "components/DateRangePicker";

const ProjectList = () => {
  const theme = useTheme();
  const [customer, setCustomer] = useState(null);
  // const [data, setData] = useState(null);
  const [add, setAdd] = useState(false);
  const [fetchData, setFetchData] = useState();
  const [projectData, setProjectData] = useState();
  const [timesheetData, setTimesheetData] = useState();
  const [positionData, setPositionData] = useState();
  const [mondayData, setMondayData] = useState();
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [filteredInformation, setFilteredformation] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState([]);

  //-------------------------------Read me-------------------------------------//
  // หน้าจะเป็น main ของ Report โดยจะเรียกข้อมูล API ทั้งหมด และทำฟังก์ชั่นที่นี่

  //---------------------------fetach API DATA---------------------------
  const fetchWorkTable = async () => {
    try {
      const {data, isStatus} = await api.report.fetchUser();
      // console.log("fetch user ", data);
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setFetchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjectTable = async () => {
    try {
      const {data, isStatus} = await api.report.fetchReport();
      // console.log("fetch project ", data);
      if (isStatus) setProjectData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimesheetTable = async () => {
    try {
      const {data, isStatus} = await api.report.fetchTimesheet();
      // console.log("fetch timesheet ", data);
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setTimesheetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosition = async () => {
    try {
      const {data, isStatus} = await api.report.fetchUserPosition();
      if (isStatus) setPositionData(data);
      // console.log("datanow", data);
    } catch (error) {
      console.error(error);
    }
  };

  // const data = useNewPerson(projectData, fetchData, positionData);

  const columns = useColumns();

  useEffect(() => {
    fetchWorkTable();
    fetchProjectTable();
    fetchTimesheetTable();
    fetchPosition();
  }, []);

  const data = useNewPerson(projectData, fetchData, positionData);

  useEffect(() => {
    if (isDataFetched.length === 0) {
      fetchProjectTable().then(() => {
        setIsDataFetched(data);
      });
    }
  }, [isDataFetched]);

  //==============================================================================================================
  const currentDate = new Date();
  const threeMonthsAgo = new Date(currentDate);
  threeMonthsAgo.setMonth(currentDate.getMonth() - 5);

  const [startDate, setStartDate] = useState(threeMonthsAgo);
  const [endDate, setEndDate] = useState(currentDate);

  const handleOnChangeDate = (start, end) => {
    console.log("start", start);
    setStartDate(start);
    setEndDate(end);
  };
  // console.log("data", data);
  // console.log("endDate", endDate);

  //==========================================Filter Data by Date Range===========================================
  const handleDateRangeChange = (isDataFetched, startDate, endDate) => {
    // console.log("start", isDataFetched);
    // Filter data based on the date range
    const filteredData = isDataFetched.filter((entry) => {
      // console.log("entry", entry);
      const dateArray = entry.start_date.split("-");
      const entryDate = entry.start_date ? new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`) : null;
      const dateEndArray = entry.end_date.split("-");
      const entryEndDate = entry.end_date ? new Date(`${dateEndArray[2]}-${dateEndArray[1]}-${dateEndArray[0]}`) : null;
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      // console.log("entryDate", entryDate);
      // console.log("entryEndDate", entryEndDate);
      // console.log("start", start);
      // console.log("end", end);
      if (start && end) {
        return (entryDate >= start && entryDate <= end) || (entryEndDate >= start && entryEndDate <= end);
      }
    });

    // console.log(filteredData);
    setFilteredformation(filteredData);
  };
  const [previousValueStart, setPreviousValueStart] = useState(startDate);
  const [previousValueEnd, setPreviousValueEnd] = useState(endDate);
  // console.log("data test", isDataFetched);

  //=============================Date Func Update===========================================

  useEffect(() => {
    setDateRange([startDate ? dayjs(startDate) : "", endDate ? dayjs(endDate) : ""]);
    handleDateRangeChange(isDataFetched, startDate, endDate);
    // if (!data || !filteredInformation) {
    //   handleDateRangeChange(data, startDate, endDate);
    // }
    // console.log("startendDate", startDate);
  }, [isDataFetched, startDate, endDate]);

  //========================================================================================

  //======================================= Export Excel ========================================
  const [filteredProject, setFilteredProject] = useState("");
  const [filteredPosition, setFilteredPosition] = useState("");

  useEffect(() => {
    // console.log("filteredData", filteredData);
    if (!filteredInformation) {
      if (filteredInformation.length === 0 || startDate !== previousValueStart || endDate !== previousValueEnd) {
        handleDateRangeChange(isDataFetched, startDate, endDate);
      }
    }
    // Update the previous values when valueStart or valueEnd changes.
    if (startDate !== previousValueStart) {
      setPreviousValueStart(startDate);
    }
    if (endDate !== previousValueEnd) {
      setPreviousValueEnd(endDate);
    }
  }, [filteredInformation, startDate, endDate]);

  const handleProjectFilterChange = (value) => {
    // console.log("projectname", value);
    setFilteredProject(value);
  };

  const handlePositionFilterChange = (value) => {
    // console.log("positionname", value);
    setFilteredPosition(value);
  };

  function minutesToHours(minutes) {
    if (typeof minutes !== "number" || isNaN(minutes)) {
      return "Invalid input";
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    // Construct the result string
    const result = `${hours} h ${remainingMinutes} m`;
    return result;
  }

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();

    const formattedValueStart = moment(new Date(startDate)).format("dd-MM-yyyy");
    const formattedValueEnd = moment(new Date(endDate)).format("dd-MM-yyyy");
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);

    const headingStyle = {fill: {fgColor: {rgb: "ADD8E6"}}};

    //--------------------------------------------Real--------------------------------//
    filteredInformation
      .filter((Project) =>
        filteredProject !== "" && filteredProject !== "all"
          ? Project.type === "project" && Project.project_name === filteredProject
          : Project.type === "project"
      )
      .forEach((Project, index) => {
        const mainWorkSheet = workbook.addWorksheet(`Report ${Project.project_name}`);
        mainWorkSheet.getCell("A1").value = `Report`;
        mainWorkSheet.getCell("B1").value = `${Project.project_name}`;
        mainWorkSheet.getCell("A2").value = "Date";
        mainWorkSheet.getCell("B2").value = formattedValueStart;
        mainWorkSheet.getCell("C2").value = formattedValueEnd;

        // Add data to the mainWorkSheet
        const headings = [
          "NO.",
          "Name",
          "Work Code",
          "Work Name",
          "Position",
          "Start Date",
          "End Date",
          "Assign Time (Hr)",
          "Actual Time (Hr)",
          "Total Time (Hr)"
        ];
        mainWorkSheet.addRow([]);

        //header setting
        headings.forEach((heading) => {
          mainWorkSheet.getCell(`${String.fromCharCode(65 + headings.indexOf(heading))}3`).value = heading;
        });

        filteredInformation
          .filter((entry) =>
            filteredPosition !== "" && filteredPosition !== "all"
              ? entry.position_code === filteredPosition && entry.no_hidden === Project.no_hidden && entry.type === "work"
              : entry.no_hidden === Project.no_hidden && entry.type === "work"
          )
          .forEach((Work, index) => {
            const dataRow = [
              Work.autoNumber,
              Work.worker_name,
              Work.work_code,
              Work.work_name,
              Work.position_name,
              Work.start_date,
              Work.end_date,
              Work.assign_time,
              Work.actual_time,
              Work.total
            ];
            // console.log("index index", index);

            mainWorkSheet.addRow(dataRow);
          });

        const totalActualTime = filteredInformation
          .filter((entry) =>
            filteredPosition !== "" && filteredPosition !== "all"
              ? entry.position_code === filteredPosition && entry.no_hidden === Project.no_hidden && entry.type === "work"
              : entry.no_hidden === Project.no_hidden && entry.type === "work"
          )
          .reduce((totalMinutes, Work) => {
            const rawActualTime = parseInt(Work.raw_actual_time);
            return !isNaN(rawActualTime) ? totalMinutes + rawActualTime : totalMinutes;
          }, 0);

          const totalAssignTime = filteredInformation
          .filter((entry) =>
            filteredPosition !== "" && filteredPosition !== "all"
              ? entry.position_code === filteredPosition && entry.no_hidden === Project.no_hidden && entry.type === "work"
              : entry.no_hidden === Project.no_hidden && entry.type === "work"
          )
          .reduce((totalMinutes, Work) => {
            const rawActualTime = parseInt(Work.raw_assign_time);
            return !isNaN(rawActualTime) ? totalMinutes + rawActualTime : totalMinutes;
          }, 0);

        const additionalData = [
          "Summary",
          `${minutesToHours(totalAssignTime)}`,
          `${minutesToHours(totalActualTime)}`,
          `${minutesToHours(totalAssignTime - totalActualTime)}`

          // Add more as needed
        ];

        mainWorkSheet.addRow(["", "", "", "", "", "", ...additionalData]);
        const subHeadingRow = mainWorkSheet.lastRow;
        subHeadingRow.eachCell((cell, colNumber) => {
          if (colNumber !== 6 && cell.value !== "") {
            // Exclude the empty cell in the first column
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: {argb: "ADD8E6"} // light blue background color
            };
          }
        });

        // Apply style to heading cells
        const headingRow = mainWorkSheet.getRow(3);
        headingRow.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb: "ADD8E6"} // light blue background color
          };
        });

        // Adjust column widths
        mainWorkSheet.columns.forEach((column) => {
          column.width = 15;
        });
      });

    // Save the workbook
    await workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), `Project Report (${formattedValueStart} - ${formattedValueEnd}).xlsx`);
    });
  };

  // const renderRowSubComponent = useCallback(({row}) => <SubItems DatafromIndex={data[row.id]} />, [data]);

  //-----------------------------------------Prompt for Table------------------------------------------//
  const propsData = {
    columns,
    // data: data,
    data: filteredInformation,
    projectData: projectData,
    positionData: positionData,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    // data: filteredData.length > 0 ? filteredData : data,
    // renderRowSubComponent,
    fetchData,
    getHeaderProps: (column) => column.getSortByToggleProps(),
    handleAdd: () => handleExport(),
    handleOnChangeDate,
    handleProjectFilterChange,
    handlePositionFilterChange,
    // handleDateRangeChange: () => handleDateRangeChange(),
    nameCreateButton: "Project",
    sortColumn: "no_hidden",
    fixColumnR: "action",
    fixColumnL: "autoNumber"
  };

  //-----------------------------------------Response------------------------------------------//
  return (
    <>
      <div>
        <div style={{overflowX: "auto", maxWidth: "100%"}}>
          <ReactTable {...propsData} />
        </div>
        <Dialog
          maxWidth="lg"
          fullWidth
          open={isAddCustomerDialogOpen}
          PaperProps={{
            sx: {
              borderRadius: "10px"
            }
          }}
        ></Dialog>
      </div>
    </>
  );
};
export default ProjectList;
