import React from 'react'
import styled from 'styled-components'
import PostCard from 'components/post-card'
import {subtle} from 'utils/palette'

const PostsHeader = styled.h3`
  text-transform: uppercase;
  font-size: 0.75em;
  margin-bottom: 1em;
  color: ${subtle};
`;

const PostGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PostWrapper = styled.div`
  width: 30%;
  min-width: 320px;
  margin-bottom: 2em;
`;

const PostsGrid = ({title, posts}) => {
  return (
    <>
      <PostsHeader>{title}</PostsHeader>
      <PostGrid>
        {posts.map(({ node }) => (
          <PostWrapper>
            <PostCard {...node} />
          </PostWrapper>
        ))}
      </PostGrid>
    </>
  )
}

export default PostsGrid
