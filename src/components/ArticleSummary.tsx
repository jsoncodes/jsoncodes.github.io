import { Link } from 'gatsby';
import { ImageDataLike } from 'gatsby-plugin-image';
import { lighten } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { CoverImage } from './CoverImage';

const FeaturedRoot = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FeaturedCoverImage = styled(CoverImage)`
  flex: 1;
  margin-bottom: 1em;
`;

const CompactRoot = styled.article`
  display: flex;
  gap: 1em;

  @media (${props => props.theme.layout.breakpoints.mobile}) {
    flex: 1;
    flex-direction: column;
    gap: 0;
    margin-top: 1em;
  }
`;

const ArticleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CompactCoverImage = styled(CoverImage)`
  width: 25%;
  min-width: 120px;
  min-height: 120px;

  @media (${props => props.theme.layout.breakpoints.mobile}) {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const ArticleContent = styled.div`
  flex: 1;
`;

const ArticleTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 0.5rem;
`;

const FeaturedArticleTitle = styled(ArticleTitle)`
  font-size: 2em;
  margin-bottom: 1rem;
`;

const ArticleCategory = styled.h4`
  text-transform: uppercase;
  color: ${props => props.theme.palette.accent};
  font-size: 0.9em;
`;

const ArticleDate = styled.p`
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: bold;
  color: ${props => lighten(0.5, props.theme.typography.color)};
  margin: 0;
`;

const FeaturedExcerpt = styled.p`
  font-size: 1.2em;
`;

type ArticleVariant = 'featured' | 'compact';

export type Post = {
  title: string;
  subject: string;
  excerpt: string;
  date: string;
  id: string;
  coverImage: ImageDataLike;
  link: string;
};

type ArticleProps = Post & {
  variant: ArticleVariant;
};

const CompactArticleSummary = ({
  title,
  subject,
  date,
  coverImage,
  link
}: Post) => {
  return (
    <ArticleLink to={link}>
      <CompactRoot>
        <CompactCoverImage coverImage={coverImage} altText={title} />
        <ArticleContent>
          <ArticleCategory>{subject}</ArticleCategory>
          <ArticleTitle>{title}</ArticleTitle>
          <ArticleDate>on {date}</ArticleDate>
        </ArticleContent>
      </CompactRoot>
    </ArticleLink>
  );
};

const FeaturedArticleSummary = ({
  title,
  subject,
  excerpt,
  date,
  coverImage,
  link
}: Post) => {
  return (
    <ArticleLink to={link}>
      <FeaturedRoot>
        <FeaturedCoverImage coverImage={coverImage} altText={title} />
        <ArticleContent>
          <ArticleCategory>{subject}</ArticleCategory>
          <FeaturedArticleTitle>{title}</FeaturedArticleTitle>
          <FeaturedExcerpt>{excerpt}</FeaturedExcerpt>
          <ArticleDate>on {date}</ArticleDate>
        </ArticleContent>
      </FeaturedRoot>
    </ArticleLink>
  );
};

export const ArticleSummary = ({ variant, ...props }: ArticleProps) => {
  if (variant === 'compact') {
    return <CompactArticleSummary {...props} />;
  }

  return <FeaturedArticleSummary {...props} />;
};
