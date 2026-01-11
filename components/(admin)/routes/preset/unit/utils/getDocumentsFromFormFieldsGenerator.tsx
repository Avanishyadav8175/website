import { UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";

interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  abbr: HTMLInputElement;
  serves: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => {
  return {
    name: elements.name.value,
    abbr: elements.abbr.value,
    /*  ...(elements.serves.value
       ? {
           serves: JSON.parse(elements.serves.value) as UnitServeDocument[]
         }
       : { $unset: { serves: "" } }), */
    createdBy: "",
    updatedBy: ""
  };
};

export default getDocumentsFromFormFieldsGenerator;
