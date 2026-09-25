import React from 'react';
import '../src/index.css';
import { NextThemeProvider } from '../src/components/NextThemeProvider';

export const metadata = {
  title: 'Remix Nguyễn Hùng Thái Portfolio - React - Đẩy Github',
  description: 'Portfolio & Thư ngỏ của Nguyễn Hùng Thái - Chuyên gia & Trưởng phòng Chăm sóc Khách hàng (Customer Experience & Customer Service Leader)',
  openGraph: {
    title: 'Remix Nguyễn Hùng Thái Portfolio - React - Đẩy Github',
    description: 'Portfolio & Thư ngỏ của Nguyễn Hùng Thái - Chuyên gia & Trưởng phòng Chăm sóc Khách hàng (Customer Experience & Customer Service Leader)',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&subset=latin,vietnamese&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <NextThemeProvider>
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
