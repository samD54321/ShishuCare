'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Radio,
  Button,
  Container,
  TextField,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useGetAllPatientsQuery } from '@features/patient/patientApi';
import { useRegisterVisitMutation } from '@features/visit/visitApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Visit = () => {
  const { data } = useGetAllPatientsQuery('');
  const patients = data || [];
  const [hidden, setHidden] = React.useState(true);
  const [patientId, setpatientId] = React.useState('');
  const [register] = useRegisterVisitMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      DOV: '',
      height: '',
      weight: '',
      temperature: '',
      skinColor: '',
      breathRate: '',
      drinkMilk: '',
      dehydration: '',
      note: '',
    },
  });
  const { control: patientControl, handleSubmit: handleSelectpatient } = useForm({
    defaultValues: {
      patient: '',
    },
  });
  const router = useRouter();
  const onSubmit = (data: any) => {
    register({ patientId, data }).then((datas) =>{ console.log(datas)
     toast.success('Patient\'s visit added successfully', {
       position: toast.POSITION.TOP_CENTER,
     });
    });
    router.push('/dashboard')
  };
  const onSelectPatient = (data: any) => {
    setHidden((prev) => (prev ? !prev : prev));
    setpatientId(data.patient);
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: 'center',
        color: '#234AAF',
        marginBlockEnd: 4,
        div: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          paddingX: 1,
        },
        '.col': {
          alignItems: 'start',
          width: '100%',
          gap: 0,
          h1: { marginLeft: 40 },
          h5: { marginLeft: 1, marginBlock: 0, color: 'red' },
          h3: { marginLeft: 1, marginBlock: 0 },
        },
        '.row': {
          justifyContent: 'space-between',
          alignItems: 'start',
          width: '100%',
          flexDirection: 'row',
          h3: { marginLeft: 1, marginBlock: 0, marginTop: 2 },
          h5: { marginLeft: 1, marginBlock: 0, color: 'red' },
        },
      }}
    >
      <Dropdown
        patients={patients}
        handleSelectpatient={handleSelectpatient}
        onSelectPatient={onSelectPatient}
        patientControl={patientControl}
      />
      <section hidden={hidden}>
        <h1>Register Patient's Visit</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="DOV"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="col">
                  <h3>Date of Visit</h3>
                  <TextField type="date" fullWidth {...field} />
                  {errors.DOV?.type === 'required' && (
                    <h5 role="alert">Date of Visit is required</h5>
                  )}
                </div>
              )}
            />
            <Controller
              name="height"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="col">
                  <h3>Height</h3>
                  <TextField type="number" fullWidth {...field} />
                  {errors.height?.type === 'required' && <h5 role="alert">Height is required</h5>}
                </div>
              )}
            />
            <Controller
              name="weight"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="col">
                  <h3>Weight</h3>
                  <TextField type="number" fullWidth {...field} />
                  {errors.weight?.type === 'required' && <h5 role="alert">Weight is required</h5>}
                </div>
              )}
            />
            <Controller
              name="temperature"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="col">
                  <h3>Temperature</h3>
                  <TextField type="number" fullWidth {...field} />
                  {errors.temperature?.type === 'required' && (
                    <h5 role="alert">Temperature is required</h5>
                  )}
                </div>
              )}
            />
            <Controller
              name="skinColor"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <div className="row">
                  <h3>Skin Color :</h3>
                  <RadioGroup {...field}>
                    <FormControl
                      colors={[
                        { value: 'red', label: 'Red Color' },
                        { value: 'orange', label: 'Orange Color' },
                        { value: 'yellow', label: 'Yellow Color' },
                      ]}
                    />
                    {errors.skinColor?.type === 'required' && (
                      <h5 role="alert">Please Select one field.</h5>
                    )}
                  </RadioGroup>
                </div>
              )}
            />
            <Controller
              name="breathRate"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <div className="row">
                  <h3>Breath Rate :</h3>
                  <RadioGroup {...field}>
                    <FormControl
                      colors={[
                        { value: 'red', label: 'less than 50' },
                        { value: 'orange', label: '50-90' },
                        { value: 'green', label: 'greater than 90' },
                      ]}
                    />
                    {errors.breathRate?.type === 'required' && (
                      <h5 role="alert">Please Select one field.</h5>
                    )}
                  </RadioGroup>
                </div>
              )}
            />
            <Controller
              name="drinkMilk"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <div className="row">
                  <h3>Drink Milk :</h3>
                  <RadioGroup {...field}>
                    <FormControl
                      colors={[
                        { value: 'red', label: 'false' },
                        { value: 'green', label: 'true' },
                      ]}
                    />
                    {errors.drinkMilk?.type === 'required' && (
                      <h5 role="alert">Please Select one field.</h5>
                    )}
                  </RadioGroup>
                </div>
              )}
            />
            <Controller
              name="dehydration"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <div className="row">
                  <h3>Dehydration :</h3>
                  <RadioGroup {...field}>
                    <FormControl
                      colors={[
                        { value: 'red', label: 'false' },
                        { value: 'green', label: 'true' },
                      ]}
                    />
                    {errors.dehydration?.type === 'required' && (
                      <h5 role="alert">Please select field</h5>
                    )}
                  </RadioGroup>
                </div>
              )}
            />
            <Controller
              name="note"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="col">
                  <h3>Further Symptoms</h3>
                  <TextField fullWidth {...field} />
                  {errors.note?.type === 'required' && <h5 role="alert">Address is required</h5>}
                </div>
              )}
            />

            <Button sx={{ marginTop: 2 }} type="submit" variant="contained">
              Register
            </Button>
          </div>
        </form>
      </section>
    </Container>
  );
};

export default Visit;

interface IFormRadioBtns {
  colors: { value: string; label: string }[];
}

interface IColor {
  value: string;
  label: string;
}

const FormControl = (props: IFormRadioBtns) => {
  return (
    <div className="row">
      {props.colors.map((color: IColor, index: number) => {
        return (
          <FormControlLabel
            key={index}
            value={color.label}
            control={
              <Radio
                sx={{
                  color: color.value,
                  '&.Mui-checked': {
                    color: color.value,
                  },
                  '& .MuiSvgIcon-root': { fontSize: 40 },
                }}
              />
            }
            label={color.label==="false"?'No':color.label==="true"?'Yes':color.label}
          />
        );
      })}
    </div>
  );
};

const Dropdown = ({ patients, patientControl, handleSelectpatient, onSelectPatient }: any) => {
  return (
    <div className="col">
      <h1>Select Patient</h1>
      <form onSubmit={handleSelectpatient(onSelectPatient)}>
        <Controller
          name="patient"
          control={patientControl}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="row">
              <Select style={{ width: '45rem' }} {...field}>
                {patients.map((patient: any, index: number) => {
                  return (
                    <MenuItem key={index} value={patient._id}>
                      {patient.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <Button sx={{ padding: 2, paddingX: 4 }} variant="contained" type="submit">
                Select
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  );
};
