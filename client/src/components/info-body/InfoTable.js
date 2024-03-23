import React from 'react';
import { Container, Paper, Box, Grid, InputLabel } from '@mui/material';

const InfoTable = ({ username, data, checkNull, formatDate }) => {
  if (!data) {
    return <div>No data available.</div>;
  }

  const formatSendTo = (sendTo) => {
    if (sendTo && sendTo.length > 10) {
      let formattedSendTo = '';
      for (let i = 0; i < sendTo.length; i += 10) {
        const substring = sendTo.substr(i, 10);
        formattedSendTo += substring.replace(/,/g, ',\n');
      }
      return formattedSendTo;
    }
    return sendTo;
  };

  return (
    <Paper>
      <Container sx={{ my: 2, py: 2 }}>
        <Box sx={{ width: '100%' }}>
          {data.map((item, i) => (
            <Container key={i}>
              {username === item.worknoId && (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'left', margin: 'auto' }, py: 2 }}>Work No : {item.worknoId}</InputLabel>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'left', margin: 'auto' }, pb: 2 }}>
                      Work Name : {item.workName}
                    </InputLabel>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'left', margin: 'auto' }, pb: 2 }}>
                      Start Date : {formatDate(item.startDate)}
                    </InputLabel>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'left', margin: 'auto' }, pb: 2 }}>
                      End Date : {formatDate(item.endDate)}
                    </InputLabel>
                    <InputLabel
                      sx={{
                        textAlign: { xs: 'left', sm: 'left', margin: 'auto' },
                        pb: 2,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      Send to : {formatSendTo(item.sendTo)}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'left', margin: 'auto' }, py: 2 }}>
                      Create By : {item.createdBy}
                    </InputLabel>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'left', margin: 'auto' }, pb: 2 }}>
                      CreatedAt : {formatDate(item.createdAt)}
                    </InputLabel>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'left', margin: 'auto' }, pb: 2 }}>
                      Note : {checkNull(item.note)}
                    </InputLabel>
                    <InputLabel
                      sx={{
                        textAlign: { xs: 'left', sm: 'left', margin: 'auto' },
                        pb: 2,
                        whiteSpace: data.length > 10 ? 'pre-wrap' : 'normal'
                      }}
                    >
                      Detail : {item.detail}
                    </InputLabel>
                  </Grid>
                </Grid>
              )}
            </Container>
          ))}
        </Box>
      </Container>
    </Paper>
  );
};

export default InfoTable;
