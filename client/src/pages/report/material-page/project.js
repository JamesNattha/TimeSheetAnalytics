import {useState, useEffect, useMemo, useCallback} from "react";

// third-party
import {useTheme} from "@mui/material/styles";
import {Dialog} from "@mui/material";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {format} from "date-fns";
// import * as XLSX from 'xlsx';
import * as ExcelJS from "exceljs";
import {saveAs} from "file-saver";
import {read, utils, writeFile} from "xlsx";

// project import
import ScrollX from "components/ScrollX";
import makeData from "data/react-table";

// assets
import useNewPerson from "../data/project-data";
import useSubPerson from "../data/sub-position";
import SubItems from "../sub/sub-position";
import useColumns from "../column/project-column";
import ReactTable from "components/Report-projectTable";
import api from "_api";

const avatarImage = require.context("assets/images/users", true);

// ==============================|| REACT TABLE - UMBRELLA ||============================== //
const useSubDataPerson = ({DatafromIndex}) => {
  const [data, setData] = useState([]);
  const [work, setWork] = useState([]);

  console.log("v", DatafromIndex);
  useEffect(() => {
    setData(DatafromIndex.position);
    // setData(DatafromIndex);
    setWork(DatafromIndex);
  }, [DatafromIndex]);

  console.log("data in subbb", data);
  console.log("data in work", work);
  //--------------------------------------------Real--------------------------------//
  const formattedData = useMemo(() => {
    const rows = [];
    if (data) {
      data.map((person, index) => {
        ///---------------------------Check Manday---------------------------///
        const checkReturni = (sendto, user) => {
          let count = [];
          if (sendto.length > 0) {
            const converted_send_to = sendto.map((value) => JSON.parse(value));
            if (converted_send_to.length > 0) {
              for (let i = 0; i < converted_send_to.length; i++) {
                if (converted_send_to[i].length > 0) {
                  for (let j = 0; j < converted_send_to[i].length; j++) {
                    for (let g = 0; g < user.length; g++) {
                      const checkisid = converted_send_to[i][j] === user[g];
                      if (checkisid) {
                        console.log("ihere i ngai1", converted_send_to[i][j]);
                        console.log("ihere i ngai2", user[g]);
                        console.log("profile", checkisid);
                        console.log("ihere i ngai", i);
                        count.push(i);
                      }
                    }
                  }
                } else {
                  for (let g = 0; g < person.profile.length; g++) {
                    const checkid = converted_send_to[i] === person.profile[g];
                    if (checkid) {
                      console.log("profile", checkid);
                      count.push(i);
                    }
                  }
                }
              }
            }
            return count;
          }
        };

        //----------------------------Check Timesheets------------------------//
        const checkReturniTimesheet = (sendto, user) => {
          let count = [];
          // console.log('sendto', sendto);
          if (sendto && sendto.length > 0) {
            // const converted_send_to = sendto.map((value) => JSON.parse(value));
            if (sendto.length > 0) {
              for (let i = 0; i < sendto.length; i++) {
                if (sendto[i].length > 0) {
                  for (let j = 0; j < sendto[i].length; j++) {
                    for (let g = 0; g < user.length; g++) {
                      console.log("sendto", sendto[i]);
                      const checkisid = sendto[i][j] === user[g];
                      if (checkisid) {
                        console.log("ihere i ngai1", sendto[i][j]);
                        console.log("ihere i ngai2", user[g]);
                        console.log("profile 1", checkisid);
                        console.log("ihere i ngai", i);
                        count.push(i);
                      }
                    }
                  }
                } else {
                  for (let g = 0; g < person.profile.length; g++) {
                    const checkid = sendto[i] === person.profile[g];
                    if (checkid) {
                      console.log("profile", checkid);
                      count.push(i);
                    }
                  }
                }
              }
            }
            console.log("is count", count);
            return count;
          }
        };

        //-------------------------------------Summary Project-------------------------------------//
        const plusData = (sendto, user, assign) => {
          const iValues = checkReturni(sendto, user);
          let total = 0;

          // console.log('iValues', iValues);
          if (iValues && iValues.length > 0) {
            for (const i of iValues) {
              const send_to = assign?.map((value) => JSON.parse(value));
              // console.log('send_to', send_to);
              if (send_to && send_to !== undefined && send_to[i].length > 1) {
                // console.log('assign', send_to);
                // console.log('assign[i].length', send_to[i].length);
                total += work.total[i] / send_to[i].length;
                // console.log('total', total);
              } else {
                total += work.total[i] || 0;
                // console.log('total', total);
                // console.log('assign', assign[i]);
              }
            }
          }

          // console.log('console.log(total):', total);
          return total;
        };

        //-------------------------------------Summary Timesheets----------------------------------//
        const plusTimesheet = (sendto, user) => {
          const iValues = checkReturniTimesheet(sendto, user);
          let total = 0;
          console.log("iValues", iValues);
          if (iValues && iValues.length > 0) {
            for (const i of iValues) {
              total += parseInt(work.total_ts[i]) || 0;
              console.log("total", total);
            }
          }

          // console.log('console.log(total):', total);
          return total;
        };

        if (data.length > 0) {
          const row = {
            position_code: person.position_code,
            position_name: person.position_name,
            manday: plusData(work.send_to, person.profile, work.send_to),
            actual: plusTimesheet(work.timesheets, person.profile),
            total:
              plusTimesheet(work.timesheets, person.profile) === 0
                ? 0
                : plusData(work.send_to, person.profile) - plusTimesheet(work.timesheets, person.profile)
          };
          rows.push(row);
          console.log("row", row);
        }
      });
    }
    return rows;
  }, [data]);

  return formattedData;
};

