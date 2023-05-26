'use client';

import React, { TextareaHTMLAttributes, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { useCreateDiagnoseMutation } from '@features/diagnose/diagnoseApi';
import {useRouter} from "next/navigation"

const page = () => {
  const path = usePathname().split('/');
  const visitId = path[path.length - 2];
  const router= useRouter();
  const [createDiagnose] = useCreateDiagnoseMutation();
  const [diagnoseData, setDiagnoseData] = useState({
    conclusion: '',
    severity: '',
    prescriptions: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setDiagnoseData({ ...diagnoseData, [name]: value });
  };

  const handleClick = () => {
    console.log({...diagnoseData})
    createDiagnose({ visitId, diagnoseData }).then((data:any) => {
      console.log(data);
    });
    setDiagnoseData({ conclusion: '', severity: '', prescriptions: '' });
    router.push('/dashboard')
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        'h2,h3': {
          color: '#234AAF',
          textAlign: 'start',
          margin: 1,
        },
        h4: {
          margin: 1,
        },
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Paper
          sx={{
            borderRadius: '10px',
            bgcolor: '#234AAF',
            padding: 1,
            paddingInline: 4,
            color: 'white',
          }}
        >
          <Typography variant="h5">Case : 101</Typography>
        </Paper>
        <Paper
          sx={{
            borderRadius: '10px',
            bgcolor: '#FAD512',
            color: 'black',
            height: '2rem',
            padding: 1,
          }}
        >
          <Typography variant="h5" align="center">
            Medium Severity
          </Typography>
        </Paper>
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: 'start',
          }}
        >
          Diagnosis Response
        </Typography>
        <Paper
          elevation={24}
          sx={{
            borderRadius: '10px',
            paddingInline: 4,
            paddingBlock: 1,
            color: '#234AAF',
            width: '100%',
          }}
        >
          <h2>Conclusion</h2>
          <TextField
            name="conclusion"
            value={diagnoseData.conclusion}
            fullWidth
            label="Conclusion"
            variant="outlined"
            onChange={(e) => handleChange(e)}
          />
          <h2>Severity</h2>
          <TextField
            name="severity"
            value={diagnoseData.severity}
            fullWidth
            label="Severity"
            variant="outlined"
            onChange={(e) => handleChange(e)}
          />
          <h2>Presciption</h2>
          <TextField
            name="prescriptions"
            value={diagnoseData.prescriptions}
            fullWidth
            label="Presciption"
            variant="outlined"
            onChange={(e) => handleChange(e)}
          />
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{ marginBlockStart: 2, left: '87%' }}
          >
            Send Response
          </Button>
        </Paper>
      </Container>
    </Container>
  );
};

export default page;
