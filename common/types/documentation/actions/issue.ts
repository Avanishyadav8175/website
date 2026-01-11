// libraries
import { Model } from "mongoose";

// types
import { type ActionDocument as Document } from "@/common/types/documentation/_document";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type IssueMessageDocument } from "@/common/types/documentation/nestedDocuments/issueMessage";
import { type ObjectId } from "mongoose";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";

// document
export interface IssueDocument extends Document {
  status: "open" | "close";
  customer: string | ObjectId | CustomerDocument;
  order: string | ObjectId | OrderDocument;
  messages: IssueMessageDocument[];
}

// model
export interface IssueModel extends Model<IssueDocument> {}
