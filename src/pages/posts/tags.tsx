import { graphql, HeadFC, PageProps } from 'gatsby';
import React from 'react';
import { SEO } from '../../components/SEO';
import { Layout } from '../../Layout';

type Tags = {
  tags: {
    name: string;
    postCount: number;
  }[];
};

type DataProps = {
  allMarkdownRemark: {
    distinct: string[];
    nodes: {
      frontmatter: {
        tags: string[];
      };
    }[];
  };
};

const TagsList = ({ tags }: Tags) => {
  return (
    <div>
      {tags.map(tag => (
        <div>
          {tag.name} ({tag.postCount})
        </div>
      ))}
    </div>
  );
};

const TagsPage = ({ data }: PageProps<DataProps>) => {
  const { distinct, nodes } = data.allMarkdownRemark;
  const tags = distinct.map(tag => ({
    name: tag,
    postCount: nodes.reduce((acc, node) => {
      return node.frontmatter.tags.includes(tag) ? acc + 1 : acc;
    }, 0)
  }));

  return (
    <Layout>
      <TagsList tags={tags} />
    </Layout>
  );
};

export default TagsPage;

export const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { tags: { ne: null } } }) {
      distinct(field: { frontmatter: { tags: SELECT } })
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <SEO title="Tags" />;
