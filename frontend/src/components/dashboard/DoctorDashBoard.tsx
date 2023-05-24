'use client';

import { Card, Container, Paper, Typography, Button } from '@mui/material';
import React from 'react';
import { useGetPatientsQuery } from '@features/patient/patientApi';

const DoctorDashBoard = () => {
  const { data, isLoading, error } = useGetPatientsQuery('');
  console.log(data);
  const RecurringPatients = data?.RecurringPatients;
  const NewPatients = data?.NewPatients;
  if (isLoading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>{error}</>;
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginInlineStart: '5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 2,
      }}
    >
      <Card
        elevation={24}
        sx={{ width: '30%', padding: 1, bgcolor: '#234AAF', borderRadius: '16px', color: 'white' }}
      >
        <Typography variant="h4" align="center">
          Today's Cases
        </Typography>
      </Card>
      <Typography variant="h6" align="center">
        New Cases
      </Typography>
      <NewCases datas={NewPatients} />
      <Typography variant="h6" align="center">
        Recurring Cases
      </Typography>
      <RecurringCases datas={RecurringPatients} />
    </Container>
  );
};

export default DoctorDashBoard;

const NewCases = ({ datas }: { datas: any }) => {
  return (
    <Container maxWidth="xl">
      {datas.map((data: any, index: number) => {
        return (
          <Paper
            elevation={24}
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: '#234AAF',
              width: '100%',
              marginBlock: 4,
              padding: 1,
              borderRadius: '10px',
              alignItems: 'center',
              boxShadow: '2px 3px 5px 2px black',
              div: {
                paddingInlineStart: 4,
              },
            }}
          >
            <div>
              <Typography variant="h6">Case #{index + 1}</Typography>
            </div>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6">Name : {data.name}</Typography>
              <Typography variant="h6">
                Major Symptom : {data.visits[0].note.split(',')[0].toUpperCase()}
              </Typography>
            </Container>
            <Paper
              elevation={24}
              sx={{
                width: '10%',
                bgcolor: 'yellow',
                borderRadius: '16px',
                paddingBlock: 1,
                marginInlineEnd: 2,
              }}
            >
              <Typography variant="body1" align="left">
                Medium
              </Typography>
            </Paper>
          </Paper>
        );
      })}
    </Container>
  );
};


const RecurringCases = ({ datas }: { datas: any }) => {
  console.log(datas[0])
  return (
    <Container maxWidth="xl">
      {datas.map((data: any, index: number) => {
        return (
          <Paper
            elevation={24}
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: '#234AAF',
              width: '100%',
              marginBlock: 4,
              padding: 1,
              borderRadius: '10px',
              alignItems: 'center',
              boxShadow: '2px 3px 5px 2px black',
              div: {
                paddingInlineStart: 4,
              },
            }}
          >
            <div>
              <Typography variant="h6">Case #{index + 1}</Typography>
            </div>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6">Name : {data.name}</Typography>
              <Typography variant="h6">
                Major Symptom : {data.visits[0].note.split(',')[0].toUpperCase()}
              </Typography>
            </Container>
            <Paper
              elevation={24}
              sx={{
                width: '10%',
                bgcolor: 'yellow',
                borderRadius: '16px',
                paddingBlock: 1,
                marginInlineEnd: 2,
              }}
            >
              <Typography variant="body1" align="left">
                Medium
              </Typography>
            </Paper>
          </Paper>
        );
      })}
    </Container>
  );
};
