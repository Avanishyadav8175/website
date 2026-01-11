// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentListItemDataImageDocument } from "@/common/types/documentation/nestedDocuments/contentListItemDataImage";
import { type ContentListItemDataTagDocument } from "@/common/types/documentation/nestedDocuments/contentListItemDataTag";

// document
export interface ContentListItemDataDocument extends Document {
  name: string;
  slug: string;
  image: ContentListItemDataImageDocument;
  price: number;
  discount: number;
  ratingValue?: number;
  ratingCount?: number;
  processingTime: number;
  lastDeliverySlot?: string;
  edible?: "veg" | "non-veg";
  tag?: ContentListItemDataTagDocument;
  createdDate: Date | string;
}
