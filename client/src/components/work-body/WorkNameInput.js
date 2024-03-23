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
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const WorkNameInput = ({ workName, handleInputChange, error }) => {
  return (
    <Stack direction="row" spacing={4} sx={{ px: 1.5, py: 0.75 }}>
      <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right', margin: 'auto' } }}>
        Work Name:
      </InputLabel>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'left',
          flexWrap: 'wrap',
          width: 220,
          maxWidth: '100%'
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <TextField
            label="Name"
            name="workName"
            value={workName}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ pd: 3, mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
            error={error}
            helperText={error ? 'Please enter a name.' : ''}
            variant="outlined"
          />
        </form>
      </Box>
    </Stack>
  );
};

export default WorkNameInput;