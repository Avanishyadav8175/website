// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { PageCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/pageCustomPermission";

// schemas
export const pageCustomPermissionSchema =
  new Schema<PageCustomPermissionDocument>(
    {
      header: {
        type: permissionSchema,
        required: false
      },
      footer: {
        type: permissionSchema,
        required: false
      },
      homepage: {
        type: permissionSchema,
        required: false
      },
      dynamicPage: {
        type: permissionSchema,
        required: false
      },
      topicPage: {
        type: permissionSchema,
        required: false
      },
      subTopicPage: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
