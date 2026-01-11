// libraries
import { Model } from "mongoose";

// types
import { type PageDocument as Document } from "@/common/types/documentation/_document";
import { type PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";

// document
export interface HomepageLayoutDocument extends Document {
  order: number;
  type:
    | "banner"
    | "category"
    | "collage"
    | "content"
    | "text"
    | "faq"
    | "quick-link";
  title?: string;
  subtitle?: string;
  layout: PageLayoutDocument;
  leftAlign?: boolean;
  extraSpacing?: boolean;
  customBG?: string;
}

// model
export interface HomepageLayoutModel extends Model<HomepageLayoutDocument> {}
