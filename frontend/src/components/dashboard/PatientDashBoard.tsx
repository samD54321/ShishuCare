'use client';

import React from 'react';
import { Container, Button, Paper } from '@mui/material';
import { useGetAllPatientsQuery } from '@features/patient/patientApi';
import Image from 'next/image';
import DeleteIcon from '@assets/svg/delete.svg';
import { useDeletePatientMutation } from '@features/patient/patientApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PatientDashBoard = () => {
  const [patients, setPatients] = React.useState([]);
  const { data, isSuccess } = useGetAllPatientsQuery('');
  const [deletePatient] = useDeletePatientMutation();
  const [isModalClicked, setIsModalClicked] = React.useState(false);
  const [name, setName] = React.useState('');
  const [id, setId] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    function getPatients() {
      setPatients(data);
    }
    getPatients();
  }, [isSuccess]);

  const handleClick = () => {

    deletePatient(id).then((data) => {
      router.refresh()
      toast.error('Deleted Successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsModalClicked(false);
      console.log(data);
    });
  };

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
          color: '#234AAF',
          marginInline: 2,
          marginBlock: 0,
        },
        '.columnDiv': {
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          justifyContent: 'start',
          alignItems: 'center',
        },
        '.rowDiv': {
          width: '100%',
          overflow: 'auto',
          display: 'flex',
          gap: '3rem',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'start',
          padding: 1,
          justifyContent: 'space-evenly',
        },
      }}
    >
      {isModalClicked ? (
        <div>
          <Modal
            open={isModalClicked}
            onClose={() => setIsModalClicked(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to delete patient with name : {name}
              </Typography>
              <div className="rowDiv">
                <Button
                  onClick={handleClick}
                  sx={{ bgcolor: 'blue', color: 'white', margin: 2, ':hover': { bgcolor: 'blue' } }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setIsModalClicked(false)}
                  sx={{ bgcolor: 'blue', color: 'white', margin: 2, ':hover': { bgcolor: 'blue' } }}
                >
                  No
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      ) : (
        <></>
      )}
      <div className="columnDiv">
        {patients &&
          patients.map((patient: any, index: number) => {
            return (
              <Paper key={index} elevation={12} className="rowDiv">
                <div>
                  <h3>Name: {patient.name}</h3>
                  <h3>
                    Gender: {patient.gender.split('')[0].toUpperCase() + patient.gender.slice(1)}
                  </h3>
                  <h3>Guardian Name: {patient.guardian}</h3>
                  <h3>Date of Birth: {patient.DOB.split('T')[0]}</h3>
                </div>
                <img
                  style={{ borderRadius: '100%' }}
                  height={100}
                  width={100}
                  src="https://th.bing.com/th/id/R.e8c5359397f35f1ef8ff377704421ccd?rik=AKD3FewV3dQynw&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f5%2f5%2f0%2f864227-beautiful-babies-wallpapers-2018-1920x1200-windows-10.jpg&ehk=xNLJrzqhnIeHsRePWiyscYM5HC04aFDjLhgqmAqB6aY%3d&risl=&pid=ImgRaw&r=0"
                  alt="baby"
                />
                <div
                  onClick={() => {
                    setName(patient.name);
                    setId(patient._id);
                    setIsModalClicked(!isModalClicked);
                  }}
                >
                  <Image
                    style={{ backgroundColor: 'white' }}
                    height={20}
                    width={20}
                    src={DeleteIcon}
                    alt=""
                  />
                </div>
              </Paper>
            );
          })}
      </div>
    </Container>
  );
};

export default PatientDashBoard;
