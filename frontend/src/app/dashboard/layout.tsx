'use client';

import { Container,Button ,Box} from '@mui/material';
import { Header } from '@components/Header';
import { useDispatch } from 'react-redux';
import { LocalStorageItem } from '@auth/auth';
import { loginDoctor, loginCHW } from '@features/shishuCare';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   const dispatch = useDispatch();

   const user = LocalStorageItem.getItem().role;
   if (user === 'Doctor') {
     dispatch(loginDoctor());
   } else {
     dispatch(loginCHW());
   }
  return (
    <html lang="en">
      <title>ShishuCare</title>
      <body suppressHydrationWarning={true} style={{ padding: 0, margin: 0 }}>
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            margin: 0,
            // width:'250rem',
            h4: {
              margin: '1rem',
              fontSize: ['1.5rem', '2.5rem'],
              paddingInlineStart: '0.5rem',
              color: '#234AAF',
            },
          }}
        >
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: '100%',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Header />
          </Box>
          <Button sx={{ height: '50%', bgcolor: '#234AAF', borderRadius:"10%" }} variant="contained">
            Logout
          </Button>
        </Container>
        {children}
      </body>
    </html>
  );
}
