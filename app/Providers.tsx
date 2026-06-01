'use client';

import { ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import { defaultTheme } from './theme';
import { GlobalStyles } from './GlobalStyles';
import { EmotionRegistry } from './EmotionRegistry';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </EmotionRegistry>
  );
}
