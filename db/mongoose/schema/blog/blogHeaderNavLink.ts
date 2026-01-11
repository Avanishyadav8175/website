// libraries
import { CallbackError, models, Schema } from "mongoose";

// schemas
import { headerNavLinkSectionSchema } from "@/db/mongoose/schema/nestedDocuments/headerNavLinkSection";

// types
import {
  BlogHeaderNavLinkDocument,
  BlogHeaderNavLinkModel
} from "@/common/types/documentation/blog/blogHeaderNavLink";

// schema
export const blogHeaderNavLinkSchema = new Schema<
  BlogHeaderNavLinkDocument,
  BlogHeaderNavLinkModel
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
blogHeaderNavLinkSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});

// Middlewares
blogHeaderNavLinkSchema.pre("save", async function (next) {
  const doc = this as BlogHeaderNavLinkDocument;

  if (!doc.order) {
    try {
      const counter = await models.Counter.findOneAndUpdate(
        { counting: "blogHeaderNavLinkOrder" },
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
