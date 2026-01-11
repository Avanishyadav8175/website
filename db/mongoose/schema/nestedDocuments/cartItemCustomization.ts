// libraries
import { Schema } from "mongoose";

// schemas
import { cartItemEnhancementSchema } from "@/db/mongoose/schema/nestedDocuments/cartItemEnhancement";
import { cartItemFlavourSchema } from "@/db/mongoose/schema/nestedDocuments/cartItemFlavour";
import { cartItemUpgradeSchema } from "@/db/mongoose/schema/nestedDocuments/cartItemUpgrade";
import { cartItemUploadedImageSchema } from "@/db/mongoose/schema/nestedDocuments/cartItemUploadedImage";
import { cartItemUploadedTextSchema } from "@/db/mongoose/schema/nestedDocuments/cartItemUploadedText";

// types
import { CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";

// schemas
export const cartItemCustomizationSchema =
  new Schema<CartItemCustomizationDocument>(
    {
      enhancement: {
        type: cartItemEnhancementSchema,
        required: false
      },
      upgrade: {
        type: cartItemUpgradeSchema,
        required: false
      },
      flavour: {
        type: cartItemFlavourSchema,
        required: false
      },
      balloonColor: {
        type: String,
        required: false
      },
      uploadedText: {
        type: cartItemUploadedTextSchema,
        required: false
      },
      uploadedImage: {
        type: cartItemUploadedImageSchema,
        required: false
      }
    },
    { timestamps: true }
  );
