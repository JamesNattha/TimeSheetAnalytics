import React from 'react';
import { Container, Box, Grid, Button } from '@mui/material';

const BackButton = ({handlebackPage,text}) => {
    return (
        <Container>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              gridTemplateRows: 'auto',
              gridTemplateAreas: `"header header header header"
                "main main . sidebar"
                "footer footer footer footer"`,
            }}
          >
            <Grid sx={{ gridArea: 'sidebar' }}>
              <Button variant="contained" onClick={handlebackPage}>
                {text}
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    )
}

export default BackButton;