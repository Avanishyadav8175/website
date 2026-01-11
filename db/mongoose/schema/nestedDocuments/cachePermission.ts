// libraries
import { Schema } from "mongoose";

// schemas
import { cacheCustomPermissionSchema } from "./cacheCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { type CachePermissionDocument } from "@/common/types/documentation/nestedDocuments/cachePermission";

// schemas
export const cachePermissionSchema = new Schema<CachePermissionDocument>(
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
      type: cacheCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
