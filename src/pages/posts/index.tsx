import React from 'react';
import { HeadFC, PageProps, graphql, Link } from 'gatsby';
import { Layout } from '../../Layout';
import { LatestPosts } from '../../components/LatestPosts';
import { SEO } from '../../components/SEO';
import { AllMarkdownRemark, markdownRemarkToPost } from '../../types';
import styled from 'styled-components';

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

type DataProps = {
  latestPost: AllMarkdownRemark;
  recentPosts: AllMarkdownRemark;
};

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const allPosts = [data.latestPost.nodes[0], ...data.recentPosts.nodes];
  const posts = allPosts.map(node => markdownRemarkToPost(node));

  return (
    <Layout>
      <Root>
        <Body>
          <LatestPosts posts={posts} />
        </Body>
        <Footer>
          <Link to="/posts/tags">Tags</Link>
          <Link to="/posts/1">More posts</Link>
        </Footer>
      </Root>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
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
    recentPosts: allMarkdownRemark(skip: 1, limit: 9, sort: { frontmatter: { date: DESC } }) {
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
              gatsbyImageData(width: 300, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          coverImageCredit
          coverImageCreditUrl
        }
        id
      }
    }
  }
`;

export const Head: HeadFC = () => <SEO title="Posts" />;
