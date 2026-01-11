import { VendorBusinessDocument } from "@/common/types/documentation/nestedDocuments/vendorBusiness";
import { VendorBusinessCommissionDocument } from "@/common/types/documentation/nestedDocuments/vendorBusinessCommission";
import { VendorContactDocument } from "@/common/types/documentation/nestedDocuments/vendorContact";
import { VendorContactSocialDocument } from "@/common/types/documentation/nestedDocuments/vendorContactSocial";
import { VendorIdentificationDocument } from "@/common/types/documentation/nestedDocuments/vendorIdentification";
import { VendorLocationDocument } from "@/common/types/documentation/nestedDocuments/vendorLocation";
import { VendorPaymentDocument } from "@/common/types/documentation/nestedDocuments/vendorPayment";
import { VendorPaymentBankDocument } from "@/common/types/documentation/nestedDocuments/vendorPaymentBank";

interface FormFields extends HTMLFormControlsCollection {
  businessName: HTMLInputElement;
  ownerName: HTMLInputElement;
  userName: HTMLInputElement;
  password: HTMLInputElement;
  address: HTMLTextAreaElement;
  state: HTMLSelectElement;
  city: HTMLSelectElement;
  mobile: HTMLInputElement;
  alternativeMobile: HTMLInputElement;
  whatsapp: HTMLInputElement;
  mail: HTMLInputElement;
  website: HTMLInputElement;
  facebook: HTMLInputElement;
  instagram: HTMLInputElement;
  youtube: HTMLInputElement;
  photo: HTMLInputElement;
  aadhar: HTMLInputElement;
  pan: HTMLInputElement;
  gstNumber: HTMLInputElement;
  upi: HTMLInputElement;
  bankName: HTMLInputElement;
  branchName: HTMLInputElement;
  ifsc: HTMLInputElement;
  accountType: HTMLSelectElement;
  accountNumber: HTMLInputElement;
  accountHolderName: HTMLInputElement;
  categories: HTMLInputElement;
  paymentCycle: HTMLSelectElement;
  provideDelivery: HTMLInputElement;
  commissionType: HTMLSelectElement;
  commissionPercentage: HTMLSelectElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  businessName: elements.businessName.value,
  ownerName: elements.ownerName.value,
  userName: elements.userName.value || elements.mail.value,
  password: elements.password.value,
  location: {
    address: elements.address.value,
    state: elements.state.value,
    city: elements.city.value
  } as VendorLocationDocument,
  contact: {
    mobile: elements.mobile.value,
    ...(elements.alternativeMobile.value
      ? {
          alternativeMobile: elements.alternativeMobile.value
        }
      : { $unset: { alternativeMobile: "" } }),
    whatsapp: elements.whatsapp.value || elements.mobile.value,
    mail: elements.mail.value,
    ...(elements.website.value
      ? { website: elements.website.value }
      : { $unset: { website: "" } }),
    ...(elements.facebook.value ||
    elements.instagram.value ||
    elements.youtube.value
      ? {
          social: {
            ...(elements.facebook.value
              ? { facebook: elements.facebook.value }
              : { $unset: { facebook: "" } }),
            ...(elements.instagram.value
              ? { instagram: elements.instagram.value }
              : { $unset: { instagram: "" } }),
            ...(elements.youtube.value
              ? { youtube: elements.youtube.value }
              : { $unset: { youtube: "" } })
          } as VendorContactSocialDocument
        }
      : { $unset: { social: "" } })
  } as VendorContactDocument,
  identification: {
    photo: elements.photo.value,
    aadhar: elements.aadhar.value,
    pan: elements.pan.value
  } as VendorIdentificationDocument,
  payment: {
    ...(elements.gstNumber.value
      ? { gstNumber: elements.gstNumber.value }
      : { $unset: { gstNumber: "" } }),
    bank: {
      name: elements.bankName.value,
      branch: elements.branchName.value,
      ifsc: elements.ifsc.value,
      accountType: elements.accountType.value,
      accountNumber: elements.accountNumber.value,
      accountHolderName: elements.accountHolderName.value
    } as VendorPaymentBankDocument,
    upi: elements.upi.value
  } as VendorPaymentDocument,
  business: {
    categories: JSON.parse(elements.categories.value) as string[],
    commission: {
      type: elements.commissionType.value as "fixed" | "percentage",
      ...(elements.commissionType.value === "percentage"
        ? { percentage: elements.commissionPercentage.value }
        : { $unset: { percentage: "" } })
    } as VendorBusinessCommissionDocument,
    paymentCycle: elements.paymentCycle.value,
    provideDelivery: elements.provideDelivery.checked
  } as VendorBusinessDocument,
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
