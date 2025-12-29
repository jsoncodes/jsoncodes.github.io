import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPaginatedPosts, postToDisplayPost, POSTS_PER_PAGE } from '@/lib/posts';
import { PaginatedPostsContent } from '@/components/PaginatedPostsContent';

type Params = Promise<{ page: string }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return Array.from({ length: numPages }, (_, i) => ({
    page: String(i + 1)
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Posts - Page ${page}`
  };
}

export default async function PaginatedPostsPage({ params }: { params: Params }) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  const { posts, totalPages, currentPage } = getPaginatedPosts(pageNum);

  if (posts.length === 0) {
    notFound();
  }

  const displayPosts = posts.map(postToDisplayPost);
  const previousPageLink = currentPage > 1 ? `/posts/${currentPage - 1}` : undefined;
  const nextPageLink = currentPage < totalPages ? `/posts/${currentPage + 1}` : undefined;

  return (
    <PaginatedPostsContent
      posts={displayPosts}
      previousPageLink={previousPageLink}
      nextPageLink={nextPageLink}
    />
  );
}
