// libraries
import { Model } from "mongoose";

// types
import { type UserDocument as Document } from "@/common/types/documentation/_document";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";
import { type CustomerAvailedCouponDocument } from "@/common/types/documentation/nestedDocuments/customerAvailedCoupon";
import { type CustomerPointsDocument } from "@/common/types/documentation/nestedDocuments/customerPoints";
import { type CustomerReminderDocument } from "@/common/types/documentation/nestedDocuments/customerReminder";
import { type IssueDocument } from "@/common/types/documentation/actions/issue";
import { type ObjectId } from "mongoose";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type ReviewDocument } from "@/common/types/documentation/dynamic/review";

// document
export interface CustomerDocument extends Document {
  status: "active" | "blocked";
  conversionStatus:
    | "new"
    | "interested"
    | "not-interested"
    | "website"
    | "whatsapp";
  mobileNumber?: string;
  mail?: string;
  password?: string;
  name?: string;
  gender?: "male" | "female" | "others";
  dateOfBirth?: string | Date;
  addresses: CustomerAddressDocument[];
  cart?: string | ObjectId | CartDocument;
  orders: string[] | ObjectId[] | OrderDocument[];
  availedCoupons: CustomerAvailedCouponDocument[];
  lastVisitedContents: string[] | ObjectId[] | ContentDocument[];
  issues: string[] | ObjectId[] | IssueDocument[];
  reviews: string[] | ObjectId[] | ReviewDocument[];
  reminders: CustomerReminderDocument[];
  points: CustomerPointsDocument;
}

// model
export interface CustomerModel extends Model<CustomerDocument> {}
