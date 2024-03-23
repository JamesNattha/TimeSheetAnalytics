import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Event = ({ event }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">{event.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default Event;
