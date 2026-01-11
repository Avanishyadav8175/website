// libraries
import { Schema } from "mongoose";

// types
import {
  AdminDocument,
  AdminModel
} from "@/common/types/documentation/users/admin";

// schema
export const adminSchema = new Schema<AdminDocument, AdminModel>(
  {
    status: {
      type: String,
      enum: ["inactive", "active", "blocked"],
      required: false,
      default: "inactive"
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    securityQuestion: {
      type: Schema.Types.ObjectId,
      ref: "SecurityQuestion",
      required: false
    },
    securityAnswer: {
      type: String,
      required: false
    },
    isSuperAdmin: {
      type: Boolean,
      required: false,
      default: false
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "AdminRole",
      required: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// search index
adminSchema.index({
  userName: "text",
  createdBy: "text",
  updatedBy: "text"
});
