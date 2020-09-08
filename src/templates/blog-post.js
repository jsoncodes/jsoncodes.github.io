import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'

import Bio from 'views/bio'
import Layout from 'components/layout'
import SEO from 'views/seo'
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

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <PostTitle>
            {post.frontmatter.title}
          </PostTitle>
          <PostDatestamp>
            {post.frontmatter.date}
          </PostDatestamp>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <Divider />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <NavigationLinks>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </NavigationLinks>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
