import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import api from '_api';
const Calendar = ({ days, events }) => {
  // Map through days and events and render them
  return (
    <Grid container spacing={2}>
      {days.map((day) => (
        <Grid item key={day.id} xs={4}>
          <Paper elevation={3}>
            <Typography variant="h6">{day.date}</Typography>
            {events
              .filter((event) => event.date === day.date)
              .map((event) => (
                <Event key={event.id} event={event} />
              ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Calendar;
