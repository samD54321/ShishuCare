'use client';

import React from 'react';
import { Box,Container } from '@mui/material';
import { LoginComponent } from '@components/Login';
import { Header } from '@components/Header';

const Login = () => {
  return (
    <Box
      sx={{
        bgcolor: '#234AAF',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        '& ': {
          paddingInline: '1rem',
        },
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'start',
          flexDirection:"row",
          margin: '0rem',
          h4: {
            margin:"1rem",
            fontSize: ['1.5rem', '2.5rem'],
            paddingInlineStart: '0.5rem',
            color:"white"
          },
        }}
      >
        <Header />
      </Container>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <LoginComponent />
      </Container>
    </Box>
  );
};

export default Login;
