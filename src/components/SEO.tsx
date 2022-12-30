import React from 'react';
import { useSiteMetadata } from '../useSiteMetadata';

type Props = {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
};

export const SEO = ({ title, description, pathname, children }: Props) => {
  const { title: defaultTitle, description: defaultDescription, siteUrl } = useSiteMetadata();

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {children}
    </>
  );
};
