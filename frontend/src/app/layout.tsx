
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>ShishuCare</title>
      <body suppressHydrationWarning={true} style={{ padding: 0, margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
