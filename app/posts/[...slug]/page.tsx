import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { PostContent } from '@/components/PostContent';
import { MDXContent } from '@/components/MDXContent';

type Params = Promise<{ slug: string[] }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.split('/').filter(Boolean)
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = '/' + slug.join('/');
  const post = getPostBySlug(slugPath);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const description = post.frontmatter.description || post.excerpt.replace('...', '');

  return {
    title: post.frontmatter.title,
    description
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const slugPath = '/' + slug.join('/');
  const post = getPostBySlug(slugPath);

  if (!post) {
    notFound();
  }

  // Rewrite relative image paths to public URLs
  const dir = slugPath.split('/').slice(0, -1).join('/');
  const contentWithFixedImages = post.content.replace(
    /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
    `![$1](/blog${dir}/$2)`
  );

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrismPlus, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(contentWithFixedImages);
  const contentHtml = processedContent.toString();

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  return (
    <PostContent
      title={post.frontmatter.title}
      subject={post.frontmatter.subject}
      date={formattedDate}
      coverImage={post.frontmatter.coverImage}
      coverImageCredit={post.frontmatter.coverImageCredit}
      coverImageCreditUrl={post.frontmatter.coverImageCreditUrl}
    >
      <MDXContent html={contentHtml} />
    </PostContent>
  );
}
