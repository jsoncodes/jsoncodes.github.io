'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import { invert } from 'polished';

type Tag = {
  name: string;
  count: number;
};

const BadgeLink = styled(Link)`
  text-decoration: none;
`;

const Badge = styled.div`
  background: ${(props) => props.theme.palette.accent};
  color: ${(props) => props.theme.typography.color};
  border-radius: 1em;
  padding: 0 0.5em;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const PostCount = styled.div`
  background-color: ${(props) => invert(props.theme.typography.color)};
  margin: 0.25em 0;
  margin-left: 0.25em;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function TagBadge({ name, count }: Tag) {
  return (
    <BadgeLink href={`/posts/tags/${name}`}>
      <Badge>
        {name} <PostCount>{count}</PostCount>
      </Badge>
    </BadgeLink>
  );
}

const TagsListRoot = styled.div`
  max-width: 50vw;
  margin: 0 auto;
  text-align: center;
`;

const TagsRoot = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: center;
  padding: 1em 0;
  flex-wrap: wrap;
`;

type Props = {
  tags: Tag[];
};

export function TagsIndexContent({ tags }: Props) {
  return (
    <TagsListRoot>
      <h2>Post Tags</h2>
      <TagsRoot>
        {tags.map((tag) => (
          <TagBadge key={tag.name} {...tag} />
        ))}
      </TagsRoot>
    </TagsListRoot>
  );
}
