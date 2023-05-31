'use client';

import React from 'react';
import { Box } from '@mui/material';
import Logo from '@assets/png/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@hooks/useAuth';

const Header = () => {
  const { authenticated } = useAuth();
  const router = useRouter();
  const handleClick = () => {
    if (authenticated) {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  };
  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          bgcolor: 'white',
          borderRadius: '100%',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60%',
          width: ['12%', '10%', '7%', '4.5%'],
          cursor: 'pointer',
        }}
      >
        <Image height={70} width={70} src={Logo} alt="header"></Image>
      </Box>
      <h4>शिशुCare </h4>
    </>
  );
};

export default Header;
