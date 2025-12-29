'use client';

import { PagedPosts } from '@/components/PagedPosts';
import type { Post } from '@/lib/types';

type Props = {
  tag: string;
  posts: Post[];
  previousPageLink?: string;
  nextPageLink?: string;
};

export function TaggedPostsContent({ tag, posts, previousPageLink, nextPageLink }: Props) {
  return (
    <>
      <h2>Posts tagged &apos;{tag}&apos;</h2>
      <PagedPosts posts={posts} previousPageLink={previousPageLink} nextPageLink={nextPageLink} />
    </>
  );
}
