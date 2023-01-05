import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { ArticleSummary } from '../components/ArticleSummary';
import { SEO } from '../components/SEO';
import { Layout } from '../Layout';
import { AllMarkdownRemark, markdownRemarkToPost } from '../types';

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
`;

type PageContextProps = {
  nextPageLink: string;
  previousPageLink: string;
};

type DataProps = {
  allMarkdownRemark: AllMarkdownRemark;
};

const PostListsPage = ({ pageContext, data }: PageProps<DataProps, PageContextProps>) => {
  console.log(pageContext);
  const posts = data.allMarkdownRemark.nodes.map(node => markdownRemarkToPost(node));

  return (
    <Layout>
      <Root>
        <Posts>
          {posts.map(post => (
            <ArticleSummary key={post.id} variant="compact" {...post} />
          ))}
        </Posts>

        <Footer>
          {pageContext.previousPageLink && <Link to={pageContext.previousPageLink}>Previous</Link>}
          {pageContext.nextPageLink && <Link to={pageContext.nextPageLink}>Next</Link>}
        </Footer>
      </Root>
    </Layout>
  );
};

export default PostListsPage;

export const Head: HeadFC = () => <SEO title="Posts" />;

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
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
              gatsbyImageData(width: 200, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
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
