import { ImageDataLike } from "gatsby-plugin-image";

type MarkdownRemark = {
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    title: string;
    subject: string;
    coverImage: ImageDataLike;
  };
  excerpt: string;
  id: string;
}

export type AllMarkdownRemark = {
  nodes: MarkdownRemark[];
};

export type Post = {
  title: string;
  subject: string;
  excerpt: string;
  date: string;
  id: string;
  coverImage: ImageDataLike;
  link: string;
};


export const markdownRemarkToPost = (markdownRemark: MarkdownRemark): Post => {
  return {
    title: markdownRemark.frontmatter.title,
    subject: markdownRemark.frontmatter.subject,
    excerpt: markdownRemark.excerpt,
    date: markdownRemark.frontmatter.date,
    id: markdownRemark.id,
    coverImage: markdownRemark.frontmatter.coverImage,
    link: `/posts${markdownRemark.fields.slug}`
  };
}
