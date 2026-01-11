// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";
import { presetCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/presetCustomPermission";

// types
import { PresetPermissionDocument } from "@/common/types/documentation/nestedDocuments/presetPermission";

// schemas
export const presetPermissionSchema = new Schema<PresetPermissionDocument>(
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
      type: presetCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
