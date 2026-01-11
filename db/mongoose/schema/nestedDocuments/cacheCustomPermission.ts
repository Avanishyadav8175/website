// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { type CacheCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/cacheCustomPermission";

// schemas
export const cacheCustomPermissionSchema =
  new Schema<CacheCustomPermissionDocument>(
    {
      reset: {
        type: permissionSchema,
        required: false
      },
      revalidate: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
