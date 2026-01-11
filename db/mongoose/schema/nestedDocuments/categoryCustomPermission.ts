// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { CategoryCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/categoryCustomPermission";

// schemas
export const categoryCustomPermissionSchema =
  new Schema<CategoryCustomPermissionDocument>(
    {
      addon: {
        type: permissionSchema,
        required: false
      },
      aiTag: {
        type: permissionSchema,
        required: false
      },
      catalogue: {
        type: permissionSchema,
        required: false
      },
      content: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
