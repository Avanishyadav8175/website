// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { BlogCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/blogCustomPermission";

// schemas
export const blogCustomPermissionSchema =
  new Schema<BlogCustomPermissionDocument>(
    {
      article: {
        type: permissionSchema,
        required: false
      },
      author: {
        type: permissionSchema,
        required: false
      },
      category: {
        type: permissionSchema,
        required: false
      },
      tag: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
