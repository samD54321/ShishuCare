'use client'; 

import React from 'react';
import { RegisterComponent } from '@components/Register';
import { Container } from '@mui/material';
import { Header } from '@components/Header';

const Register = () => {
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: '#234AAF',
          display: 'flex',
          justifyItems: 'start',
          flexDirection: 'row',
          margin: 0,
          // width:'250rem',
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
      <RegisterComponent />
    </div>
  );
};

export default Register
