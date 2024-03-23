import React, { useState } from 'react';
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
  Divider,
  Paper
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

const ImportPopup = ({ onCancel, refetch }) => {
  const [data, setData] = useState([]); // Data structure to hold your data
  const [list, setList] = useState(false);
  const [tabValue, setTabValue] = useState(0); // 0 for Import, 1 for Export

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [movies, setMovies] = useState([]);

  const setUploadDatafile = async (datafile) => {
    try {
      console.log(datafile);
      const uploadData = await api.calendar.UploadCalendar(datafile);
      console.log('uploadData', uploadData);
      await refetch();
      await onCancel();
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
    const headings = [
      [
        'title',
        'description',
        'start date & time',
        'end date & time',
        { t: 's', v: 'allDay', s: { validation: 'list', ref: 'A1', sqref: 'A1', options: ['true', 'false'] } },
        'type',
        'background color',
        'text color'
      ]
    ];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);

    ws['!cols'] = [{ width: 15 }, { width: 15 }, { width: 20 }, { width: 20 }, { width: 10 }, { width: 15 }, { width: 15 }, { width: 15 }];
    utils.sheet_add_aoa(ws, headings);
    const dataRows = movies.map((movie) => [
      movie.title,
      movie.description,
      new Date(movie.startDate), // Convert start date to a Date object
      new Date(movie.endDate), // Convert end date to a Date object
      movie.allDay ? 'true' : 'false', // Convert boolean to string 'true' or 'false'
      movie.type,
      movie.backgroundColor,
      movie.textColor
    ]);
    utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Calendar Event Form.xlsx');
  };

  const handleFormExport = () => {
    const fileName = 'FormEvent.xlsx';

    // Use the saveAs function to trigger the download
    saveAs(ExcelForm, fileName);
  };

  return (
    <Paper>
      <DialogTitle sx={{ bgcolor: '#F3F4F6' }}>Import Event</DialogTitle>
      <Divider />
      <div style={{ padding: '20px' }}>
        <>
          <Formik
            initialValues={{ files: null }}
            onSubmit={(values) => {
              // submit form
              console.log('dropzone upload - ', values);
            }}
            validationSchema={yup.object().shape({
              files: yup.mixed().required('Avatar is a required.')
            })}
          >
            {({ values, handleSubmit, setFieldValue, touched, errors }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1.5} alignItems="center">
                      <UploadMultiFile
                        showList={list}
                        setFieldValue={setFieldValue}
                        files={values.files}
                        error={touched.files && !!errors.files}
                        onUpload={handleUpload}
                      />
                      {touched.files && errors.files && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.files}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
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

export default ImportPopup;
