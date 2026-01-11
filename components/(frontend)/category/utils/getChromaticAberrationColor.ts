const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  hex = hex.replace("#", "");

  if (hex.length !== 6) {
    return null;
  }

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return { r, g, b };
};

const luminance = (r: number, g: number, b: number): number => {
  const normalize = (c: number) => {
    const normalized = c / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };

  const R = normalize(r);
  const G = normalize(g);
  const B = normalize(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

export const getChromaticAberrationColor = (hex: string): string => {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    throw new Error("Invalid hex color code");
  }

  const { r, g, b } = rgb;
  const bgLuminance = luminance(r, g, b);

  return bgLuminance < 0.5 ? "#ffffff" : "#000000";
};
