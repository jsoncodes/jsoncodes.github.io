const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000, sort: {frontmatter: {date: DESC}}) {
          nodes {
            id
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.nodes

  const postsPerPage = 20
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    const currentPage = i + 1;
    const previousPage = currentPage > 1 ? currentPage - 1 : undefined;
    const nextPage = currentPage < numPages ? currentPage + 1 : undefined;

    let previousPageLink;
    if (previousPage !== undefined) {
      previousPageLink = `/posts/${previousPage}`;
    }

    let nextPageLink;
    if (nextPage !== undefined) {
      nextPageLink = `/posts/${nextPage}`;
    }

    createPage({
      path: `/posts/${currentPage}`,
      component: path.resolve("./src/templates/PostsListPage.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: currentPage,
        previousPageLink: previousPageLink,
        nextPageLink: nextPageLink
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
