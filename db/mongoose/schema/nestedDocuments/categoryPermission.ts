// libraries
import { Schema } from "mongoose";

// schemas
import { categoryCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/categoryCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { CategoryPermissionDocument } from "@/common/types/documentation/nestedDocuments/categoryPermission";

// schemas
export const categoryPermissionSchema = new Schema<CategoryPermissionDocument>(
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
      type: categoryCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
