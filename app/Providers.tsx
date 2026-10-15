'use client';
import React from 'react';
import { LanguageProvider } from "../src/i18n";
import { BackgroundProvider } from "../src/context/BackgroundContext";
import { LayoutProvider } from "../src/context/LayoutContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import { NotificationProvider } from "../src/context/NotificationContext";
import { CursorProvider } from "../src/context/CursorContext";
import { SoundProvider } from "../src/context/SoundContext";
import { FooterProvider } from "../src/context/FooterContext";
import { HeaderProvider } from "../src/context/HeaderContext";
import ErrorBoundaryHandler from "../src/components/ErrorBoundaryHandler";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundaryHandler>
      <ThemeProvider>
        <NotificationProvider>
          <BackgroundProvider>
            <LayoutProvider>
              <LanguageProvider>
                <CursorProvider>
                  <SoundProvider>
                    <FooterProvider>
                      <HeaderProvider>
                        <ErrorBoundaryHandler>
                          {children}
                        </ErrorBoundaryHandler>
                      </HeaderProvider>
                    </FooterProvider>
                  </SoundProvider>
                </CursorProvider>
              </LanguageProvider>
            </LayoutProvider>
          </BackgroundProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundaryHandler>
  );
}
