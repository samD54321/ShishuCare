'use client';

import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Container, Avatar } from '@mui/material';
import Image from 'next/image';
import DoctorAvatar from '@assets/svg/doctor.svg';
import { useLoginCHWMutation } from '@features/chw/chwApi';
import { useLoginDoctorMutation } from '@features/doctor/doctorApi';
import ChevronRight from '@assets/svg/chevronRight.svg';
import ChevronLeft from '@assets/svg/chevronLeft.svg';
import { LocalStorageToken } from '../../auth/auth';

const LoginComponent = () => {
  const [chevronClick, setChevronClick] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loginCHW] = useLoginCHWMutation();
  const [loginDoctor] = useLoginDoctorMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleClick = (e: React.MouseEvent) => {
    console.log(user)
    e.preventDefault();
    if (!user.email || !user.password) {
      alert('Please enter all information');
    } else {
      if (chevronClick) {
        loginCHW(user).then((datas: any) => {
          console.log(datas)
          if (datas){
          LocalStorageToken.setToken(datas.data.data.token, 'chwToken');
          }
        });
      } else {
        loginDoctor(user).then((datas: any) => {
          LocalStorageToken.setToken(datas.data.data.token, 'doctorToken');
        });
      }
      setUser({
        email: '',
        password: '',
      });
    }
  };
  return (
    <>
      <Paper
        elevation={24}
        sx={{
          bgcolor: 'white',
          height: [`75%`, `75%`, `75%`, `65%`, `65%`],
          width: [`100%`, `75%`, `65%`, `55%`, `55%`],
          borderRadius: '2%',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'space-around',
          textAlign: 'left',
          gap: '2rem',
          h3: {
            fontSize: ['1.5rem', '1.8rem', '2rem', '2.5rem', '2.5rem'],
            paddingInlineEnd: [`2rem`, `2rem`, `3rem`, `4rem`, `6rem`],
            textAlign: 'left',
            color: '#234AAF',
          },
        }}
      >
        {chevronClick ? (
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Button onClick={() => setChevronClick(!chevronClick)}>
              <Image height={50} width={50} src={ChevronLeft} alt="right_chevron"></Image>
            </Button>
            <h3>CHW LOGIN</h3>
            <Image height={130} width={130} src={DoctorAvatar} alt="doctor" />
          </Container>
        ) : (
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <h3>DOCTOR LOGIN</h3>
            <Image height={130} width={130} src={DoctorAvatar} alt="doctor" />
            <Button
              onClick={() => setChevronClick(!chevronClick)}
              sx={{
                marginInlineStart: '2rem',
              }}
            >
              <Image height={50} width={50} src={ChevronRight} alt="right_chevron"></Image>
            </Button>
          </Container>
        )}

        <Container sx={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <TextField
            sx={{
              width: '90%',
              '& label': {
                fontSize: '1rem',
                color: '#234AAF',
                '&.Mui-focused': {
                  color: '#234AAF',
                },
              },
            }}
            name="email"
            value={user.email}
            label="Email"
            placeholder="random@gmail.com"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            sx={{
              width: '90%',
              '& label': {
                fontSize: '1rem',
                color: '#234AAF',
                '&.Mui-focused': {
                  color: '#234AAF',
                },
              },
            }}
            name="password"
            value={user.password}
            label="Password"
            type="password"
            placeholder="******"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Container>
        <Button onClick={(e) => handleClick(e)} sx={{ width: '30%' }} variant="contained">
          LogIn{' '}
        </Button>
      </Paper>
    </>
  );
};

export default LoginComponent;
