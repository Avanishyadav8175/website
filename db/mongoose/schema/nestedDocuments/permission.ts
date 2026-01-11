// libraries
import { Schema } from "mongoose";

// types
import { PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// schemas
export const permissionSchema = new Schema<PermissionDocument>(
  {
    create: {
      type: Boolean,
      required: false,
      default: false
    },
    read: {
      type: Boolean,
      required: false,
      default: false
    },
    update: {
      type: Boolean,
      required: false,
      default: false
    },
    delete: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  { timestamps: true }
);
