// libraries
import { models, Schema } from "mongoose";

// types
import {
  ImageDocument,
  ImageModel
} from "@/common/types/documentation/media/image";

// schema
export const imageSchema = new Schema<ImageDocument, ImageModel>(
  {
    folderId: {
      type: String,
      required: true
    },
    folderName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    defaultAlt: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: false
    },
    extension: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    usagesCount: {
      type: Number,
      required: false,
      default: 0
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
imageSchema.index({
  defaultAlt: "text",
  alt: "text",
  createdBy: "text",
  updatedBy: "text"
});

// middlewares
imageSchema.post("save", async function (doc, next) {
  const folderId = doc.folderId;

  await models["Folder"].findByIdAndUpdate(folderId, {
    $inc: { imageCount: 1 }
  });

  next();
});

imageSchema.post("findOneAndUpdate", async function (doc, next) {
  const folderId = doc.folderId;

  if (doc.isDeleted)
    await models["Folder"].findByIdAndUpdate(folderId, {
      $inc: { imageCount: -1 }
    });

  next();
});
