'use client';

import { Providers } from './providers';
import { Container } from '@mui/material';
import { Header } from '@components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>ShishuCare</title>
      <body suppressHydrationWarning={true} style={{ padding: 0, margin: 0 }}>
        <Providers>
          <Container
            maxWidth="xl"
            sx={{
              bgcolor: '#234AAF',
              display: 'flex',
              justifyItems: 'start',
              flexDirection: 'row',
              margin: 0,
              // width:'250rem',
              h4: {
                margin: '1rem',
                fontSize: ['1.5rem', '2.5rem'],
                paddingInlineStart: '0.5rem',
                color: 'white',
              },
            }}
          >
              <Header />
          </Container>
          {children}
        </Providers>
      </body>
    </html>
  );
}
