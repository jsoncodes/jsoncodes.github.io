'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import { invertColor, textToHexColor } from '@/lib/utils';

const FallbackCoverImage = styled.div<{ text: string }>`
  width: 100%;
  border-radius: 4px;
  padding: 1em;
  background: ${(props) => textToHexColor(props.text)};
  color: ${(props) => invertColor(textToHexColor(props.text), true)};
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 16 / 9;
`;

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16 / 9;
`;

type Props = {
  coverImage?: string;
  altText: string;
  className?: string;
};

export function CoverImage({ coverImage, altText, className }: Props) {
  if (!coverImage) {
    return (
      <FallbackCoverImage className={className} text={altText} data-type="cover-img-fallback">
        {altText}
      </FallbackCoverImage>
    );
  }

  return (
    <ImageWrapper className={className}>
      <Image
        src={coverImage}
        alt={altText || 'Cover Image'}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 800px) 100vw, 50vw"
      />
    </ImageWrapper>
  );
}
