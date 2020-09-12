import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

const FixedCoverImage = styled(Image)`
  max-width: 100%;
  height: 175px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  margin-bottom: 0.75em;
`

const SvgThing = styled.svg`
  max-width: 100%;
  height: 175px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  margin-bottom: 0.75em;
`

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
     hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i){
  var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

const BackupCoverImage = ({subject}) => {
  const backgroundColor = `#${intToRGB(hashCode(subject))}`
  const textColor = invertColor("#ff0000", true)

  return (
    <SvgThing viewBox="0 0 320 175" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill={backgroundColor}/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="27" fill={textColor} font-family="Source Sans Pro, sans-serif">{subject}</text>
    </SvgThing>
  )
}

const CoverImage = ({subject, coverImage}) => {
  return (
    <>
      {coverImage && <FixedCoverImage fixed={coverImage.childImageSharp.fixed} objectFit="contain" alt={subject} />}
      {!coverImage && <BackupCoverImage subject={subject} />}
    </>
  )
}

export default CoverImage
