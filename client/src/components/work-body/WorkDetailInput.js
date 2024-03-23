
import {
    Grid,
    Stack,
    InputLabel,
    TextField,
  } from '@mui/material';
  
  
  const WorkDetailInput = ({ detail, handleInputChange }) => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={1.5}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
            <InputLabel sx={{ textAlign: { xs: 'left', sm: 'left', margin: 'auto' } }}>
              Work Detail:
            </InputLabel>
          </Stack>
        </Grid>
        <Grid item xs={9.1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
            <TextField
              id="detail"
              name="detail"
              value={detail}
              required
              multiline
              rows={5}
              onChange={handleInputChange}
              inputProps={{
                maxLength: 400
              }}
              sx={{ width: '85%', pd: 3, mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
            />
          </Stack>
        </Grid>
        <Grid container item xs={1}>
          <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right', margin: 'auto' } }}>
            Upload File:
          </InputLabel>
          <input type="file" />
        </Grid>
      </Grid>
    );
  };
  
    export default WorkDetailInput;