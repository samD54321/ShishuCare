import React from 'react';
import { Box, Button, Paper, TextField, Container, Avatar, Typography } from '@mui/material';
import Logo from '@assets/png/logo.png';
import Image from 'next/image';

const Header = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: '100%',
          padding: '2rem',
          display:"flex",
          alignItems: "center",
          justifyContent: "center",
          height:"20%",
          width:"2.5%"
        }}
      >
        <Image height={70} width={70} src={Logo} alt="header"></Image>
      </Box>
      <h4 >शिशुCare </h4>
    </>
  );
};

export default Header;
