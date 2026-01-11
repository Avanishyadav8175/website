// libraries
import { Model } from "mongoose";

// types
import { type UserDocument as Document } from "@/common/types/documentation/_document";
import { type AdminRoleDocument } from "@/common/types/documentation/presets/adminRole";
import { type ObjectId } from "mongoose";
import { type SecurityQuestionDocument } from "@/common/types/documentation/presets/securityQuestion";

// document
export interface AdminDocument extends Document {
  status: "inactive" | "active" | "blocked";
  userName: string;
  password: string;
  securityQuestion?: string | ObjectId | SecurityQuestionDocument;
  securityAnswer?: string;
  isSuperAdmin: boolean;
  role?: string | ObjectId | AdminRoleDocument;
}

// model
export interface AdminModel extends Model<AdminDocument> {}
