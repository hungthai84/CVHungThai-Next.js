import React from 'react';
import '../src/index.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Nguyễn Hùng Thái — Customer Experience & Service Leader',
  description: 'Portfolio tương tác của Nguyễn Hùng Thái: hành trình nghề nghiệp, năng lực Customer Experience, Contact Center và chuyển đổi số.',
  openGraph: {
    title: 'Nguyễn Hùng Thái — Customer Experience & Service Leader',
    description: 'Khám phá hành trình nghề nghiệp, các dự án và định hướng CX 2026+ của Nguyễn Hùng Thái.',
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
        <link key="fonts-stylesheet" href="https://fonts.googleapis.com/css2?family=Play:wght@400;500;600;700&subset=latin,vietnamese&display=swap" rel="stylesheet" />
        <link key="fontawesome" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body suppressHydrationWarning>
          {children}
      </body>
    </html>
  );
}
