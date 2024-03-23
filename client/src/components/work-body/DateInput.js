import { useState } from 'react';
import {
  Paper,
  Box,
  Grid,
  Stack,
  InputLabel,
  TextField,
  Button,
  Container
} from '@mui/material';
import { defaults } from 'lodash';
import { TimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DateInput = ({ name, label, value, onChange }) => {
    return (
      <Stack direction="row" spacing={4} sx={{ px: 1.5, py: 0.75 }}>
        <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right', margin: 'auto' } }}>
          {label}:
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            name={name}
            label="Select Date"
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
    );
  };

  export default DateInput;