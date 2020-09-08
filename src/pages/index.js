import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'

import Bio from 'views/bio'
import Layout from 'components/layout'
import SEO from 'views/seo'
import { rhythm } from 'utils/typography'

import ArticleCard from 'components/article-card'

const PostTitle = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

const PostLink = styled(Link)`
  box-shadow: none;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug

        return (
          <ArticleCard>
            {title}
          </ArticleCard>
        )

        // const title = node.frontmatter.title || node.fields.slug
        // return (
        //   <article key={node.fields.slug}>
        //     <header>
        //       <PostTitle>
        //         <PostLink to={node.fields.slug}>
        //           {title}
        //         </PostLink>
        //       </PostTitle>
        //       <small>{node.frontmatter.date}</small>
        //     </header>
        //     <section>
        //       <p
        //         dangerouslySetInnerHTML={{
        //           __html: node.frontmatter.description || node.excerpt,
        //         }}
        //       />
        //     </section>
        //   </article>
        // )
      })}
      <Link to="/posts">All posts</Link>
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
          date(formatString: "DD MMM YYYY")
        }
        timeToRead
        excerpt
        fields {
          slug
        }
      }
    }
  }
  }
`
