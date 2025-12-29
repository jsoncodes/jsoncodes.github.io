'use client';

import { ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import { defaultTheme } from './theme';
import { GlobalStyles } from './GlobalStyles';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
