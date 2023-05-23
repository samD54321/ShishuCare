import React from 'react';
import { Box } from '@mui/material';
import Logo from '@assets/png/logo.png';
import Image from 'next/image';

const Header = () => {
  return (
   <>
      <Box
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
        }}
      >
        <Image height={70} width={70} src={Logo} alt="header"></Image>
      </Box>
      <h4>शिशुCare </h4>
    </>
  );
};

export default Header;
