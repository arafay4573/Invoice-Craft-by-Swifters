import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata: Metadata = {
  title: 'InvoiceCraft',
  description: 'Generate invoices with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex-grow">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
