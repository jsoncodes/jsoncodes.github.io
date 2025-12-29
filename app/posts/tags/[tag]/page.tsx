import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPaginatedPostsByTag, postToDisplayPost, POSTS_PER_PAGE } from '@/lib/posts';
import { TaggedPostsContent } from '@/components/TaggedPostsContent';

type Params = Promise<{ tag: string }>;

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tag.name }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `Posts tagged '${decodedTag}'`,
    description: `Posts tagged '${decodedTag}'`
  };
}

export default async function TagPage({ params }: { params: Params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const { posts, totalPages, currentPage } = getPaginatedPostsByTag(decodedTag, 1);

  if (posts.length === 0) {
    notFound();
  }

  const displayPosts = posts.map(postToDisplayPost);
  const nextPageLink = totalPages > 1 ? `/posts/tags/${tag}/2` : undefined;

  return (
    <TaggedPostsContent
      tag={decodedTag}
      posts={displayPosts}
      nextPageLink={nextPageLink}
    />
  );
}
