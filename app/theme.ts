import '@emotion/react';

export const green = '#47C072';
export const pink = '#FF0789';
export const orange = '#FCB005';

export interface AppTheme {
  typography: {
    baselineFontSize: string;
    lineHeight: string;
    color: string;
    fontFamily: string;
    headingFontFamily: string;
  };
  layout: {
    maxWidth: string;
    breakpoints: {
      mobile: string;
      mid: string;
      full: string;
    };
  };
  palette: {
    background: string;
    border: string;
    accent: string;
  };
}

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}

export const defaultTheme: AppTheme = {
  typography: {
    baselineFontSize: '16px',
    lineHeight: '1.6',
    color: '#000000',
    fontFamily: `'Source Sans 3', 'EB Garamond', Arial, sans-serif`,
    headingFontFamily: `'Source Sans 3', 'EB Garamond', Arial, sans-serif`
  },
  layout: {
    maxWidth: '1280px',
    breakpoints: {
      mobile: 'max-width: 460px',
      mid: 'max-width: 800px',
      full: 'max-width: 1300px'
    }
  },
  palette: {
    background: '#ffffff',
    border: '#cccccc',
    accent: pink
  }
};
