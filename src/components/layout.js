import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { rhythm } from 'utils/typography'

const SiteContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5) + ' ' + rhythm(3 / 4)};
`;

const TitleLink = styled(Link)`
  font-size: ${rhythm(1)};
  box-shadow: none;
  color: inherit;
`;

const Layout = ({title, children }) => {
  return (
    <SiteContainer>
      <header>
        <TitleLink to={`/`}>
          {title}
        </TitleLink>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </SiteContainer>
  )
}

export default Layout
