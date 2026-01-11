// libraries
import { Schema } from "mongoose";

// schemas
import { adminRolePermissionSchema } from "@/db/mongoose/schema/nestedDocuments/adminRolePermission";

// types
import {
  type AdminRoleDocument,
  type AdminRoleModel
} from "@/common/types/documentation/presets/adminRole";

// schema
export const adminRoleSchema = new Schema<AdminRoleDocument, AdminRoleModel>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    permission: {
      type: adminRolePermissionSchema,
      required: true
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
adminRoleSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
