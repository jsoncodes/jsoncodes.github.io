import { getAllPosts, postToDisplayPost } from '@/lib/posts';
import { siteMetadata } from '@/lib/siteMetadata';
import { HomeContent } from '@/components/HomeContent';

export default function HomePage() {
  const posts = getAllPosts();
  const latestPost = posts[0] ? postToDisplayPost(posts[0]) : null;

  return <HomeContent latestPost={latestPost} social={siteMetadata.social} />;
}
