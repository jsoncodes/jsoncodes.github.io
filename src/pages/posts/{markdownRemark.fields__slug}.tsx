import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import { ImageDataLike } from 'gatsby-plugin-image';
import { lighten } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { CoverImage } from '../../components/CoverImage';
import { SEO } from '../../components/SEO';
import { Layout } from '../../Layout';

const BlogPost = styled.article`
  font-size: 1.1em;
  max-width: 800px;
  margin: 0 auto;
`;

const CoverImageContainer = styled.div`
  margin-bottom: 0.75em;
`;

const PostCoverImage = styled(CoverImage)`
  max-height: 60vh;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const CreditLink = styled.a`
  font-size: 0.8em;
  font-style: italic;
  float: right;
`;

const Title = styled.h1`
  margin-bottom: 0;
  font-size: 1.6em;
`;

const Subject = styled.h3`
  text-transform: uppercase;
  font-size: 1em;
  color: ${props => props.theme.palette.accent};
  margin-bottom: 0.5em;
`;

const DateStamp = styled.p`
  display: block;
  margin-bottom: 1em;
  color: ${props => lighten(0.5, props.theme.typography.color)};
`;

const Body = styled.section`
  h1,
  h2,
  h3 {
    margin-bottom: 0.75em;
  }

  pre {
    font-size: 14px;
  }

  blockquote {
    background: #eeeeee;
    margin: 0;
    margin-bottom: 1em;
    padding: 0.5em 2em;
    border-left: 3px solid ${props => props.theme.palette.accent};

    p:last-child {
      margin-bottom: 0;
    }
  }
`;

type DataProps = {
  markdownRemark: {
    html: string;
    excerpt: string;
    frontmatter: {
      date: string;
      title: string;
      description?: string;
      subject: string;
      slug: string;
      coverImage: ImageDataLike;
      coverImageCredit: string;
      coverImageCreditUrl: string;
    };
  };
};

const MarkdownPage = ({ data }: PageProps<DataProps>) => {
  const post = data.markdownRemark;
  const { coverImage, coverImageCredit, coverImageCreditUrl } = post.frontmatter;

  return (
    <Layout>
      <BlogPost>
        {coverImage && (
          <CoverImageContainer>
            <PostCoverImage coverImage={coverImage} />

            {coverImageCredit && (
              <CreditLink href={coverImageCreditUrl} target="_blank">
                Image credit: {coverImageCredit}
              </CreditLink>
            )}
          </CoverImageContainer>
        )}

        <header>
          <Subject>{post.frontmatter.subject}</Subject>
          <Title>{post.frontmatter.title}</Title>
          <DateStamp>{post.frontmatter.date}</DateStamp>
        </header>

        <Body dangerouslySetInnerHTML={{ __html: post.html }} />
      </BlogPost>
    </Layout>
  );
};

export default MarkdownPage;

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "DD MMM YYYY")
        title
        subject
        description
        coverImage {
          childImageSharp {
            gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
        coverImageCredit
        coverImageCreditUrl
      }
    }
  }
`;

export const Head: HeadFC<DataProps> = ({ data }: HeadProps<DataProps>) => {
  var markdownRemark = data.markdownRemark;
  var description = markdownRemark.frontmatter.description || markdownRemark.excerpt.replace('…', '');

  return <SEO title={markdownRemark.frontmatter.title} description={description} />;
};
