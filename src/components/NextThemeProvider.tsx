'use client';

import * as React from 'react';

export interface NextThemeProviderProps {
  children: React.ReactNode;
  [key: string]: any;
}

export function NextThemeProvider({ children }: NextThemeProviderProps) {
  return <>{children}</>;
}

export default NextThemeProvider;
