// libraries
import { Model } from "mongoose";

// types
import { type ActionDocument as Document } from "@/common/types/documentation/_document";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type ObjectId } from "mongoose";
import { CityDocument } from "../presets/city";

// document
export interface LeadDocument extends Document {
  status: "new" | "in-progress" | "interested" | "not-interested";
  customer?: string | ObjectId | CustomerDocument;
  contact: string;
  city?: string | ObjectId | CityDocument;
  cartItems?: CartItemDocument[];
  submittedAt: string | Date;
}

// model
export interface LeadModel extends Model<LeadDocument> {}
