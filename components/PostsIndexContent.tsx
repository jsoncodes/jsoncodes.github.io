'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import { LatestPosts } from '@/components/LatestPosts';
import type { Post } from '@/lib/types';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Body = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  flex: 0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5em;
  padding-bottom: 0.5em;
`;

type Props = {
  posts: Post[];
};

export function PostsIndexContent({ posts }: Props) {
  return (
    <Root>
      <Body>
        <LatestPosts posts={posts} />
      </Body>
      <Footer>
        <Link href="/posts/tags">Tags</Link>
        <Link href="/posts/1">More posts</Link>
      </Footer>
    </Root>
  );
}
