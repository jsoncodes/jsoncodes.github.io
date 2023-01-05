import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

export const ProfileImage = () => {
  return (
    <StaticImage
      src="../images/profile.jpg"
      alt="Jason Mitchell Profile"
      placeholder="blurred"
      layout="fixed"
      width={32}
      height={32}
      aspectRatio={1}
      style={{ borderRadius: '50%' }}
    />
  );
};
