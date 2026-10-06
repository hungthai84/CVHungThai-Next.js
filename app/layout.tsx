import React from 'react';
import '../src/index.css';

export const dynamic = 'force-dynamic';

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
        <link key="fonts-preconnect-1" rel="preconnect" href="https://fonts.googleapis.com" />
        <link key="fonts-preconnect-2" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link key="fonts-stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Play:wght@400;500;600;700&subset=latin,vietnamese&display=swap" rel="stylesheet" />
        <link key="fontawesome" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body suppressHydrationWarning>
          {children}
      </body>
    </html>
  );
}
