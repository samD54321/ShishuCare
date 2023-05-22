'use client';

import { LoginComponent } from '@components/Login';
import React from 'react';
import { Container } from '@mui/material';

const Login = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: '#234AAF',
        display: 'flex',
        justifyContent:"center",
        height: '86vh',
      }}
    >
      <LoginComponent />
    </Container>
  );
};

export default Login;
