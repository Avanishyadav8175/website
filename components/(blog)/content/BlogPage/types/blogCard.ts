// types
import { type ImageDocument } from "@/common/types/documentation/media/image";

export type BlogCard = {
  title: string;
  path: string;
  coverImage: ImageDocument;
  authorName: string;
};
