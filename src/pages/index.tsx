import React from 'react';
import { HeadFC, PageProps, graphql } from 'gatsby';
import { Layout } from '../Layout';
import { LatestPosts, Post } from '../components/LatestPosts';
import { ImageDataLike } from 'gatsby-plugin-image';

type DataProps = {
  allMdx: {
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
};

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const posts: Post[] = data.allMdx.nodes.map(node => ({
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
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          subject
          coverImage {
            childImageSharp {
              gatsbyImageData(
                width: 200
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
  }
`;

export const Head: HeadFC = () => <title>Home Page</title>;
