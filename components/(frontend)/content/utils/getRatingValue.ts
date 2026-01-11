export const getRatingValue = (rating: number) =>
  String(rating).includes(".") ? String(rating) : `${String(rating)}.0`;
