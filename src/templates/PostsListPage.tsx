import { graphql, HeadFC, PageProps } from 'gatsby';
import React from 'react';
import { PagedPosts } from '../components/PagedPosts';
import { SEO } from '../components/SEO';
import { Layout } from '../Layout';
import { AllMarkdownRemark, markdownRemarkToPost } from '../types';

type PageContextProps = {
  nextPageLink: string;
  previousPageLink: string;
};

type DataProps = {
  allMarkdownRemark: AllMarkdownRemark;
};

const PostListsPage = ({ pageContext, data }: PageProps<DataProps, PageContextProps>) => {
  const posts = data.allMarkdownRemark.nodes.map(node => markdownRemarkToPost(node));

  return (
    <Layout>
      <h2>All Posts</h2>
      <PagedPosts
        posts={posts}
        previousPageLink={pageContext.previousPageLink}
        nextPageLink={pageContext.nextPageLink}
      />
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
