// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CartItemEnhancementDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancement";
import { type CartItemFlavourDocument } from "@/common/types/documentation/nestedDocuments/cartItemFlavour";
import { type CartItemUpgradeDocument } from "@/common/types/documentation/nestedDocuments/cartItemUpgrade";
import { type CartItemUploadedImageDocument } from "@/common/types/documentation/nestedDocuments/cartItemUploadedImage";
import { type CartItemUploadedTextDocument } from "@/common/types/documentation/nestedDocuments/cartItemUploadedText";

// document
export interface CartItemCustomizationDocument extends Document {
  enhancement?: CartItemEnhancementDocument;
  upgrade?: CartItemUpgradeDocument;
  flavour?: CartItemFlavourDocument;
  balloonColor?: string;
  uploadedText?: CartItemUploadedTextDocument;
  uploadedImage?: CartItemUploadedImageDocument;
}
