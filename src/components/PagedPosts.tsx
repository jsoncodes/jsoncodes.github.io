import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Post } from '../types';
import { ArticleSummary } from './ArticleSummary';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Posts = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  overflow: auto;
  gap: 1em;
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
  previousPageLink?: string;
  nextPageLink?: string;
};

export const PagedPosts = ({ posts, previousPageLink, nextPageLink }: Props) => {
  return (
    <Root>
      <Posts>
        {posts.map(post => (
          <ArticleSummary key={post.id} variant="compact" {...post} />
        ))}
      </Posts>

      <Footer>
        {previousPageLink && <Link to={previousPageLink}>Previous</Link>}
        {nextPageLink && <Link to={nextPageLink}>Next</Link>}
      </Footer>
    </Root>
  );
};
