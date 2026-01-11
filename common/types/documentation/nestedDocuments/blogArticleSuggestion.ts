// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type ObjectId } from "mongoose";

// document
export interface BlogArticleSuggestionDocument extends Document {
  latest: string[] | ObjectId[] | BlogArticleDocument[];
  related?: string[] | ObjectId[] | BlogArticleDocument[];
}
