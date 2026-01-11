// libraries
import mongoose from "mongoose";

// types
import { type CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";
import { type CartCheckoutContactDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutContact";
import { type CartCheckoutLocationDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutLocation";

export const initialCartCheckout = {
  _id: new mongoose.Types.ObjectId(),
  name: "",
  contact: {
    _id: new mongoose.Types.ObjectId(),
    mobileNumber: "",
    alternateMobileNumber: "",
    mail: ""
  } as CartCheckoutContactDocument,
  location: {
    _id: new mongoose.Types.ObjectId(),
    address: "",
    city: "",
    pincode: ""
  } as CartCheckoutLocationDocument
} as CartCheckoutDocument;
