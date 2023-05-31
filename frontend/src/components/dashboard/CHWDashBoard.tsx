'use client';

import React, { useEffect, useState } from 'react';
import { Container, Button, Paper } from '@mui/material';
import RegisterIcon from '@assets/png/vitals.png';
import PatientIcon from '@assets/png/patient.png';
import Image from 'next/image';
import { useGetDoctorsQuery } from '@features/doctor/doctorApi';
import { useGetVisitsQuery } from '@features/visit/visitApi';
import Doctor from '@assets/svg/doctor.svg';
import Link from 'next/link';

const CHWDashBoard = () => {
  const {
    data: doctors_data,
    isLoading,
    isError,
    isSuccess: isSuccessDoctor,
  } = useGetDoctorsQuery('');
  const { data: visits, isSuccess: isSuccessVisit } = useGetVisitsQuery('');


  const [doctors, setDoctor] = useState([]);
  const [diagnosedDatas, setDiagnosedDatas] = useState([]);
  const [unDiagnosedDatas, setUnDiagnosedDatas] = useState([]);

    // const diagnosedDatas = visits?.diagnosedDatas;
  // const unDiagnosedDatas = visits?.unDiagnosedDatas;

  useEffect(() => {
    setDoctor(doctors_data);
  }, [isSuccessDoctor]);

  useEffect(() => {
    setDiagnosedDatas(visits?.diagnosedDatas);
    setUnDiagnosedDatas(visits?.unDiagnosedDatas);
  }, [isSuccessVisit]);

  console.log(visits);
  if (isLoading) {
    return <>Loading...</>;
  }
  if (isError) {
    return <>error...</>;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: 2,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-evenly',
        color: '#234AAF',
        button: {
          bgcolor: '#234AAF',
        },
        h3: {
          color: 'black',
          marginInline: 2,
        },
        '.columnDiv': {
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          justifyContent: 'start',
          alignItems: 'center',
        },
        '.rowDiv': {
          overflow: 'auto',
          display: 'flex',
          gap: '3rem',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'start',
        },
      }}
    >
      <div className="columnDiv">
        <div>
          <h1>Services Available</h1>
          <div className="rowDiv">
            <div className="colDiv">
              <Link href={'/dashboard/patient'} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{ borderRadius: '100%', height: '4rem', ':hover': { bgcolor: 'blue' } }}
                >
                  <Image src={PatientIcon} alt="patient" />
                </Button>
              </Link>
              <h3>Register Patient</h3>
            </div>
            <div className="colDiv">
              <Link href={'/dashboard/visit'} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{ borderRadius: '100%', height: '4rem', ':hover': { bgcolor: 'blue' } }}
                >
                  <Image src={RegisterIcon} alt="register" />
                </Button>
              </Link>
              <h3>Register Patient's Visit</h3>
            </div>
          </div>
          <div>
            <h1>Diagnosed Cases</h1>
            {diagnosedDatas &&
              diagnosedDatas.map((data: any, index: number) => {
                return (
                  <Link
                    key={index}
                    href={`/dashboard/${data.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Paper
                      key={index}
                      sx={{
                        textAlign: 'start',
                        bgcolor: 'whitesmoke',
                        borderRadius: '5px',
                        ':hover': {
                          bgcolor: '#234AAF',
                          h3: {
                            color: 'white',
                          },
                        },
                      }}
                    >
                      <h3>{data.name}</h3>
                      <h3>{data.DOV.split('T')[0]}</h3>
                    </Paper>
                  </Link>
                );
              })}
          </div>
          <div>
            <h1>UnDiagnosed Cases</h1>
            {unDiagnosedDatas &&
              unDiagnosedDatas.map((data: any, index) => {
                return (
                  <Link
                    key={index}
                    href={`/dashboard/${data.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Paper
                      key={index}
                      sx={{
                        textAlign: 'start',
                        bgcolor: 'whitesmoke',
                        borderRadius: '5px',
                        ':hover': {
                          bgcolor: '#234AAF',
                          h3: {
                            color: 'white',
                          },
                        },
                      }}
                    >
                      <h3>{data.name}</h3>
                      <h3>{data.DOV.split('T')[0]}</h3>
                    </Paper>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
      <div className="columnDiv">
        <h1>Available Doctors</h1>
        <div className="rowDiv">
          {doctors &&
            doctors.map((doctor: any, index: number) => {
              return (
                <Paper
                  elevation={5}
                  key={index}
                  sx={{
                    gap: 1,
                    padding: 2,
                    bgcolor: 'whitesmoke',
                    borderRadius: '5px',
                    ':hover': {
                      bgcolor: '#234AAF',
                      h3: {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <Image src={Doctor} alt="doctor" />
                  <h3>Name : {doctor?.name}</h3>
                  <h3>Title : {doctor?.title ? doctor.title : 'Consultant'}</h3>
                  <h3>Hospital : {doctor?.hospital}</h3>
                  <h3>Phone : {doctor?.phone}</h3>
                </Paper>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default CHWDashBoard;
