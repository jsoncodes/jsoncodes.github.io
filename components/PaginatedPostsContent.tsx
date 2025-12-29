'use client';

import { PagedPosts } from '@/components/PagedPosts';
import type { Post } from '@/lib/types';

type Props = {
  posts: Post[];
  previousPageLink?: string;
  nextPageLink?: string;
};

export function PaginatedPostsContent({ posts, previousPageLink, nextPageLink }: Props) {
  return (
    <>
      <h2>All Posts</h2>
      <PagedPosts posts={posts} previousPageLink={previousPageLink} nextPageLink={nextPageLink} />
    </>
  );
}
