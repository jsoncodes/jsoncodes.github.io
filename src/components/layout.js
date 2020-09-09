import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { rhythm } from 'utils/typography'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a {
    color: inherit;
  }

  h1, h2, h3 {
    padding: 0;
    margin: 0;
  }
`

const SiteContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(36)};
  padding: ${rhythm(3 / 4)};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding-bottom: 0.5em;
  margin-bottom: ${rhythm(3 / 4)};
  border-bottom: 1px solid #dddddd;
`;

const TitleLink = styled(Link)`
  text-decoration: none;

  h1 {
    font-size: ${rhythm(0.75)};
  }
`;

const ProfileImage = styled(Image).attrs(_ => ({
  imgStyle: {
    borderRadius: `50%`,
  }
}))`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 35px;
  border-radius: 100%;
`

const Layout = ({title, children }) => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 35, height: 35) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata

  return (
    <>
      <GlobalStyle />
      <SiteContainer>
        <Header>
          <ProfileImage
            fixed={data.avatar.childImageSharp.fixed}
            alt={author.name} />

          <TitleLink to={`/`}>
            <h1>{title}</h1>
          </TitleLink>
        </Header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </SiteContainer>
    </>
  )
}

export default Layout
