'use client';

import React from 'react';
import { LanguageProvider } from "../i18n";
import { BackgroundProvider } from "../context/BackgroundContext";
import { LayoutProvider } from "../context/LayoutContext";
import { ThemeProvider } from "../context/ThemeContext";
import { NotificationProvider } from "../context/NotificationContext";
import { CursorProvider } from "../context/CursorContext";
import { SoundProvider } from "../context/SoundContext";
import { FooterProvider } from "../context/FooterContext";
import { HeaderProvider } from "../context/HeaderContext";
import ErrorBoundaryHandler from "./ErrorBoundaryHandler";

export function Providers({ children }: { children: React.ReactNode }) {
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
