// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentBasePriceDocument } from "@/common/types/documentation/nestedDocuments/contentBasePrice";
import { type ContentCityPriceDocument } from "@/common/types/documentation/nestedDocuments/contentCityPrice";

// document
export interface ContentPriceDocument extends Document {
  base: ContentBasePriceDocument;
  cities?: ContentCityPriceDocument[];
}
