'use client';

import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Container, Avatar } from '@mui/material';
import Image from 'next/image';
import DoctorAvatar from '@assets/svg/doctorLogo.svg';
import { useLoginCHWMutation } from '@features/chw/chwApi';
import { useLoginDoctorMutation } from '@features/doctor/doctorApi';
import ChevronRight from '@assets/svg/chevronRight.svg';
import ChevronLeft from '@assets/svg/chevronLeft.svg';
import { LocalStorageItem } from '../../auth/auth';
import { useDispatch } from 'react-redux';
import { loginCHW, loginDoctor } from '@features/shishuCare';
import { useRouter } from 'next/navigation';

const LoginComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [chevronClick, setChevronClick] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [login_CHW] = useLoginCHWMutation();
  const [login_Doctor] = useLoginDoctorMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert('Please enter all information');
    } else {
      if (chevronClick) {
        login_CHW(user).then((datas: any) => {
          const user = datas.data || '';
          if (user) {
            LocalStorageItem.setItem(user.data);
            dispatch(loginCHW());
            router.push('/dashboard');
          } else {
            alert(datas.error.data.error);
          }
        });
      } else {
        login_Doctor(user).then((datas: any) => {
          const user = datas.data || '';
          if (user) {
            LocalStorageItem.setItem(user.data);
            dispatch(loginDoctor());
            router.push('/dashboard');
          } else {
            alert(datas.error.data.error);
          }
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
          // height: [`75%`, `75%`, `75%`, `65%`, `55%`],
          width: [`100%`, `75%`, `65%`, `55%`, `50%`],
          borderRadius: '2%',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
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
              justifyContent: 'center',
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

        <Container
          maxWidth="xl"
          sx={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            marginInlineStart: 3,
            alignItems: 'center',
            gap: '2rem',
          }}
        >
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
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button onClick={(e) => handleClick(e)} sx={{ width: '20%' }} variant="contained">
            LogIn{' '}
          </Button>
        </Container>
      </Paper>
    </>
  );
};

export default LoginComponent;
