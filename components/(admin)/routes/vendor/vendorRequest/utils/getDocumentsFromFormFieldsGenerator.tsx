import { type VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";

interface FormFields extends HTMLFormControlsCollection {
  businessName: HTMLInputElement;
  ownerName: HTMLInputElement;
  mobile: HTMLInputElement;
  whatsapp: HTMLInputElement;
  mail: HTMLInputElement;
  address: HTMLTextAreaElement;
  city: HTMLInputElement;
  facebook: HTMLInputElement;
  instagram: HTMLInputElement;
  youtube: HTMLInputElement;
  website: HTMLInputElement;
  gstNumber: HTMLInputElement;
  categories: HTMLInputElement;
  foundUs: HTMLSelectElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) =>
  ({
    businessName: elements.businessName.value,
    ownerName: elements.ownerName.value,
    mobile: elements.mobile.value,
    ...(elements.whatsapp?.value
      ? { whatsapp: elements.whatsapp.value }
      : { whatsapp: elements.mobile.value }),
    mail: elements.mail?.value || "",
    address: elements.address.value,
    city: elements.city.value,
    ...(elements.facebook?.value ||
    elements.instagram?.value ||
    elements.youtube?.value
      ? {
          socialMedia: [
            ...(elements.facebook.value
              ? [
                  {
                    name: "facebook",
                    url: elements.facebook.value
                  }
                ]
              : []),
            ...(elements.instagram.value
              ? [
                  {
                    name: "instagram",
                    url: elements.instagram.value
                  }
                ]
              : []),
            ...(elements.youtube.value
              ? [
                  {
                    name: "youtube",
                    url: elements.youtube.value
                  }
                ]
              : [])
          ]
        }
      : {}),
    ...(elements.website?.value ? { website: elements.website.value } : {}),
    ...(elements.gstNumber?.value
      ? { gstNumber: elements.gstNumber.value }
      : {}),
    ...(elements.categories?.value
      ? { categories: JSON.parse(elements.categories.value) as string[] }
      : { $unset: { categories: "" } }),
    ...(elements.foundUs?.value ? { foundUs: elements.foundUs.value } : {}),
    createdBy: "",
    updatedBy: ""
  }) as VendorRequestDocument;

export default getDocumentsFromFormFieldsGenerator;
