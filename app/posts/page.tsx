import { Metadata } from 'next';
import { getAllPosts, postToDisplayPost } from '@/lib/posts';
import { PostsIndexContent } from '@/components/PostsIndexContent';

export const metadata: Metadata = {
  title: 'Posts'
};

export default function PostsIndexPage() {
  const posts = getAllPosts();
  const displayPosts = posts.slice(0, 10).map(postToDisplayPost);

  return <PostsIndexContent posts={displayPosts} />;
}
