import React from 'react';
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

const NoteInput = ({ note, handleInputChange }) => {
    return (
      <Stack direction="row" spacing={4} sx={{ px: 1.5, py: 0.75 }}>
        <InputLabel sx={{ textAlign: { xs: 'left', sm: 'left', margin: 'auto' } }}>
          Note:
        </InputLabel>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            alignItems: 'left',
            flexWrap: 'wrap',
            width: 240,
            maxWidth: '100%'
          }}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <TextField
              fullWidth
              id="note"
              name="note"
              value={note}
              sx={{ pd: 3, mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
              onChange={handleInputChange}
              label={'Note'}
              variant="outlined"
            />
          </form>
        </Box>
      </Stack>
    );
  };

export default NoteInput;