const ProjectList = () => {
  const theme = useTheme();
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const [fetchData, setFetchData] = useState();
  const [projectData, setProjectData] = useState();
  const [timesheetData, setTimesheetData] = useState();
  const [mondayData, setMondayData] = useState();
  const data = useNewPerson(projectData, fetchData, timesheetData, mondayData);

  const fetchWorkTable = async () => {
    try {
      const {data, isStatus} = await api.report.fetchUser();
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setFetchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjectTable = async () => {
    try {
      const {data, isStatus} = await api.report.fetchReport();
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setProjectData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimesheetTable = async () => {
    try {
      const {data, isStatus} = await api.report.fetchTimesheet();
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setTimesheetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMondayTable = async () => {
    try {
      const {data, isStatus} = await api.report.fetchMonday();
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setMondayData(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("data in report ", data);

  useEffect(() => {
    fetchWorkTable();
    fetchProjectTable();
    fetchTimesheetTable();
    fetchMondayTable();
  }, []);
  console.log("fetchData data in report ", fetchData);
  console.log("project data in report ", projectData);

  //-------------------------------------------------------------------------------------------------
  const handleAdd = () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
    setIsAddCustomerDialogOpen(true);
    setIsAddCustomerDialogOpen(!isAddCustomerDialogOpen);
  };
  //-------------------------------------------------------------------------------------------------
  const handleDeleteCustomer = (values) => {
    handleDelete(values, fetchWorkTable, "project"); // Use the imported handleDelete function
  };

  //=================================================================================================Filtered Date Range================================================================================//
  const [filteredData, setFilteredData] = useState(data);
  const currentDate = new Date(); // Get the current date
  const threeMonthsAgo = new Date(currentDate); // Create a copy of the current date

  // Subtract 1 months from threeMonthsAgo
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 1);
  const [valueStart, setValueStart] = useState(threeMonthsAgo);
  const [valueEnd, setValueEnd] = useState(currentDate);

  const checkDateRange = (valueStart, valueEnd, itemDate) => {
    // Extract day, month, and year from the input dates

    console.log("checkDateRange", valueStart, valueEnd, itemDate);
    const startDay = valueStart.getDate();
    const startMonth = valueStart.getMonth() + 1;
    const startYear = valueStart.getFullYear();

    const endDay = valueEnd.getDate();
    const endMonth = valueEnd.getMonth() + 1;
    const endYear = valueEnd.getFullYear();

    // const itemDueDate = new Date(itemDate);
    const itemDueDay = itemDate.getDate();
    const itemDueMonth = itemDate.getMonth() + 1;
    const itemDueYear = itemDate.getFullYear();

    console.log("itemDueYear", itemDate, itemDueYear, startYear, endYear);
    // Compare the item's due date with the start and end dates
    if (itemDueYear >= startYear && itemDueYear <= endYear) {
      console.log("hello");
      if (startMonth !== endMonth) {
        if (itemDueMonth === startMonth) {
          if (itemDueDay >= startDay) {
            console.log("itemDue in startDay", itemDueDay);
            return true;
          }
        } else if (itemDueMonth === endMonth) {
          if (itemDueDay <= endDay) {
            console.log("itemDue in endDay", itemDueDay);
            return true;
          }
        } else if (itemDueMonth > startMonth && itemDueMonth < endMonth) {
          console.log("itemDueMonth", itemDueMonth, startMonth, endMonth);
          return true;
        }
      } else if (startMonth === endMonth && itemDueMonth >= startMonth && itemDueMonth <= endMonth) {
        if (itemDueDay >= startDay && itemDueDay <= endDay) {
          console.log("itemDue in startMonthendMonth", itemDueDay);
          return true;
        }
      }
    }

    return false;
  };

  // function to handle date range change
  const handleDateRangeChange = () => {
    console.log("handleDateRangeChange", valueStart, valueEnd);
    const formattedValueStart = format(valueStart, "dd-MM-yyyy");
    const formattedValueEnd = format(valueEnd, "dd-MM-yyyy");

    // console.log('formattedValueEnd', formattedValueStart, formattedValueEnd);
    const filteredData = data.filter((item) => {
      // const itemDate = new Date(item.due_date);
      const dateParts = item.due_date.split("-"); // Assuming date string is in DD-MM-YYYY format
      const rearrangedDate = dateParts[1] + "-" + dateParts[0] + "-" + dateParts[2];
      const itemDate = new Date(rearrangedDate);
      console.log("itemDate", itemDate);
      return checkDateRange(valueStart, valueEnd, itemDate);
      // return itemDate >= formattedValueStart && itemDate <= formattedValueEnd;
    });

    console.log("formattedValueEnd filteredData", filteredData);
    setFilteredData(filteredData);
  };

  const [previousValueStart, setPreviousValueStart] = useState(valueStart);
  const [previousValueEnd, setPreviousValueEnd] = useState(valueEnd);

  useEffect(() => {
    console.log("filteredData", filteredData);
    if (data) {
      if (filteredData.length === 0 || valueStart !== previousValueStart || valueEnd !== previousValueEnd) {
        handleDateRangeChange();
      }
    }
    // Update the previous values when valueStart or valueEnd changes.
    if (valueStart !== previousValueStart) {
      setPreviousValueStart(valueStart);
    }
    if (valueEnd !== previousValueEnd) {
      setPreviousValueEnd(valueEnd);
    }
  }, [filteredData, valueStart, valueEnd]);

  //=================================================================================================Export Function================================================================================//
  const [dataSub, setDatasub] = useState([]);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");
    const formattedValueStart = format(valueStart, "dd-MM-yyyy");
    const formattedValueEnd = format(valueEnd, "dd-MM-yyyy");
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);

    const headingStyle = {fill: {fgColor: {rgb: "ADD8E6"}}};

    //--------------------------------------------Real--------------------------------//

    worksheet.getCell("A1").value = "Report";
    worksheet.getCell("A2").value = "Date";
    worksheet.getCell("B2").value = formattedValueStart;
    worksheet.getCell("C2").value = formattedValueEnd;

    // Add data to the worksheet
    const headings = ["Project Code", "Project Name", "Duedate", "Status", "Sum (hrs)"];
    worksheet.addRow([]);

    //header setting
    headings.forEach((heading) => {
      worksheet.getCell(`${String.fromCharCode(65 + headings.indexOf(heading))}3`).value = heading;
    });

    filteredData.forEach((Project, index) => {
      const dataRow = [Project.project_code, Project.project_name, Project.due_date, Project.status, Project.sum];
      const subHeadings = ["รหัสตำแหน่ง", "ชื่อตำแหน่ง", "Manday (hrs)", "Actual (hrs)", "Total (hrs)"];
      console.log("index index", index);
      worksheet.addRow(dataRow);
      setDatasub(Project);

      // Add the subheadings starting from column B
      worksheet.addRow(["", ...subHeadings]);

      // const subData = useCallback(useSubPerson(Project))

      // Apply style to subheading cells
      const subHeadingRow = worksheet.lastRow;
      subHeadingRow.eachCell((cell, colNumber) => {
        if (colNumber !== 1) {
          // Exclude the empty cell in the first column
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb: "ADD8E6"} // light blue background color
          };
        }
      });

      // Call the hook inside a functional component or custom hook
      // <SubDataComponent key={index} project={Project} />;

      // import api from '_api';

      // console.log('Project is sub', Project);
      // const subisData = useSubDataPerson({ DatafromIndex: Project });;
      // console.log('subData', subisData);
    });

    // Apply style to heading cells
    const headingRow = worksheet.getRow(3);
    headingRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb: "ADD8E6"} // light blue background color
      };
    });

    // Adjust column widths
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    // Save the workbook
    await workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), `Project Report (${formattedValueStart} - ${formattedValueEnd}).xlsx`);
    });
  };

  //---------------------------------------------------------------------------------------------------------
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);

  // Step 3: Create function to open and close the dialog
  const columns = useColumns(handleAdd, setCustomer, handleDeleteCustomer);

  const renderRowSubComponent = useCallback(({row}) => <SubItems DatafromIndex={data[row.id]} />, [data]);

  const propsProject = {
    customer,
    onCancel: () => handleAdd(),
    fetchWorkTable: () => fetchWorkTable()
  };

  console.log("handleDateRangeChange filteredData", filteredData);

  const propsData = {
    columns,
    data: filteredData,
    // data: filteredData.length > 0 ? filteredData : data,
    fetchData,
    renderRowSubComponent,
    getHeaderProps: (column) => column.getSortByToggleProps(),
    handleAdd: () => handleExport(),
    // handleDateRangeChange: () => handleDateRangeChange(),
    valueStart,
    valueEnd,
    setValueStart,
    setValueEnd,
    nameCreateButton: "Project",
    sortColumn: "created_date",
    fixColumnR: "action",
    fixColumnL: "autoNumber"
  };

  return (
    <>
      <div></div>
    </>
  );
};
export default ProjectList;
