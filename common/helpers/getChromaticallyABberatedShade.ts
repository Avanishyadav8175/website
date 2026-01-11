function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove the '#' if it's there
  hex = hex.replace("#", "");

  // Ensure it's a valid 6-digit hex color
  if (hex.length !== 6) {
    return null;
  }

  // Parse the hex string into RGB components
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return { r, g, b };
}

function luminance(r: number, g: number, b: number): number {
  // Normalize the RGB values to the range [0, 1]
  const normalize = (c: number) => {
    const normalized = c / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };

  const R = normalize(r);
  const G = normalize(g);
  const B = normalize(b);

  // Calculate luminance using the formula
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function getChromaticallyAbberatedShade(hex: string): string {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    throw new Error("Invalid hex color code");
  }

  const { r, g, b } = rgb;

  // Calculate luminance of the background color
  const bgLuminance = luminance(r, g, b);

  // If luminance is less than 0.5, it's a dark color, so return white text
  return bgLuminance < 0.5 ? "#ffffff" : "#000000";
}
