'use client';

import { LoginComponent } from '@components/Login';
import React from 'react';
import { Container } from '@mui/material';
import { Header } from '@components/Header';

const Login = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: '#234AAF',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection:"column",
        height: '100vh',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: '#234AAF',
          display: 'flex',
          justifyItems: 'start',
          flexDirection: 'row',
          margin: 0,
          paddingBlockStart:'1rem',
          h4: {
            margin: '1rem',
            fontSize: ['1.5rem', '2.5rem'],
            paddingInlineStart: '0.5rem',
            color: 'white',
          },
        }}
      >
        <Header />
      </Container>
      <LoginComponent />
    </Container>
  );
};

export default Login;
