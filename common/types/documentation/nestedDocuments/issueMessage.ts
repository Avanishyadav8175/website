// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type IssueImageDocument } from "@/common/types/documentation/media/issueImage";
import { type ObjectId } from "mongoose";

// document
export interface IssueMessageDocument extends Document {
  from: "admin" | "customer";
  text?: string;
  images?: string[] | ObjectId | IssueImageDocument[];
}
