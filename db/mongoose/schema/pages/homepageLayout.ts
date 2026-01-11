// libraries
import { CallbackError, models, Schema } from "mongoose";

// schemas
import { pageLayoutSchema } from "@/db/mongoose/schema/nestedDocuments/pageLayout";

// types
import {
  HomepageLayoutDocument,
  HomepageLayoutModel
} from "@/common/types/documentation/pages/homepageLayout";

// schema
export const homepageLayoutSchema = new Schema<
  HomepageLayoutDocument,
  HomepageLayoutModel
>(
  {
    order: {
      type: Number,
      required: false
    },
    type: {
      type: String,
      enum: [
        "banner",
        "category",
        "collage",
        "content",
        "text",
        "faq",
        "quick-link"
      ],
      required: true
    },
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    },
    layout: {
      type: pageLayoutSchema,
      required: true
    },
    leftAlign: {
      type: Boolean,
      required: false
    },
    extraSpacing: {
      type: Boolean,
      required: false
    },
    customBG: {
      type: String,
      required: false
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true
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
homepageLayoutSchema.index({
  title: "text",
  createdBy: "text",
  updatedBy: "text"
});

// Middlewares
homepageLayoutSchema.pre("save", async function (next) {
  const doc = this as HomepageLayoutDocument;

  if (!doc.order) {
    try {
      const counter = await models.Counter.findOneAndUpdate(
        { counting: "homepageLayoutOrder" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      doc.order = counter.seq;
    } catch (error) {
      return next(error as CallbackError);
    }
  }

  next();
});
