// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";

interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  mobileNumber: HTMLInputElement;
  mail: HTMLInputElement;
  password: HTMLInputElement;
  address: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) =>
  ({
    status: "active",
    ...(elements.name.value
      ? { name: elements.name.value }
      : {
          $unset: { name: "" }
        }),
    ...(elements.mobileNumber.value
      ? { mobileNumber: elements.mobileNumber.value }
      : { $unset: { mobileNumber: "" } }),
    ...(elements.mail.value
      ? { mail: elements.mail.value }
      : { $unset: { mail: "" } }),
    ...(elements.password.value
      ? { password: elements.password.value }
      : { $unset: { password: "" } }),
    ...(elements?.address?.value
      ? {
          addresses: [
            JSON.parse(elements.address.value) as CustomerAddressDocument
          ]
        }
      : {}),
    createdBy: "",
    updatedBy: ""
  }) as CustomerDocument;

export default getDocumentsFromFormFieldsGenerator;
