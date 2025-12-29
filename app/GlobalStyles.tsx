'use client';

import { Global, css, useTheme } from '@emotion/react';

export function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        html {
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: ${theme.typography.fontFamily};
          font-size: ${theme.typography.baselineFontSize};
          font-weight: 550;
          line-height: ${theme.typography.lineHeight};
          color: ${theme.typography.color};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          color: ${theme.typography.color};
        }

        html,
        body,
        #__next {
          height: 100%;
          overflow: hidden;
        }

        a {
          color: ${theme.palette.accent};

          &:hover {
            text-decoration: none;
          }
        }

        h1,
        h2,
        h3,
        h4 {
          padding: 0;
          margin: 0;
          font-weight: bold;
          font-family: ${theme.typography.headingFontFamily};
        }

        p {
          margin: 0;
          padding: 0;
          margin-bottom: 1em;
        }
      `}
    />
  );
}
