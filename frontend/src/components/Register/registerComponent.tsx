'use client';

import { Container, Paper, TextField, Button } from '@mui/material';
import React from 'react';
import ChevronRight from '@assets/svg/chevronRight.svg';
import ChevronLeft from '@assets/svg/chevronLeft.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRegisterCHWMutation } from '@features/chw/chwApi';
import { useRegisterDoctorMutation } from '@features/doctor/doctorApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterComponent = () => {
  let users: [string, string][];
  const [role, setRole] = React.useState<string>('Doctor');
  const [registerDoctor] = useRegisterDoctorMutation();
  const [registerCHW] = useRegisterCHWMutation();
  const [doctor, setDoctor] = React.useState({
    name: '',
    email: '',
    phone: '',
    hospital: '',
    title: '',
    password: '',
  });
  const [chw, setCHW] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  if (role === 'Doctor') {
    users = Object.entries(doctor);
  } else {
    users = Object.entries(chw);
  }
  console.log(role);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    if (role === 'Doctor') {
      setDoctor({ ...doctor, [name]: value });
    } else {
      setCHW({ ...chw, [name]: value });
    }
  };

  const handleClick = () => {
    if (role === 'Doctor') {
      registerDoctor(doctor).then((datas) => {
         toast.success('Doctor has been registered successfully', {
           position: toast.POSITION.TOP_CENTER,
         });
        console.log(datas);
      });
      setDoctor({
        name: '',
        email: '',
        phone: '',
        hospital: '',
        title: '',
        password: '',
      });
    } else if (role === 'CHW') {
      registerCHW(chw).then((datas) => {
        toast.success('CHW has been registered successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(datas);
      });
      setCHW({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: '#234AAF',
        display: 'flex',
        justifyItems: 'start',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        margin: 0,
        height: '86vh',
        h4: {
          textAlign: 'center',
          margin: '1rem',
          fontSize: ['1.5rem', '2.5rem'],
          paddingInlineStart: '0.5rem',
          color: '#234AAF',
        },
        h2: {
          fontSize: ['0.5rem', '1.3rem'],
          color: 'white',
        },
      }}
    >
      <Paper
        elevation={24}
        sx={{
          // height: '70%',
          width: '50%',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {role === 'CHW' ? (
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'start',
              gap: 28,
            }}
          >
            <Button onClick={() => setRole('Doctor')}>
              <Image height={30} width={30} src={ChevronLeft} alt="right_chevron"></Image>
            </Button>
            <h4>CHW</h4>
          </Container>
        ) : (
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 20,
            }}
          >
            <h4>DOCTOR</h4>
            <Button
              onClick={() => setRole('CHW')}
              sx={{
                marginInlineStart: '2rem',
              }}
            >
              <Image height={30} width={30} src={ChevronRight} alt="right_chevron"></Image>
            </Button>
          </Container>
        )}
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {users.map((user, index) => {
            return (
              <TextField
                key={index}
                name={user[0]}
                value={user[1]}
                label={user[0].toUpperCase()}
                onChange={(e) => handleChange(e)}
                variant="standard"
                type={user[0] === 'email' ? 'email' : user[0] === 'password' ? 'password' : 'text'}
                sx={{
                  width: '70%',
                  '& label': {
                    fontSize: '1rem',
                    color: '#234AAF',
                    '&.Mui-focused': {
                      color: '#234AAF',
                    },
                  },
                }}
              />
            );
          })}
        </Container>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{ width: '20%', marginBlockStart: '2rem' }}
        >
          Sign Up
        </Button>
      </Paper>
      <h2>
        If you have already signed up,{' '}
        <Link
          style={{
            textDecoration: 'none',
            color: 'cyan',
          }}
          href="/login"
        >
          Click
        </Link>{' '}
        here
      </h2>
    </Container>
  );
};

export default RegisterComponent;
