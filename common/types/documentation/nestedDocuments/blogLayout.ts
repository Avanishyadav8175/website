// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type BlogLayoutImageDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutImage";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ObjectId } from "mongoose";
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

// document
export interface BlogLayoutDocument extends Document {
  content?: string[] | ObjectId[] | ContentDocument[];
  faq?: QADocument[];
  image?: BlogLayoutImageDocument;
  text?: string;
  video?: string;
}
