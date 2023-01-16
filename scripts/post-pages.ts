import { Page } from 'gatsby';
import path from 'path';

export const createNumberedPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
      query {
        allMarkdownRemark(limit: 1000, sort: {frontmatter: {date: DESC}}) {
          nodes {
            id
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.nodes
  await createPagesForResults({
    resultCount: posts.length,
    createPage,
    pathPrefix: '/posts',
    createIndex: false,
    component: './src/templates/PostsListPage.tsx'
  });
};

export const createTaggedPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { tags: { ne: null } } }) {
        distinct(field: { frontmatter: { tags: SELECT } })
      }
    }
  `);

  if (result.errors) {
    throw result.errors
  }

  const tags = result.data.allMarkdownRemark.distinct;

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const tagResult = await graphql(`
      query {
        allMarkdownRemark(
          filter: {frontmatter: {tags: {in: "${tag}"}}}
          sort: {frontmatter: {date: DESC}}
        ) {
          nodes {
            id
          }
        }
      }
    `);

    if (tagResult.errors) {
      throw tagResult.errors
    }

    await createPagesForResults({
      resultCount: tagResult.data.allMarkdownRemark.nodes.length,
      createPage,
      pathPrefix: `/posts/tags/${tag}`,
      createIndex: true,
      component: './src/templates/TaggedPostPage.tsx',
      context: {
        tag: tag
      }
    });
  }
};

type PagedResultsProps = {
  resultCount: number;
  createPage: any;
  pathPrefix: string;
  createIndex: boolean;
  component: string;
  context?: object;
}

const createPagesForResults = async ({resultCount, createPage, pathPrefix, createIndex, component, context}: PagedResultsProps) => {
  const postsPerPage = 20

  const numPages = Math.ceil(resultCount / postsPerPage)
  for (let i = 0; i < numPages; i++) {
    const currentPage = i + 1;
    const previousPage = currentPage > 1 ? currentPage - 1 : undefined;
    const nextPage = currentPage < numPages ? currentPage + 1 : undefined;

    let previousPageLink;
    if (previousPage === 1 && createIndex === true) {
      previousPageLink = pathPrefix;
    } else if (previousPage !== undefined) {
      previousPageLink = `${pathPrefix}/${previousPage}`;
    }

    let nextPageLink;
    if (nextPage !== undefined) {
      nextPageLink = `${pathPrefix}/${nextPage}`;
    }

    await createPage({
      path: i === 0 && createIndex ? pathPrefix : `${pathPrefix}/${currentPage}`,
      component: path.resolve(component),
      context: {
        ...context,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: currentPage,
        previousPageLink: previousPageLink,
        nextPageLink: nextPageLink
      },
    })
  }
};
