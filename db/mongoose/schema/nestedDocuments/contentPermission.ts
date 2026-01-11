// libraries
import { Schema } from "mongoose";

// schemas
import { contentCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/contentCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { ContentPermissionDocument } from "@/common/types/documentation/nestedDocuments/contentPermission";

// schemas
export const contentPermissionSchema = new Schema<ContentPermissionDocument>(
  {
    isCustomized: {
      type: Boolean,
      required: false,
      default: false
    },
    all: {
      type: permissionSchema,
      required: false
    },
    custom: {
      type: contentCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
