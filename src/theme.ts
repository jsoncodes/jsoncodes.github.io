import { DefaultTheme } from "styled-components";

// https://colors.lol/beauish
export const green = '#47C072';
export const pink = '#FF0789';
export const orange = '#FCB005';

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
        mid: string;
        full: string;
      }
    }

    palette: {
      background: string;
      border: string;
      accent: string;
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
