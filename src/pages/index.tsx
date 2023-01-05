import React from 'react';
import { HeadFC, PageProps, graphql, Link } from 'gatsby';
import { Layout } from '../Layout';
import { SEO } from '../components/SEO';
import { AllMarkdownRemark } from '../types';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { ArticleSummary } from '../components/ArticleSummary';
import { lighten } from 'polished';
import { Icon } from '../components/Icon';
import { github, linkedin, mastodon } from '../icons';

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
  flex: 1;

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
  padding: 0.5em 0;

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
  flex: 0;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;

  @media (${props => props.theme.layout.breakpoints.mobile}) {
    .gatsby-image-wrapper {
      display: none;
    }
  }
`;

const LatestPostTitle = styled.h3`
  font-size: 1.3em;
  color: ${props => lighten(0.5, props.theme.typography.color)};
`;

type DataProps = {
  site: {
    siteMetadata: {
      social: {
        mastodon: string;
        linkedin: string;
        github: string;
      };
    };
  };
  latestPost: AllMarkdownRemark;
};

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const social = data.site.siteMetadata.social;
  const node = data.latestPost.nodes[0];
  const post = {
    title: node.frontmatter.title,
    subject: node.frontmatter.subject,
    excerpt: node.excerpt,
    date: node.frontmatter.date,
    id: node.id,
    coverImage: node.frontmatter.coverImage,
    link: `posts/${node.frontmatter.slug}`
  };

  return (
    <Layout>
      <Body>
        <StaticImage
          src="../images/profile.jpg"
          alt="Jason Mitchell Profile"
          placeholder="blurred"
          layout="constrained"
          height={200}
          aspectRatio={1}
          style={{ borderRadius: '50%' }}
        />

        <Summary>
          <p>Hi, I'm Jason</p>
          <p>I like to write about and share my ideas and experiences in software design, development, and delivery.</p>

          <Social>
            <a href={social.github} target="_blank" rel="noopener noreferrer">
              <Icon icon={github} />
            </a>

            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <Icon icon={linkedin} />
            </a>

            <a href={social.mastodon} target="_blank" rel="noopener noreferrer">
              <Icon icon={mastodon} />
            </a>
          </Social>
        </Summary>

        <LatestPost>
          <LatestPostTitle>Latest post</LatestPostTitle>
          <ArticleSummary variant="compact" {...post} />
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
          mastodon
          linkedin
          github
        }
      }
    }
    latestPost: allMarkdownRemark(limit: 1, sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "DD MMM YYYY")
          title
          subject
          slug
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
