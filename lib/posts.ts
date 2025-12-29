import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type PostFrontmatter = {
  subject: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  coverImage?: string;
  coverImageCredit?: string;
  coverImageCreditUrl?: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  excerpt: string;
};

function getMarkdownFiles(dir: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getMarkdownFiles(fullPath, files);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function generateExcerpt(content: string, length = 250): string {
  const plainText = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace [text](url) with text
    .replace(/[#*`>\-]/g, '') // Remove markdown chars
    .replace(/\n+/g, ' ')
    .trim();

  if (plainText.length <= length) return plainText;
  return plainText.slice(0, length).trim() + '...';
}

export function getAllPosts(): Post[] {
  const files = getMarkdownFiles(postsDirectory);

  return files
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const relativePath = path.relative(postsDirectory, filePath);
      let slug = '/' + relativePath.replace(/\.md$/, '');
      if (slug.endsWith('/index')) {
        slug = slug.replace(/\/index$/, '');
      }

      const frontmatter = data as PostFrontmatter;

      // Resolve cover image path to public URL
      if (frontmatter.coverImage?.startsWith('./')) {
        const dir = path.dirname(relativePath);
        const imageName = frontmatter.coverImage.slice(2);
        frontmatter.coverImage = `/blog/${dir}/${imageName}`.replace('//', '/');
      }

      return {
        slug,
        frontmatter,
        content,
        excerpt: generateExcerpt(content)
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags?.includes(tag)
  );
}

export const POSTS_PER_PAGE = 20;

export function getPaginatedPosts(page: number): {
  posts: Post[];
  totalPages: number;
  currentPage: number;
} {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return { posts, totalPages, currentPage: page };
}

export function getPaginatedPostsByTag(
  tag: string,
  page: number
): {
  posts: Post[];
  totalPages: number;
  currentPage: number;
} {
  const tagPosts = getPostsByTag(tag);
  const totalPages = Math.ceil(tagPosts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const posts = tagPosts.slice(start, start + POSTS_PER_PAGE);

  return { posts, totalPages, currentPage: page };
}

export type DisplayPost = {
  title: string;
  subject: string;
  excerpt: string;
  date: string;
  id: string;
  coverImage?: string;
  link: string;
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/ /g, ' ').toUpperCase();
}

export function postToDisplayPost(post: Post): DisplayPost {
  return {
    title: post.frontmatter.title,
    subject: post.frontmatter.subject,
    excerpt: post.excerpt,
    date: formatDate(post.frontmatter.date),
    id: post.slug,
    coverImage: post.frontmatter.coverImage,
    link: `/posts${post.slug}`
  };
}
