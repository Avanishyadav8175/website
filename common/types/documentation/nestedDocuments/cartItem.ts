// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { type CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { type CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ObjectId } from "mongoose";

// document
export interface CartItemDocument extends Document {
  status: "new" | "preparing" | "on-the-way" | "completed" | "cancelled";
  content: string | ObjectId | ContentDocument;
  customVariant?: string;
  titleIfCustomVariant?: string;
  pricePerUnit: number;
  quantity: number;
  delivery: CartItemDeliveryDocument;
  instruction?: string;
  addons?: CartItemAddonDocument[];
  customization?: CartItemCustomizationDocument;
}
