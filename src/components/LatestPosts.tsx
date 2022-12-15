import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';

const Root = styled.section`
  display: flex;
  gap: 1em;

  @media (${props => props.theme.layout.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0em;
  }
`;

const FixedColumn = styled.article`
  flex: 1;
  position: sticky;
  top: 0;
  align-self: flex-start;

  @media (${props => props.theme.layout.breakpoints.mobile}) {
    position: static;
  }
`;

const ScrollingColumn = styled.section`
  flex: 1;
`;

export type Post = {
  title: string;
  subject: string;
  excerpt: string;
  date: string;
  id: string;
  coverImage: ImageDataLike;
};

type PostsProps = {
  posts: Post[];
};

const Article = (props: Post) => {
  const image = getImage(props.coverImage!);

  return (
    <article>
      {image && <GatsbyImage image={image} alt={props.title} />}
      <h4>{props.subject}</h4>
      <h3>{props.title}</h3>
      <p>{props.excerpt}</p>
      <p>{props.date}</p>
    </article>
  );
};

const FeaturedArticle = (props: Post) => {
  return <Article {...props} />;
};

const RecentArticle = (props: Post) => {
  return <Article {...props} />;
};

export const LatestPosts = ({ posts }: PostsProps) => {
  return (
    <Root>
      <FixedColumn>
        <FeaturedArticle {...posts[0]} />
      </FixedColumn>
      <ScrollingColumn>
        <h2>Recent Posts</h2>

        {posts.slice(1).map(post => (
          <RecentArticle key={post.id} {...post} />
        ))}
      </ScrollingColumn>
    </Root>
  );
};
