'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Select, Button, Container, TextField, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useRegisterPatientMutation } from '@features/patient/patientApi';

const Patient = () => {
  const [register] = useRegisterPatientMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      DOB: '',
      gender: {},
      phone: '',
      address: '',
      guardian: '',
    },
  });
  const router = useRouter();
  const onSubmit = (data: any) => {
    register(data).then((datas: any) => {
      console.log(datas);
      router.push('/dashboard');
    });
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: 'center',
        color: '#234AAF',
        marginBlockEnd: 2,
        div: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          paddingX: 1,
        },
        '.col': {
          width: '100%',
          gap: 0,
          alignItems: 'start',
          h5: { marginBlock: 0, color: 'red' },
          h3: { marginLeft: 1, marginBlock: 0 },
        },
      }}
    >
      <h1>Register Patient</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="col">
                <h3>Name</h3>
                <TextField fullWidth {...field} />
                {errors.name?.type === 'required' && <h5 role="alert">Name is required</h5>}
              </div>
            )}
          />
          <Controller
            name="DOB"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="col">
                <h3>Date</h3>
                <TextField type="date" fullWidth {...field} />
                {errors.DOB?.type === 'required' && <h5 role="alert">Date is required</h5>}
              </div>
            )}
          />
          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="col">
                <h3>Gender</h3>
                <TextField select fullWidth {...field}>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                </TextField>
                {errors.gender?.type === 'required' && <h5 role="alert">Gender is required</h5>}
              </div>
            )}
          />
          <Controller
            name="phone"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <div className="col">
                <h3>Phone Number</h3>
                <TextField fullWidth {...field} />
                {errors.phone?.type === 'required' && (
                  <h5 role="alert">phone Number is required</h5>
                )}
              </div>
            )}
          />
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="col">
                <h3>Address</h3>
                <TextField fullWidth {...field} />
                {errors.address?.type === 'required' && <h5 role="alert">Address is required</h5>}
              </div>
            )}
          />
          <Controller
            name="guardian"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="col">
                <h3>Guardian Name</h3>
                <TextField fullWidth  {...field} />
                {errors.guardian?.type === 'required' && (
                  <h5 role="alert">Guardian Name is required</h5>
                )}
              </div>
            )}
          />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Patient;
