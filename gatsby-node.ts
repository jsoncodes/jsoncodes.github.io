import { createTaggedPages } from "./scripts/post-pages";

const { createFilePath } = require('gatsby-source-filesystem');
const { createNumberedPages } = require('./scripts/post-pages');

exports.createPages = async ({ graphql, actions }) => {
  await createNumberedPages({ graphql, actions });
  await createTaggedPages({ graphql, actions });
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
