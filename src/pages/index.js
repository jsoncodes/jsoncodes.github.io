import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Bio from 'components/bio'
import Layout from 'components/layout'
import SEO from 'components/seo'
import PostsGrid from 'components/posts-grid'
import { ButtonLink } from 'components/buttons'

const PostsFooter = styled.footer`
  text-align: right;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      {/* <Bio /> */}
      <PostsGrid title="Recent Posts" posts={posts} />
      <PostsFooter>
        <ButtonLink to="/posts">More Posts →</ButtonLink>
      </PostsFooter>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 6) {
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
