// libraries
import { Schema } from "mongoose";

// schemas
import { blogCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/blogCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { BlogPermissionDocument } from "@/common/types/documentation/nestedDocuments/blogPermission";

// schemas
export const blogPermissionSchema = new Schema<BlogPermissionDocument>(
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
      type: blogCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
