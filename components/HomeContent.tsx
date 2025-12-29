'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import { lighten } from 'polished';
import { ArticleSummary } from '@/components/ArticleSummary';
import { Icon } from '@/components/Icon';
import { github, linkedin, bluesky } from '@/lib/icons';
import type { Post } from '@/lib/types';

const Body = styled.section`
  padding: 1em;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`;

const Summary = styled.div`
  p {
    text-align: center;
    font-size: 1.1em;
    margin-bottom: 0;

    &:first-of-type {
      font-size: 1.5em;
    }
  }
`;

const Social = styled.nav`
  display: flex;
  justify-content: center;
  gap: 0.75em;
  font-size: 1.5em;
  padding: 0;

  a {
    color: ${(props) => props.theme.typography.color};
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.palette.accent};
      scale: 1.1;
    }
  }
`;

const LatestPost = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
`;

const LatestPostTitle = styled.h3`
  font-size: 1.3em;
  color: ${(props) => lighten(0.5, props.theme.typography.color)};
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
`;

type Props = {
  latestPost: Post | null;
  social: {
    linkedin: string;
    github: string;
    bsky: string;
  };
};

export function HomeContent({ latestPost, social }: Props) {
  return (
    <Body>
      <ImageWrapper>
        <Image
          src="/images/profile.jpg"
          alt="Jason Mitchell Profile"
          width={200}
          height={200}
          style={{ borderRadius: '50%' }}
          priority
        />
      </ImageWrapper>

      <Summary>
        <Social>
          <a href={social.github} target="_blank" rel="noopener noreferrer" title="Github">
            <Icon icon={github} />
          </a>

          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Icon icon={linkedin} />
          </a>

          <a href={social.bsky} target="_blank" rel="noopener noreferrer" title="Bluesky">
            <Icon icon={bluesky} />
          </a>
        </Social>
      </Summary>

      {latestPost && (
        <LatestPost>
          <LatestPostTitle>Latest post</LatestPostTitle>
          <ArticleSummary variant="featured" {...latestPost} />
        </LatestPost>
      )}
    </Body>
  );
}
