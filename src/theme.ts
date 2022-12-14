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
    lineHeight: '1.6',
    color: '#000000',
    fontFamily: `'EB Garamond', Arial, 'san-serif'`,
    headingFontFamily: `Georgia, 'Times New Roman', Times, serif`
  },

  layout: {
    maxWidth: '1024px'
  },

  palette: {
    background: '#ffffff',
    border: '#cccccc'
  }
};
