import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from 'utils/typography'

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
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

  const BioWrapper = styled.div`
    display: flex;
    margin-bottom: ${rhythm(2.5)};
  `

  const ProfileImage = styled(Image).attrs(_ => ({
    imgStyle: {
      borderRadius: `50%`,
    }
  }))`
    margin-right: ${rhythm(1 / 2)};
    margin-bottom: 0;
    min-width: 50px;
    border-radius: 100%;
  `

  const { author, social } = data.site.siteMetadata
  return (
    <BioWrapper>
      <ProfileImage
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name} />
      <p>
        Written by <strong>{author.name}</strong> {author.summary}
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter
        </a>
      </p>
    </BioWrapper>
  )
}

export default Bio
