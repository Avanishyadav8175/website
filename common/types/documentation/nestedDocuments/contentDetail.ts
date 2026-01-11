// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CancellationPolicyDocument } from "@/common/types/documentation/presets/cancellationPolicy";
import { type CareInfoDocument } from "@/common/types/documentation/presets/careInfo";
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type DeliveryDetailDocument } from "@/common/types/documentation/presets/deliveryDetail";
import { type FAQGroupDocument } from "@/common/types/documentation/presets/faqGroup";
import { type ObjectId } from "mongoose";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type RelationDocument } from "@/common/types/documentation/presets/relation";

// document
export interface ContentDetailDocument extends Document {
  includes: string[];
  excludes: string[];
  deliveryDetail: string | ObjectId | DeliveryDetailDocument;
  careInfo: string | ObjectId | CareInfoDocument;
  cancellationPolicy: string | ObjectId | CancellationPolicyDocument;
  faqGroup: string | ObjectId | FAQGroupDocument;
  colors: string[] | ObjectId[] | ColorDocument[];
  occasions: string[] | ObjectId[] | OccasionDocument[];
  relations: string[] | ObjectId[] | RelationDocument[];
}
