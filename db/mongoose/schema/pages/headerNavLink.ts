// libraries
import { CallbackError, models, Schema } from "mongoose";

// schemas
import { headerNavLinkSectionSchema } from "@/db/mongoose/schema/nestedDocuments/headerNavLinkSection";

// types
import {
  HeaderNavLinkDocument,
  HeaderNavLinkModel
} from "@/common/types/documentation/pages/headerNavLink";
import { clickableImageSchema } from "../nestedDocuments/clickableImage";

// schema
export const headerNavLinkSchema = new Schema<
  HeaderNavLinkDocument,
  HeaderNavLinkModel
>(
  {
    order: {
      type: Number,
      required: false,
      unique: true
    },
    label: {
      type: String,
      required: true,
      unique: true
    },
    path: {
      type: String,
      required: false
    },
    sections: [
      {
        type: headerNavLinkSectionSchema,
        required: false
      }
    ],
    quickLinks: [
      {
        type: clickableImageSchema,
        required: false
      }
    ],
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
headerNavLinkSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});

// Middlewares
headerNavLinkSchema.pre("save", async function (next) {
  const doc = this as HeaderNavLinkDocument;

  if (!doc.order) {
    try {
      const counter = await models.Counter.findOneAndUpdate(
        { counting: "headerNavLinkOrder" },
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
