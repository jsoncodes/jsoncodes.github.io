'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import { ProfileImage } from './ProfileImage';

const HeadingRoot = styled.header`
  flex: 0;
  display: flex;
  gap: 0.5em;
  width: 100%;
  align-items: center;
  padding: 1em 0;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 auto;

  @media (${(props) => props.theme.layout.breakpoints.full}) {
    padding: 1em 2em;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const HeadingLink = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  color: ${(props) => props.theme.typography.color};
`;

const Navigation = styled.nav`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export function Header() {
  return (
    <HeadingRoot>
      <ProfileImage />
      <HeadingLink href="/">
        <Title>Jason Mitchell</Title>
      </HeadingLink>
      <Navigation>
        <HeadingLink href="/posts">Posts</HeadingLink>
      </Navigation>
    </HeadingRoot>
  );
}
