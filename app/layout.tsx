import React from 'react';
import '../src/index.css';

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
    <html lang="vi" data-theme="modern-light-glass" className="theme-modern-light-glass" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&family=Ubuntu:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio_theme') || localStorage.getItem('theme');
                  var pref = localStorage.getItem('portfolio_theme_pref');
                  var root = document.documentElement;
                  
                  var targetTheme = 'modern-light-glass';
                  if (saved === 'glass-dark-neon' || saved === 'theme-glass-dark-neon' || saved === 'dark' || saved === 'flat-dark') {
                    targetTheme = 'glass-dark-neon';
                  } else if (saved === 'modern-light-glass' || saved === 'theme-modern-light-glass' || saved === 'light' || saved === 'flat-light') {
                    targetTheme = 'modern-light-glass';
                  } else if (pref && ['glass-dark-neon', 'modern-light-glass'].indexOf(pref) !== -1) {
                    targetTheme = pref;
                  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    targetTheme = 'glass-dark-neon';
                  }

                  root.classList.remove(
                    'dark', 'theme-light', 'theme-glass-dark-neon', 'theme-modern-light-glass',
                    'theme-flat-light', 'theme-flat-dark', 'theme-dark', 'theme-bento-dark'
                  );
                  
                  root.setAttribute('data-theme', targetTheme);
                  if (targetTheme === 'glass-dark-neon') {
                    root.classList.add('dark', 'theme-glass-dark-neon');
                  } else {
                    root.classList.add('theme-modern-light-glass');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
