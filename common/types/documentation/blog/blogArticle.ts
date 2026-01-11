// types
import { type ContentDocument as Document } from "@/common/types/documentation/_document";
import { type Model, type ObjectId } from "mongoose";

import { type BlogArticleSuggestionDocument } from "../nestedDocuments/blogArticleSuggestion";
import { type BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";
import { type BlogLayoutItemDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutItem";
import { type BlogTagDocument } from "@/common/types/documentation/blog/blogTag";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";

// document
export interface BlogArticleDocument extends Document {
  author: string | ObjectId | BlogAuthorDocument;
  categories: string[] | ObjectId[] | BlogCategoryDocument[];
  name: string;
  slug: string;
  heading: string;
  tags: string[] | ObjectId[] | BlogTagDocument[];
  meta: SEOMetaDocument;
  layouts: BlogLayoutItemDocument[];
  layoutCounter: number;
  _suggestions?: BlogArticleSuggestionDocument;
}

// model
export interface BlogArticleModel extends Model<BlogArticleDocument> {}
