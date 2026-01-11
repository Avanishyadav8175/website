// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface VendorRequestSocialMediaDocument extends Document {
  name: "facebook" | "instagram" | "youtube";
  url: string;
}
