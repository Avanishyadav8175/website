// libraries
import { CallbackError, models, Schema } from "mongoose";

// schemas
import { CounterDocument } from "@/common/types/documentation/utils/counter";
import { seoMetaSchema } from "@/db/mongoose/schema/nestedDocuments/seoMeta";
import { contentAddonSchema } from "@/db/mongoose/schema/nestedDocuments/contentAddon";
import { contentAvailabilitySchema } from "@/db/mongoose/schema/nestedDocuments/contentAvailability";
import { contentClassificationSchema } from "../nestedDocuments/contentClassification";
import { contentCustomizationSchema } from "@/db/mongoose/schema/nestedDocuments/contentCustomization";
import { contentDeliverySchema } from "@/db/mongoose/schema/nestedDocuments/contentDelivery";
import { contentDetailSchema } from "@/db/mongoose/schema/nestedDocuments/contentDetail";
import { contentListItemDataSchema } from "../nestedDocuments/contentListItemData";
import { contentMediaSchema } from "@/db/mongoose/schema/nestedDocuments/contentMedia";
import { contentPriceSchema } from "@/db/mongoose/schema/nestedDocuments/contentPrice";
import { contentQualitySchema } from "@/db/mongoose/schema/nestedDocuments/contentQuality";
import { contentSuggestionSchema } from "../nestedDocuments/contentSuggestion";
import { contentTagSchema } from "@/db/mongoose/schema/nestedDocuments/contentTag";
import { contentVariantCategorySchema } from "@/db/mongoose/schema/nestedDocuments/contentVariantCategory";
import { edibleSchema } from "@/db/mongoose/schema/nestedDocuments/edible";

// types
import {
  ContentDocument,
  ContentModel
} from "@/common/types/documentation/contents/content";

// schema
export const contentSchema = new Schema<ContentDocument, ContentModel>(
  {
    type: {
      type: String,
      enum: ["product", "service"],
      required: true
    },
    sku: {
      type: String,
      required: false,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    redirectFrom: {
      type: String,
      required: false
    },
    category: {
      type: contentClassificationSchema,
      required: true
    },
    media: {
      type: contentMediaSchema,
      required: true
    },
    isBestseller: {
      type: Boolean,
      required: false,
      default: false
    },
    isCorporate: {
      type: Boolean,
      required: false,
      default: false
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: false
    },
    availability: {
      type: contentAvailabilitySchema,
      required: false
    },
    detail: {
      type: contentDetailSchema,
      required: false
    },
    tag: {
      type: contentTagSchema,
      required: false
    },
    quality: {
      type: contentQualitySchema,
      required: false
    },
    seoMeta: {
      type: seoMetaSchema,
      required: false
    },
    delivery: {
      type: contentDeliverySchema,
      required: false
    },
    price: {
      type: contentPriceSchema,
      required: false
    },
    edible: {
      type: edibleSchema,
      required: false
    },
    customization: {
      type: contentCustomizationSchema,
      required: false
    },
    addons: [
      {
        type: contentAddonSchema,
        required: false
      }
    ],
    variants: [
      {
        type: contentVariantCategorySchema,
        required: false
      }
    ],
    _coupons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Coupon",
        required: false
      }
    ],
    _suggestions: {
      type: contentSuggestionSchema,
      required: false
    },
    _listItemData: {
      type: contentListItemDataSchema,
      required: false
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// search index
contentSchema.index({
  sku: "text",
  name: "text",
  slug: "text",
  createdBy: "text",
  updatedBy: "text"
});

// middlewares
contentSchema.pre("save", async function (next) {
  const doc = this as ContentDocument;

  if (!doc.sku) {
    try {
      if (doc.type === "product") {
        const counter: CounterDocument = await models.Counter.findOneAndUpdate(
          { counting: "productSKU" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );

        doc.sku = `FW${new Date().getFullYear()}${counter.seq.toString().padStart(7, "0")}`;
      }

      if (doc.type === "service") {
        const counter: CounterDocument = await models.Counter.findOneAndUpdate(
          { counting: "serviceSKU" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );

        doc.sku = `FW${new Date().getFullYear()}${counter.seq.toString().padStart(7, "0")}`;
      }
    } catch (error) {
      return next(error as CallbackError);
    }
  }

  next();
});
