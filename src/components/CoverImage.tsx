import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { invertColor, textToHexColor } from '../utils';

const FallbackCoverImage = styled.div<{ text: string }>`
  width: 100%;
  border-radius: 4px;
  padding: 1em;
  background: ${props => textToHexColor(props.text)};
  color: ${props => invertColor(textToHexColor(props.text), true)};
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FixedCoverImage = styled(GatsbyImage)`
  width: 100%;
  border-radius: 4px;

  img {
    aspect-ratio: 16 / 9;
  }
`;

type Props = {
  coverImage?: ImageDataLike;
  altText: string;
};

export const CoverImage = ({ coverImage, altText, ...other }: Props) => {
  const image = getImage(coverImage!);

  if (!image) {
    return (
      <FallbackCoverImage {...other} text={altText} data-type="cover-img-fallback">
        {altText}
      </FallbackCoverImage>
    );
  }

  return <FixedCoverImage {...other} image={image} alt={altText || 'Cover Image'} />;
};
