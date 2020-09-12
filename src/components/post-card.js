import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { ButtonLink } from 'components/buttons'
import CoverImage from 'components/cover-image'
import { subtle } from 'utils/palette'

const Post = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: 1em;
`

const Subject = styled.h3`
  text-transform: uppercase;
  font-size: 0.75em;
  margin-bottom: 0.5em;
  color: ${subtle};
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
  color: ${subtle};
  flex: 0;
  white-space: nowrap;
`

const PostCard = ({frontmatter, fields, excerpt}) => {
  const {title, subject, description, coverImage, date} = frontmatter;

  return (
    <Post>
      <CoverImage subject={subject || title} coverImage={coverImage} />
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
