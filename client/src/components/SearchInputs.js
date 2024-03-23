import React from 'react';
import { Paper, TextField, Grid } from '@mui/material';

const SearchInputs = ({ value, onChange }) => {
  return (
    <div>
      <Paper sx={{ mb: 2, px: 2, py: 0.5 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField id="filled-search" label="Search" type="search" variant="filled" value={value} onChange={onChange} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SearchInputs;
