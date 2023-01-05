import { ImageDataLike } from "gatsby-plugin-image";

export type AllMarkdownRemark = {
  nodes: {
    frontmatter: {
      date: string;
      title: string;
      subject: string;
      slug: string;
      coverImage: ImageDataLike;
    };
    excerpt: string;
    id: string;
  }[];
};
