import React from 'react';
import { HeadFC, PageProps, graphql } from 'gatsby';
import { Layout } from '../Layout';
import { LatestPosts } from '../components/LatestPosts';
import { ImageDataLike } from 'gatsby-plugin-image';

type AllMdx = {
  nodes: {
    frontmatter: {
      date: string;
      title: string;
      subject: string;
      coverImage: ImageDataLike;
    };
    excerpt: string;
    id: string;
  }[];
};

type DataProps = {
  latestPost: AllMdx;
  recentPosts: AllMdx;
};

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const allPosts = [data.latestPost.nodes[0], ...data.recentPosts.nodes];
  const posts = allPosts.map(node => ({
    title: node.frontmatter.title,
    subject: node.frontmatter.subject,
    excerpt: node.excerpt,
    date: node.frontmatter.date,
    id: node.id,
    coverImage: node.frontmatter.coverImage
  }));

  return (
    <Layout>
      <LatestPosts posts={posts} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    latestPost: allMdx(limit: 1, sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "DD MMM YYYY")
          title
          subject
          coverImage {
            childImageSharp {
              gatsbyImageData(
                width: 640
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          coverImageCredit
          coverImageCreditUrl
        }
        excerpt(pruneLength: 250)
        id
      }
    }
    recentPosts: allMdx(
      skip: 1
      limit: 10
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "DD MMM YYYY")
          title
          subject
          coverImage {
            childImageSharp {
              gatsbyImageData(
                width: 300
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
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

export const Head: HeadFC = () => <title>Home Page</title>;
