// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type IdentificationImageDocument } from "@/common/types/documentation/media/identificationImage";
import { type ObjectId } from "mongoose";

// document
export interface VendorIdentificationDocument extends Document {
  photo: string | ObjectId | IdentificationImageDocument;
  aadhar: string | ObjectId | IdentificationImageDocument;
  pan: string | ObjectId | IdentificationImageDocument;
}
