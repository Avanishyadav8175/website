export type RevalidateCache = {
  redis: boolean;
  next: boolean;
  cloudfront: boolean;
};

export type RevalidateImageCache = {
  redis: boolean;
  cloudfront: boolean;
};
