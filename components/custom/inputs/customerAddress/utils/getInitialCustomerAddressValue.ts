import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";

export const getInitialCustomerAddressValue = () =>
  ({
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    type: "",
    isDefault: true
  }) as CustomerAddressDocument;
