'use client';

import styled from '@emotion/styled';
import { Post } from '@/lib/types';
import { ArticleSummary } from './ArticleSummary';

const Root = styled.section`
  display: flex;
  gap: 2em;

  @media (${(props) => props.theme.layout.breakpoints.mid}) {
    flex-direction: column;
    gap: 0em;
  }
`;

const FixedColumn = styled.section`
  flex: 1;
  position: sticky;
  top: 0;
  align-self: flex-start;

  @media (${(props) => props.theme.layout.breakpoints.mid}) {
    position: static;
  }
`;

const ScrollingColumn = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-bottom: 1em;
`;

const RecentPostsTitle = styled.h3`
  font-size: 1.5em;

  @media (${(props) => props.theme.layout.breakpoints.mobile}) {
    display: none;
  }
`;

type PostsProps = {
  posts: Post[];
};

export function LatestPosts({ posts }: PostsProps) {
  return (
    <Root>
      <FixedColumn>
        <ArticleSummary {...posts[0]} variant="featured" />
      </FixedColumn>
      <ScrollingColumn>
        <RecentPostsTitle>Recent Posts</RecentPostsTitle>

        {posts.slice(1).map((post) => (
          <ArticleSummary key={post.id} {...post} variant="compact" />
        ))}
      </ScrollingColumn>
    </Root>
  );
}
