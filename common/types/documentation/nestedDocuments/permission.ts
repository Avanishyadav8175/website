// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface PermissionDocument extends Document {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
