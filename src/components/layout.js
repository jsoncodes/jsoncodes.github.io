import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { accent, subtle } from 'utils/palette'
import { github, linkedin, twitter } from 'utils/icons'
import Icon from 'components/icon'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: 'Source Sans Pro', 'sans-serif';
    font-size: 18px;
    line-height: 1.5;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a {
    color: ${accent};

    :hover {
      text-decoration: none;
    }
  }

  h1, h2, h3 {
    color: #000;
    padding: 0;
    margin: 0;
  }

  p {
    margin: 0;
    padding: 0;
    margin-bottom: 1em;
  }
`

const SiteContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1080px;
  padding: 1em;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding-bottom: 0.5em;
  margin-bottom: 0.75em;
  border-bottom: 1px solid #dddddd;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex: 1;
`

const TitleLink = styled(Link)`
  text-decoration: none;

  h1 {
    font-size: 1.5em;
  }
`;

const ProfileImage = styled(Image).attrs(_ => ({
  imgStyle: {
    borderRadius: `50%`,
  }
}))`
  margin-right: 0.5em;
  margin-bottom: 0;
  min-width: 35px;
  border-radius: 100%;
`

const Footer = styled.footer`
  margin-top: 1.5em;
  text-align: right;
  color: ${subtle};

  a {
    color: inherit;
  }
`

const SocialLinks = styled.nav`
  display: flex;
  flex: 0;
`

const SocialLink = styled.a`
  color: inherit;
  font-size: 1.25em;
  margin-left: 0.5em;
  cursor: pointer;
  outline: none;
`;

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
            github
            linkedin
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  return (
    <>
      <GlobalStyle />
      <SiteContainer>
        <Header>
          <TitleWrapper>
            <ProfileImage
              fixed={data.avatar.childImageSharp.fixed}
              alt={author.name} />

            <TitleLink to={`/`}>
              <h1>{title}</h1>
            </TitleLink>
          </TitleWrapper>

          <SocialLinks>
            <SocialLink href={`https://www.linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer">
              <Icon icon={linkedin} />
            </SocialLink>
            <SocialLink href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer">
              <Icon icon={github} />
            </SocialLink>
            <SocialLink href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noopener noreferrer">
              <Icon icon={twitter} />
            </SocialLink>
          </SocialLinks>
        </Header>
        <main>{children}</main>
        <Footer>
          © {new Date().getFullYear()} Jason Mitchell, <a href="/rss.xml">RSS</a>
        </Footer>
      </SiteContainer>
    </>
  )
}

export default Layout
