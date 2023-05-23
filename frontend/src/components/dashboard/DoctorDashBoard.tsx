'use client';

import { Card, Container, Typography } from '@mui/material';
import React from 'react';

const DoctorDashBoard = () => {
  return (
    <Container sx={{display:"flex",flexDirection:"column",alignItems:"start", gap:2}}>
      <Card
        elevation={24}
        sx={{ width: '30%', padding: 1, bgcolor: '#234AAF', borderRadius: '5%', color: 'white' }}
      >
        <Typography variant="h4" align="center">
          Today's Cases
        </Typography>
      </Card>
      <Typography variant="h6" align="center">
        New Cases
      </Typography>
    </Container>
  );
};

export default DoctorDashBoard;
