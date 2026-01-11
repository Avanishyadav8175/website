// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CartItemEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancementItem";

// document
export interface CartItemEnhancementDocument extends Document {
  label: string;
  items: CartItemEnhancementItemDocument[];
}
