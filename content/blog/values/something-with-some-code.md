---
subject: code
title: Something with some code
description: ''
date: '2022-12-30T08:00:00.000Z'
coverImage: ./hands.jpg
coverImageCredit: Hannah Busing on Unsplash
coverImageCreditUrl: https://unsplash.com/photos/Zyx1bK9mqmA
---

This is something with some code. Let's see what it looks like

```ts
export const CoverImage = ({ coverImage, altText, ...other }: Props) => {
  const image = getImage(coverImage!);

  if (!image) {
    return null;
  }

  return <FixedCoverImage {...other} image={image} alt={altText || 'Cover Image'} />;
};
```
