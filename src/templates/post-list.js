import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'

import Layout from 'components/layout'
import SEO from 'components/seo'
import { rhythm } from 'utils/typography'

const PostTitle = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`

const PostDatestamp = styled.p`
  display: block;
  margin-bottom: ${rhythm(1)};
`

const Divider = styled.hr`
  margin-bottom: ${rhythm(1)};
`

const NavigationLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const PostListTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { previousPageLink, nextPageLink } = pageContext
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} /> 

      {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return <div key={node.fields.slug}>{title}</div>
      })}

      {previousPageLink && <Link to={previousPageLink} rel="prev">Previous</Link>}
      {nextPageLink && <Link to={nextPageLink} rel="next">Next</Link>}
    </Layout>
  )
}

export default PostListTemplate

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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
