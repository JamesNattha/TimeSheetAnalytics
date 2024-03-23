import { useState, useEffect, useMemo, useCallback } from 'react';

// third-party
import { useTheme } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { read, utils, writeFile } from 'xlsx';

// project import
import ScrollX from 'components/ScrollX';
import makeData from 'data/react-table';

// assets
import useNewPerson from '../data/performance-data';
import SubItems from '../sub/sub-performance';
import useColumns from '../column/performance-column';
import ReactTable from 'components/Report-projectTable';
import api from '_api';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

const ProjectList = () => {
  const theme = useTheme();
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);
  const [fetchData, setFetchData] = useState();
  const [projectData, setProjectData] = useState();
  const [timesheetData, setTimesheetData] = useState();
  const data = useNewPerson(projectData, fetchData, timesheetData);

  const fetchWorkTable = async () => {
    try {
      const { data, isStatus } = await api.report.fetchUserByGroup();
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setFetchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjectTable = async () => {
    try {
      const { data, isStatus } = await api.report.fetchProjectGroup();
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setProjectData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimesheetTable = async () => {
    try {
      const { data, isStatus } = await api.report.fetchTimesheet();
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setTimesheetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log('data in report ', data);

  useEffect(() => {
    fetchWorkTable();
    fetchProjectTable();
    fetchTimesheetTable();
  }, []);
  console.log('fetchData data in report ', fetchData);
  console.log('project data in report ', projectData);

  //-------------------------------------------------------------------------------------------------
  const handleAdd = () => {
    setAdd(!add);
    if (customer && add) setCustomer(null);
    setIsAddCustomerDialogOpen(true);
    setIsAddCustomerDialogOpen(!isAddCustomerDialogOpen);
  };
  //-------------------------------------------------------------------------------------------------
  const handleDeleteCustomer = (values) => {
    handleDelete(values, fetchWorkTable, 'project'); // Use the imported handleDelete function
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

    console.log('checkDateRange', valueStart, valueEnd, itemDate);
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

    console.log('itemDueYear', itemDate, itemDueYear, startYear, endYear);
    // Compare the item's due date with the start and end dates
    if (itemDueYear >= startYear && itemDueYear <= endYear) {
      console.log('hello');
      if (startMonth !== endMonth) {
        if (itemDueMonth === startMonth) {
          if (itemDueDay >= startDay) {
            console.log('itemDue in startDay', itemDueDay);
            return true;
          }
        } else if (itemDueMonth === endMonth) {
          if (itemDueDay <= endDay) {
            console.log('itemDue in endDay', itemDueDay);
            return true;
          }
        } else if (itemDueMonth > startMonth && itemDueMonth < endMonth) {
          console.log('itemDueMonth', itemDueMonth, startMonth, endMonth);
          return true;
        }
      } else if (startMonth === endMonth && itemDueMonth >= startMonth && itemDueMonth <= endMonth) {
        if (itemDueDay >= startDay && itemDueDay <= endDay) {
          console.log('itemDue in startMonthendMonth', itemDueDay);
          return true;
        }
      }
    }

    return false;
  };

  // function to handle date range change
  const handleDateRangeChange = () => {
    console.log('test useEffect');
    console.log('handleDateRangeChange', valueStart, valueEnd);
    const formattedValueStart = format(valueStart, 'dd-MM-yyyy');
    const formattedValueEnd = format(valueEnd, 'dd-MM-yyyy');

    // console.log('formattedValueEnd', formattedValueStart, formattedValueEnd);
    const filteredData = data.filter((item) => {
      // const itemDate = new Date(item.due_date);
      const dateParts = item.due_date.split('-'); // Assuming date string is in DD-MM-YYYY format
      const rearrangedDate = dateParts[1] + '-' + dateParts[0] + '-' + dateParts[2];
      const itemDate = new Date(rearrangedDate);
      console.log('itemDate', itemDate);
      return checkDateRange(valueStart, valueEnd, itemDate);
      // return itemDate >= formattedValueStart && itemDate <= formattedValueEnd;
    });

    console.log('formattedValueEnd filteredData', filteredData);
    setFilteredData(filteredData);
  };

  const [previousValueStart, setPreviousValueStart] = useState(valueStart);
  const [previousValueEnd, setPreviousValueEnd] = useState(valueEnd);

  useEffect(() => {
    console.log('filteredData', filteredData);
    if (data) {
      if (filteredData.length === 0 || valueStart !== previousValueStart || valueEnd !== previousValueEnd) {
        // handleDateRangeChange();
        if (valueStart !== previousValueStart) {
          handleDateRangeChange();
          setPreviousValueStart(valueStart);
        } else if (valueEnd !== previousValueEnd) {
          handleDateRangeChange();
          setPreviousValueEnd(valueEnd);
        }
      }
    }
    // Update the previous values when valueStart or valueEnd changes.
  }, [filteredData, valueStart, valueEnd]);

  //=================================================================================================Export Function================================================================================//
  const handleExport = () => {
    const headings = [['Project Code', 'Project Name', 'Duedate', 'Status', 'Sum (hrs)']];
    const sub_headings = [['Position Code', 'Position Name', 'Mandays(hrs)', 'Actual (hrs)', 'Sum (hrs)']];
    const formattedValueStart = format(valueStart, 'dd-MM-yyyy');
    const formattedValueEnd = format(valueEnd, 'dd-MM-yyyy');
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);

    ws['!cols'] = [{ width: 15 }, { width: 15 }, { width: 20 }, { width: 20 }, { width: 10 }, { width: 15 }, { width: 15 }, { width: 15 }];

    utils.sheet_add_aoa(ws, headings);
    const dataRows = filteredData.map((Project) => {
      const row = [Project.project_code, Project.project_name, Project.due_date, Project.status, Project.sum];

      // Check if Project.position_code > 0 and add sub_headings
      if (Project.position_code > 0) {
        row.push(...sub_headings);
      }

      return row;
    });
    utils.sheet_add_json(ws, dataRows, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, `Project Report (${formattedValueStart} - ${formattedValueEnd}).xlsx`);
  };

  const exportToExcel = (data) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Define the header columns
    const header = ['Date', 'valueStart - valueEnd'];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A2' });

    // Add sub_header if data.posotion_code > 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].posotion_code > 0) {
        const subHeader = ['Sub Header'];
        XLSX.utils.sheet_add_aoa(worksheet, [subHeader], { origin: `B${i + 3}` });
      }
    }

    // Add the data to the worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a blob from the workbook
    const excelBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'blob' });

    // Create a download link
    const url = URL.createObjectURL(excelBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  //---------------------------------------------------------------------------------------------------------
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);

  // Step 3: Create function to open and close the dialog
  const columns = useColumns(handleAdd, setCustomer, handleDeleteCustomer);

  const renderRowSubComponent = useCallback(({ row }) => <SubItems DatafromIndex={data[row.id]} />, [data]);

  const propsProject = {
    customer,
    onCancel: () => handleAdd(),
    fetchWorkTable: () => fetchWorkTable()
  };

  console.log('handleDateRangeChange filteredData', filteredData);

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
    nameCreateButton: 'Project',
    sortColumn: 'created_date',
    fixColumnR: 'action',
    fixColumnL: 'autoNumber'
  };

  return (
    <>
      <div>
        {/* <button onClick={handleExport}>Export to Excel</button> */}
        <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <ReactTable {...propsData} />
        </div>
        <Dialog
          maxWidth="lg"
          fullWidth
          open={isAddCustomerDialogOpen}
          PaperProps={{
            sx: {
              borderRadius: '10px'
            }
          }}
        ></Dialog>
      </div>
    </>
  );
};
export default ProjectList;
