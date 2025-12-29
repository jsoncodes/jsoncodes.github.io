const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = (i: number) => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
};

const padZero = (str: string, len = 2) => {
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
};

export const invertColor = (hex: string, bw: boolean) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if (bw) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }

  const rStr = (255 - r).toString(16);
  const gStr = (255 - g).toString(16);
  const bStr = (255 - b).toString(16);

  return '#' + padZero(rStr) + padZero(gStr) + padZero(bStr);
};

export const textToHexColor = (text: string) => `#${intToRGB(hashCode(text))}`;
