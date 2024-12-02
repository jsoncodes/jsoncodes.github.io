import React from 'react';
import { HeadFC, PageProps, graphql } from 'gatsby';
import { Layout } from '../Layout';
import { SEO } from '../components/SEO';
import { AllMarkdownRemark, markdownRemarkToPost } from '../types';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { ArticleSummary } from '../components/ArticleSummary';
import { lighten } from 'polished';
import { Icon } from '../components/Icon';
import { github, linkedin, bluesky } from '../icons';

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

    &:first-child {
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
    color: ${props => props.theme.typography.color};
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${props => props.theme.palette.accent};
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
  color: ${props => lighten(0.5, props.theme.typography.color)};
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
`;

type DataProps = {
  site: {
    siteMetadata: {
      social: {
        linkedin: string;
        github: string;
        bsky: string;
      };
    };
  };
  latestPost: AllMarkdownRemark;
};

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const social = data.site.siteMetadata.social;
  const node = data.latestPost.nodes[0];
  const post = markdownRemarkToPost(node);

  return (
    <Layout>
      <Body>
        <ImageWrapper>
          <StaticImage
            src="../images/profile.jpg"
            alt="Jason Mitchell Profile"
            placeholder="blurred"
            layout="constrained"
            height={200}
            width={200}
            style={{ borderRadius: '50%' }}
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

        <LatestPost>
          <LatestPostTitle>Latest post</LatestPostTitle>
          <ArticleSummary variant="featured" {...post} />
        </LatestPost>
      </Body>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site: site {
      siteMetadata {
        social {
          linkedin
          github
          bsky
        }
      }
    }
    latestPost: allMarkdownRemark(limit: 1, sort: { frontmatter: { date: DESC } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMM YYYY")
          title
          subject
          coverImage {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          coverImageCredit
          coverImageCreditUrl
        }
        excerpt(pruneLength: 250)
        id
      }
    }
  }
`;

export const Head: HeadFC = () => <SEO />;
