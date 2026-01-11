// libraries
import { CallbackError, models, Schema } from "mongoose";

// schemas
import { footerSectionLinkSchema } from "@/db/mongoose/schema/nestedDocuments/footerSectionLink";

// types
import {
  BlogFooterSectionDocument,
  BlogFooterSectionModel
} from "@/common/types/documentation/blog/blogFooterSection";

// schema
export const blogFooterSectionSchema = new Schema<
  BlogFooterSectionDocument,
  BlogFooterSectionModel
>(
  {
    order: {
      type: Number,
      required: false,
      unique: true
    },
    heading: {
      type: String,
      required: true,
      unique: true
    },
    path: {
      type: String,
      required: false
    },
    links: [
      {
        type: footerSectionLinkSchema,
        required: true
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
blogFooterSectionSchema.index({
  heading: "text",
  createdBy: "text",
  updatedBy: "text"
});

// Middlewares
blogFooterSectionSchema.pre("save", async function (next) {
  const doc = this as BlogFooterSectionDocument;

  if (!doc.order) {
    try {
      const counter = await models.Counter.findOneAndUpdate(
        { counting: "blogFooterSectionOrder" },
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
