// libraries
import { Schema } from "mongoose";

// schemas
import { mediaCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/mediaCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { MediaPermissionDocument } from "@/common/types/documentation/nestedDocuments/mediaPermission";

// schemas
export const mediaPermissionSchema = new Schema<MediaPermissionDocument>(
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
      type: mediaCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
