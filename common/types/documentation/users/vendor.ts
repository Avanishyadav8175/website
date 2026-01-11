// libraries
import { Model } from "mongoose";

// types
import { type UserDocument as Document } from "@/common/types/documentation/_document";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type DeliveryDocument } from "@/common/types/documentation/dynamic/delivery";
import { type ObjectId } from "mongoose";
import { type VendorBalanceDocument } from "@/common/types/documentation/nestedDocuments/vendorBalance";
import { type VendorBusinessDocument } from "@/common/types/documentation/nestedDocuments/vendorBusiness";
import { type VendorContactDocument } from "@/common/types/documentation/nestedDocuments/vendorContact";
import { type VendorIdentificationDocument } from "@/common/types/documentation/nestedDocuments/vendorIdentification";
import { type VendorLocationDocument } from "@/common/types/documentation/nestedDocuments/vendorLocation";
import { type VendorPaymentDocument } from "@/common/types/documentation/nestedDocuments/vendorPayment";

// document
export interface VendorDocument extends Document {
  status: "new" | "active" | "inactive" | "blocked" | "deleted";
  businessName: string;
  ownerName: string;
  userName: string;
  password: string;
  location: VendorLocationDocument;
  contact: VendorContactDocument;
  identification: VendorIdentificationDocument;
  payment?: VendorPaymentDocument;
  business?: VendorBusinessDocument;
  cities?: string[] | ObjectId[] | CityDocument[];
  contents?: string[] | ObjectId[] | ContentDocument[];
  deliveries?: string[] | ObjectId[] | DeliveryDocument[];
  balance?: VendorBalanceDocument;
  isDefault: boolean;
}

// model
export interface VendorModel extends Model<VendorDocument> {}
