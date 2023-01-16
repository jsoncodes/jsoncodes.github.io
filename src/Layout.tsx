import { Link } from 'gatsby';
import { lighten } from 'polished';
import React, { ReactNode } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { ProfileImage } from './components/ProfileImage';
import { GlobalStyle } from './GlobalStyle';
import { defaultTheme } from './theme';

const Root = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1em;
`;

const constrained = css`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
`;

const HeadingRoot = styled.header`
  flex: 0;
  display: flex;
  gap: 0.5em;
  width: 100%;
  align-items: center;
  padding: 1em 0;
  ${constrained}

  @media (${props => props.theme.layout.breakpoints.full}) {
    padding: 1em 2em;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const HeadingLink = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  color: ${props => props.theme.typography.color};
`;

const Navigation = styled.nav`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Body = styled.section`
  flex: 1;
  overflow: auto;
`;

const Content = styled.div`
  height: 100%;
  ${constrained}

  @media (${props => props.theme.layout.breakpoints.full}) {
    padding: 0 2em;
  }
`;

const Heading = () => {
  return (
    <HeadingRoot>
      <ProfileImage />
      <HeadingLink to="/">
        <Title>Jason Mitchell</Title>
      </HeadingLink>
      <Navigation>
        <HeadingLink to="/posts">Posts</HeadingLink>
      </Navigation>
    </HeadingRoot>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <Root>
        <Heading />
        <Body>
          <Content>{children}</Content>
        </Body>
      </Root>
    </ThemeProvider>
  );
};
