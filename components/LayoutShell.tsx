'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Header } from './Header';

const Root = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.section`
  flex: 1;
  overflow: auto;
`;

const Content = styled.div`
  height: 100%;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 auto;

  @media (${(props) => props.theme.layout.breakpoints.full}) {
    padding: 0 2em;
  }
`;

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <Root>
      <Header />
      <Body>
        <Content>{children}</Content>
      </Body>
    </Root>
  );
}
