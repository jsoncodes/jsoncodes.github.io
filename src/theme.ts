import { DefaultTheme } from "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: {
      baselineFontSize: string;
      lineHeight: string;
      color: string;
      fontFamily: string;
      headingFontFamily: string;
    }

    layout: {
      maxWidth: string;
      breakpoints: {
        mobile: string;
        full: string;
      }
    }

    palette: {
      background: string;
      border: string;
    }
  }
}

export const defaultTheme: DefaultTheme = {
  typography: {
    baselineFontSize: '16px',
    lineHeight: '1.4',
    color: '#000000',
    fontFamily: `'Source Sans Pro', 'EB Garamond', Arial, 'san-serif'`,
    headingFontFamily: `'Source Sans Pro', 'EB Garamond', Arial, 'san-serif'`
  },

  layout: {
    maxWidth: '1280px',
    breakpoints: {
      mobile: 'max-width: 800px',
      full: 'max-width: 1300px'
    }
  },

  palette: {
    background: '#ffffff',
    border: '#cccccc'
  }
};
