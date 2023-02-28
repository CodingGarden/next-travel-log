import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Travel Log',
  description: 'Keep track of all the places you have been',
  viewport: 'width=device-width, initial-scale=1, user-scalable=no',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
}
