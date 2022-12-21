import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';

const FixedCoverImage = styled(GatsbyImage)`
  width: 100%;
  border-radius: 4px;
  width: 100%;

  img {
    aspect-ratio: 16 / 9;
  }
`;

type Props = {
  coverImage?: ImageDataLike;
  altText?: string;
};

export const CoverImage = ({ coverImage, altText, ...other }: Props) => {
  const image = getImage(coverImage!);

  if (!image) {
    return null;
  }

  return (
    <FixedCoverImage {...other} image={image} alt={altText || 'Cover Image'} />
  );
};
