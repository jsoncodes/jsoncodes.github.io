import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import { invert } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { SEO } from '../../../components/SEO';
import { Layout } from '../../../Layout';

type Tag = {
  name: string;
  postCount: number;
};

type Tags = {
  tags: Tag[];
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

const BadgeLink = styled(Link)`
  text-decoration: none;
`;

const Badge = styled.div`
  background: ${props => props.theme.palette.accent};
  color: ${props => props.theme.typography.color};
  border-radius: 1em;
  padding: 0 0.5em;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const PostCount = styled.div`
  background-color: ${props => invert(props.theme.typography.color)};
  margin: 0.25em 0;
  margin-left: 0.25em;
  border-radius: 50%;
  width: 26px;
  height: 26px;
`;

const TagBadge = ({ name, postCount }: Tag) => {
  return (
    <BadgeLink to={`/posts/tags/${name}`}>
      <Badge>
        {name} <PostCount>{postCount}</PostCount>
      </Badge>
    </BadgeLink>
  );
};

const TagsListRoot = styled.div`
  max-width: 50vw;
  margin: 0 auto;
  text-align: center;
`;

const TagsRoot = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: center;
  padding: 1em 0;
`;

const TagsList = ({ tags }: Tags) => {
  return (
    <TagsListRoot>
      <h2>Post Tags</h2>
      <TagsRoot>
        {tags.map(tag => (
          <TagBadge key={tag.name} {...tag} />
        ))}
      </TagsRoot>
    </TagsListRoot>
  );
};

const TagsIndexPage = ({ data }: PageProps<DataProps>) => {
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

export default TagsIndexPage;

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

export const Head: HeadFC = () => <SEO title="Post Tags" />;
