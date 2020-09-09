import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import { ButtonLink } from 'components/buttons'

const Post = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CoverImage = styled(Image)`
  max-width: 100%;
  height: 175px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  margin-bottom: 0.75em;
`

const Title = styled.h2`
  font-size: 1em;
`

const Subject = styled.h3`
  text-transform: uppercase;
  font-size: 0.75em;
  margin-bottom: 1em;
  color: #999;
`;

const Excerpt = styled.section`
  flex: 1;
  margin-bottom: 0;
`

const Footer = styled.footer`
  display: flex;
  margin-top: 1em;
  align-items: center;
`;

const ReadLinkWrapper = styled(Link)`
  flex: 1;
`

const DateStamp = styled.small`
  color: #999;
  flex: 0;
  white-space: nowrap;
`

const PostCard = ({frontmatter, fields, excerpt}) => {
  const {title, subject, description, coverImage, date} = frontmatter;

  return (
    <Post>
      {coverImage && <CoverImage fixed={coverImage.childImageSharp.fixed} objectFit="contain" alt={title} />}
      <header>
        {subject && <Subject>{subject}</Subject>}
        <Title>{title}</Title>
      </header>
      <Excerpt>
        {description || excerpt}
      </Excerpt>
      <Footer>
        <ReadLinkWrapper>
          <ButtonLink to={fields.slug}>Read →</ButtonLink>
        </ReadLinkWrapper>
        <DateStamp>{date}</DateStamp>
      </Footer>
    </Post>
  )
}

export default PostCard
