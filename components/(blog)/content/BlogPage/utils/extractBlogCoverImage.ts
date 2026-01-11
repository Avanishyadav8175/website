// types
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type BlogLayoutImageDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutImage";
import { type BlogLayoutItemDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutItem";

export const extractBlogCoverImage = (
  layouts: BlogLayoutItemDocument[]
): ImageDocument => {
  const imageLayout = layouts.find(({ type }) => type === "image");

  if (!imageLayout) {
    return { alt: "", url: "" } as ImageDocument;
  }

  const blogLayoutImage = imageLayout.layout.image as BlogLayoutImageDocument;

  const image = (blogLayoutImage.images as ImageDocument[])[0];

  return image;
};
