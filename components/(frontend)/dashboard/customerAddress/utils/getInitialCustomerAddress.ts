// constants
import { v4 as uuid } from "uuid";

// types
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";

export const getInitialCustomerAddress = ({
  isDefault
}: {
  isDefault?: boolean;
}): CustomerAddressDocument =>
  ({
    _id: uuid(),
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    type: "",
    isDefault: isDefault || false
  }) as CustomerAddressDocument;
