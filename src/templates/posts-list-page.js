import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import SEO from 'components/seo'
import PostsGrid from 'components/posts-grid'
import { ButtonLink } from 'components/buttons'

const Footer = styled.footer`
  text-align: right;
`

const Pagination = ({previousPageLink, nextPageLink}) => {
  return (
    <Footer>
      {previousPageLink && <ButtonLink to={previousPageLink} rel="prev">← Previous</ButtonLink>}
      {nextPageLink && <ButtonLink to={nextPageLink} rel="next">Next →</ButtonLink>}
    </Footer>
  )
}

const PostsPageTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { previousPageLink, nextPageLink } = pageContext
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All Posts" />

      <PostsGrid title="All Posts" posts={posts} />
      {(previousPageLink || nextPageLink) && <Pagination {...pageContext} />}
    </Layout>
  )
}

export default PostsPageTemplate

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
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
          frontmatter {
            title
            description
            subject
            date(formatString: "DD MMM YYYY")
            coverImage {
              childImageSharp {
                fixed(width: 400, height: 175, fit: COVER, cropFocus: CENTER) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          timeToRead
          excerpt(format: PLAIN)
          fields {
            slug
          }
        }
      }
    }
  }
`
