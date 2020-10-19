import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import SEO from 'components/seo'
import {ButtonLink} from 'components/buttons'
import {subtle} from 'utils/palette'

const CoverImageContainer = styled.div`
  margin-bottom: 0.75em;
`;

const CoverImage = styled.img`
  max-width: 100%;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const CreditLink = styled.a`
  font-size: 0.75rem;
  line-height: 0.75rem;
  font-style: italic;
  float: right;
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

const Subject = styled.h3`
  text-transform: uppercase;
  font-size: 1em;
  color: ${subtle};
  margin-bottom: 0.5em;
`;

const DateStamp = styled.p`
  display: block;
  margin-bottom: 1em;
  color: ${subtle};
`

const Body = styled.section`
  h1, h2, h3 {
    margin-bottom: 0.75em;
  }

  pre {
    font-size: 14px;
  }
`

const Footer = styled.footer`
  display: flex;
`

const AllPostsWrapper = styled.div`
  flex: 1;
`

const NavigationLinks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  flex: 0;
`

const NavigationLink = styled(ButtonLink)`
  margin-left: 1em;
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const coverImage = post.frontmatter.coverImage
  const {coverImageCredit, coverImageCreditUrl} = post.frontmatter

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title}
           description={post.frontmatter.description || post.excerpt} />
      <article>

        {coverImage && (
          <CoverImageContainer>
            <CoverImage src={coverImage.childImageSharp.fixed.src} alt={post.frontmatter.title} />

            {coverImageCredit && (
              <CreditLink href={coverImageCreditUrl} alt={coverImageCredit} target="_blank">
                Image credit: {coverImageCredit}
              </CreditLink>
            )}
          </CoverImageContainer>
        )}

        <header>
          <Subject>{post.frontmatter.subject}</Subject>
          <Title>{post.frontmatter.title}</Title>
          <DateStamp>{post.frontmatter.date}</DateStamp>
        </header>

        <Body dangerouslySetInnerHTML={{ __html: post.html }} />

        <Footer>
          <AllPostsWrapper>
            <ButtonLink to="/posts">All Posts</ButtonLink>
          </AllPostsWrapper>

          <NavigationLinks>
            {previous && (
              <NavigationLink to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </NavigationLink>
            )}

            {next && (
              <NavigationLink to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </NavigationLink>
            )}
          </NavigationLinks>
        </Footer>
      </article>
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
        subject
        date(formatString: "DD MMM YYYY")
        description
        coverImage {
          childImageSharp {
            fixed(width: 1050, height: 460, fit: COVER, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        coverImageCredit
        coverImageCreditUrl
      }
    }
  }
`
