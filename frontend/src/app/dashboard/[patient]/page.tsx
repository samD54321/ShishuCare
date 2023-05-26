'use client';

import React from 'react';
import { useGetpatientByIdQuery } from '@features/patient/patientApi';
import { usePathname } from 'next/navigation';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';

const page = () => {
  const router = usePathname().split('/');
  const id = router[router.length - 1];
  let newVisit, visits;
  const { data: datas, isLoading } = useGetpatientByIdQuery(id);
  if (isLoading) {
    return <>Loading...</>;
  }
  if (!isLoading) {
    newVisit = datas?.newVisit;
    visits = datas?.visits;
    console.log(datas);
  }
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        h3: {
          color: 'black',
          textAlign: 'center',
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
            padding: 2,
            paddingInline: 6,
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
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Paper
          elevation={24}
          sx={{
            borderRadius: '10px',
            paddingInline: 4,
            paddingBlock: 1,
            color: '#234AAF',
            width: '40%',
          }}
        >
          <h3>{datas?.data.name}</h3>
          <h3>Details</h3>
          <Grid container>
            <Grid item xs={6} columnGap={0} columnSpacing={0}>
              <h4>Date Of Birth </h4>
              <h4>Gender </h4>
              <h4>Guardian Name </h4>
              <h4>Date Of Visit </h4>
            </Grid>
            <Grid item xs={6}>
              <h4>: {datas?.data.DOB.split('T')[0]}</h4>
              <h4>: {datas?.data.gender.toUpperCase()}</h4>
              <h4>: {datas?.data.guardian.toUpperCase()}</h4>
              <h4>: {newVisit.DOV.split('T')[0]}</h4>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          elevation={24}
          sx={{
            borderRadius: '10px',
            paddingInline: 4,
            color: '#234AAF',
            width: '40%',
            h3: {
              color: 'black',
              textAlign: 'center',
            },
          }}
        >
          <h3>Previous Cases</h3>
          {visits.length ? (
            visits.map((visit: any) => {
              return (
                <Paper
                  sx={{
                    bgcolor: '#234AAF',
                    borderRadius: '1rem',
                    color: 'white',
                    padding: 1,
                    'h2,h3': {
                      color: 'white',
                      textAlign: 'center',
                      margin: 0,
                    },
                  }}
                >
                  <h2>{visit?.diagnosis.conclusion}</h2>
                  <h3>Doctor : {visit?.diagnosis.doctor.name}</h3>
                </Paper>
              );
            })
          ) : (
            <>Not diagnose Previously.</>
          )}
        </Paper>
      </Container>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          marginBottom: 4,
          h3: {
            textAlign: 'start',
            color: '#234AAF',
          },
        }}
      >
        <Paper elevation={24} sx={{ padding: 2, borderRadius: '10px', width: '100%' }}>
          <Grid container>
            <Grid item xs={6} columnGap={0} columnSpacing={0}>
              <h3>What is the height of the child ? </h3>
              <h3>What is the weight of the child ? </h3>
              <h3>What is the temperature of the child ? </h3>
              <h3>What is the skin Color of the child ? </h3>
              <h3>What is the breath rate of the child ? </h3>
              <h3>Does the child feeds the milk ? </h3>
              <h3>Is the child dehydrated ? </h3>
              <h3>Further Symptoms </h3>
            </Grid>
            <Grid item xs={3}>
              <h3>: {newVisit?.height} cm</h3>
              <h3>: {newVisit?.weight} Kg</h3>
              <h3>: {newVisit?.temperature} F</h3>
              <h3>: {newVisit?.skinColor} color</h3>
              <h3>: {newVisit?.breathRate} </h3>
              <h3>: {newVisit?.drinkMilk ? 'Yes' : 'No'} </h3>
              <h3>: {newVisit?.dehydration ? 'Yes' : 'No'} </h3>
              <h3>: {newVisit?.note} </h3>
            </Grid>
            <Grid item xs={3} sx={{ display: 'grid', alignItems: 'end', justifyContent: 'end' }}>
              <Link
                href={`/dashboard/${newVisit?._id}/diagnose`}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: '3rem', width: '10rem', borderRadius: '1rem' }}
                >
                  Diagnose
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Container>
  );
};

export default page;
