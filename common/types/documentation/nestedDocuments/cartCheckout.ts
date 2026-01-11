// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CartCheckoutContactDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutContact";
import { type CartCheckoutLocationDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutLocation";
import { type ObjectId } from "mongoose";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type VenueDocument } from "@/common/types/documentation/presets/venue";

// document
export interface CartCheckoutDocument extends Document {
  name: string;
  contact: CartCheckoutContactDocument;
  location: CartCheckoutLocationDocument;
  note?: string;
  occasion?: string | ObjectId | OccasionDocument;
  venue?: string | ObjectId | VenueDocument;
  deliverToSomeoneElse?: boolean;
  receiverName?: string;
  receiverMobileNumber?: string;
}
