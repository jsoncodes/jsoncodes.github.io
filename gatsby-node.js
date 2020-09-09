const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    const currentPage = i + 1;
    const previousPage = currentPage > 1 ? currentPage - 1 : undefined;
    const nextPage = currentPage < numPages ? currentPage + 1 : undefined;

    let previousPageLink;
    if (previousPage === 1) {
      previousPageLink = '/posts';
    } else if (previousPage !== undefined) {
      previousPageLink = `/posts/${previousPage}`;
    }

    let nextPageLink;
    if (nextPage !== undefined) {
      nextPageLink = `/posts/${nextPage}`;
    }

    createPage({
      path: i === 0 ? `/posts` : `/posts/${currentPage}`,
      component: path.resolve("./src/templates/posts-page.js"),
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
