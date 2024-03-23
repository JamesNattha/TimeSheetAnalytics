import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormHelperText,
  Grid,
  Stack,
  Typography,
  Tab,
  Tabs,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider
} from '@mui/material';
import MainCard from 'components/MainCard';
import { read, utils, writeFile } from 'xlsx';

// project imports
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';
import api from '_api';

// third-party
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

//assets
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import ExcelForm from '../../../assets/Sheets/FormEvent.xlsx';
import IconButton from 'components/@extended/IconButton';

const ExportPopup = ({ onCancel, refetch }) => {
  const [data, setData] = useState([]); // Data structure to hold your data
  const [list, setList] = useState(false);
  const [tabValue, setTabValue] = useState(0); // 0 for Import, 1 for Export
  const [holiday, setHoliday] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchHolidays = async () => {
    try {
      const { data, isStatus } = await api.calendar.bankHolidayExport();
      // console.log('ดูแค่อันนี้นะ', data);
      if (isStatus) setHoliday(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (holiday.length === 0) {
      fetchHolidays();
    }
  });

  const [movies, setMovies] = useState([]);

  const setUploadDatafile = async (datafile) => {
    try {
      console.log(datafile);
      const uploadData = await api.calendar.UploadCalendar(datafile);
      console.log('uploadData', uploadData);
      refetch();
      onCancel();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        // text: 'if you delete the information, this process will not be able to be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0066FF',
        cancelButtonColor: '#0066FF',
        reverseButtons: true,
        confirmButtonText: 'Confirm',
        customClass: {
          confirmButton: 'confirm-rounded-button',
          cancelButton: 'outlined-button'
        },
        iconHtml: '<div class="discard-icon"></div>'
      });
    }
  };

  const handleUpload = (files) => {
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const options = { raw: false, dateNF: 'm/d/yyyy h:mm:ss' };
      const parsedData = XLSX.utils.sheet_to_json(sheet, options, { header: 1 });
      console.log('parsedData', parsedData);
      setUploadDatafile(parsedData);
    };
  };

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setMovies(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    const headings = [['Title', 'Description', 'StartDatetime', 'EndDatetime', 'Allday', 'Type']];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);

    ws['!cols'] = [{ width: 15 }, { width: 15 }, { width: 20 }, { width: 20 }, { width: 10 }, { width: 15 }, { width: 15 }, { width: 15 }];
    utils.sheet_add_aoa(ws, headings);
    console.log('holiday wop wip wop wip' ,holiday)
    const dataRows = holiday.map((holidays) => [
      holidays.calendar_title,
      holidays.dettail,
      holidays.start_date, // Convert start date to a Date object
      holidays.end_date, // Convert end date to a Date object
      holidays.all_day, // Convert boolean to string 'true' or 'false'
      holidays.calendar_type
    ]);
    utils.sheet_add_json(ws, dataRows, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Thailand Bank Holiday.xlsx');
  };

  const handleFormExport = () => {
    const fileName = 'FormEvent.xlsx';

    // Use the saveAs function to trigger the download
    saveAs(ExcelForm, fileName);
  };

  return (
    <Paper>
      <DialogTitle sx={{ bgcolor: '#F3F4F6' }}>Export Event Form</DialogTitle>
      <Divider />
      <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <>
          <div className="row">
            <div className="col-sm-6 offset-3">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
                    <TableCell>Form Create Event</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        onClick={handleFormExport}
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: '40px',
                          backgroundColor: '#393939',
                          text: '#FFF',
                          '&:hover': {
                            backgroundColor: '#242424'
                          }
                        }}
                      >
                        Export
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>2</TableCell>
                    <TableCell>Holiday by Bank Thailand</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        onClick={handleExport}
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: '40px',
                          backgroundColor: '#393939',
                          text: '#FFF',
                          '&:hover': {
                            backgroundColor: '#242424'
                          }
                        }}
                      >
                        Export
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      </div>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ px: '20px', pb: '20px' }}>
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              onClick={onCancel}
              sx={{
                mr: 1.5,
                backgroundColor: 'transparent',
                borderColor: '#393939',
                color: '#393939',
                borderRadius: '40px',
                width: '170px',
                height: '40px',
                '&:hover': {
                  backgroundColor: '#D2D2D2',
                  borderColor: '#393939',
                  color: '#393939'
                }
              }}
            >
              CLOSE
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExportPopup;
