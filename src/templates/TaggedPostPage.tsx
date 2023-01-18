import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import React from 'react';
import { PagedPosts } from '../components/PagedPosts';
import { SEO } from '../components/SEO';
import { Layout } from '../Layout';
import { AllMarkdownRemark, markdownRemarkToPost } from '../types';

type PageContextProps = {
  tag: string;
  nextPageLink: string;
  previousPageLink: string;
};

type DataProps = {
  allMarkdownRemark: AllMarkdownRemark;
};

const TaggedPostPage = ({ pageContext, data }: PageProps<DataProps, PageContextProps>) => {
  const posts = data.allMarkdownRemark.nodes.map(node => markdownRemarkToPost(node));

  return (
    <Layout>
      <h2>Posts tagged '{pageContext.tag}'</h2>
      <PagedPosts
        posts={posts}
        previousPageLink={pageContext.previousPageLink}
        nextPageLink={pageContext.nextPageLink}
      />
    </Layout>
  );
};

export default TaggedPostPage;

export const Head: HeadFC<DataProps, PageContextProps> = ({ pageContext }: HeadProps<DataProps, PageContextProps>) => {
  return <SEO title={`Posts tagged '${pageContext.tag}'`} description={`Posts tagged '${pageContext.tag}'`} />;
};

export const pageQuery = graphql`
  query ($tag: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
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
