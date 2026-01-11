export const formattedPrice = (num: number) => {
  // crore ------------------
  if (num >= 1_00_00_000) return `${(num / 1_00_00_000).toFixed(1)}Cr`;

  // lakh ------------------
  if (num >= 1_00_000) return `${(num / 1_00_000).toFixed(1)}L`;

  // thousands ------------------
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;

  return `${num}`;
};
