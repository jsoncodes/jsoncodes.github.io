import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../Layout';

const BlogPost = styled.article`
  max-width: 1000px;
  margin: 0 auto;
  font-size: 1.1em;
`;

type MarkdownRemark = {
  html: string;
};

type DataProps = {
  markdownRemark: MarkdownRemark;
};

const MarkdownPage = (props: PageProps<DataProps>) => {
  return (
    <Layout>
      <BlogPost
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      />
    </Layout>
  );
};

export default MarkdownPage;

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
    }
  }
`;

// export const Head: HeadFC = (props: HeadProps) => {
//   console.log(props);
//   return <title>Home Page</title>;
// };
