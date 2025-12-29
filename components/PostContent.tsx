'use client';

import styled from '@emotion/styled';
import { lighten, invert } from 'polished';
import { ReactNode } from 'react';
import { CoverImage } from '@/components/CoverImage';

const BlogPost = styled.article`
  font-size: 1.1em;
  max-width: 800px;
  margin: 0 auto;
`;

const CoverImageContainer = styled.div`
  margin-bottom: 0.75em;
`;

const PostCoverImage = styled(CoverImage)`
  min-height: 40vh;
  max-height: 60vh;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const CreditLink = styled.a`
  font-size: 0.8em;
  font-style: italic;
  float: right;
`;

const Title = styled.h1`
  margin-bottom: 0;
  font-size: 1.6em;
`;

const Subject = styled.h3`
  text-transform: uppercase;
  font-size: 1em;
  color: ${(props) => props.theme.palette.accent};
  margin-bottom: 0.5em;
`;

const DateStamp = styled.p`
  display: block;
  margin-bottom: 1em;
  color: ${(props) => lighten(0.5, props.theme.typography.color)};
`;

const Body = styled.section`
  h1,
  h2,
  h3 {
    margin-bottom: 0.75em;
  }

  pre {
    font-size: 14px;
  }

  blockquote {
    background: #eeeeee;
    margin: 0;
    margin-bottom: 1em;
    padding: 0.5em 1.5em;
    border-left: 3px solid ${(props) => props.theme.palette.accent};

    p:last-child {
      margin-bottom: 0;
    }
  }

  table {
    border-collapse: collapse;
    margin-bottom: 1em;

    thead {
      background: #13274f;
      color: ${(props) => invert(props.theme.typography.color)};
    }

    tr {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);

      &:last-child {
        border-bottom: none;
      }
    }

    tbody {
      tr:nth-of-type(even) {
        background: rgba(0, 0, 0, 0.05);
      }
    }

    th,
    td {
      padding: 0 4px;
    }
  }
`;

type Props = {
  title: string;
  subject: string;
  date: string;
  coverImage?: string;
  coverImageCredit?: string;
  coverImageCreditUrl?: string;
  children: ReactNode;
};

export function PostContent({
  title,
  subject,
  date,
  coverImage,
  coverImageCredit,
  coverImageCreditUrl,
  children
}: Props) {
  return (
    <BlogPost>
      <CoverImageContainer>
        <PostCoverImage altText={subject} coverImage={coverImage} />

        {coverImageCredit && coverImageCreditUrl && (
          <CreditLink href={coverImageCreditUrl} target="_blank">
            Image credit: {coverImageCredit}
          </CreditLink>
        )}
      </CoverImageContainer>

      <header>
        <Subject>{subject}</Subject>
        <Title>{title}</Title>
        <DateStamp>{date}</DateStamp>
      </header>

      <Body>{children}</Body>
    </BlogPost>
  );
}
