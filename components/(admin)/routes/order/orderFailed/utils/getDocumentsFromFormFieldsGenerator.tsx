// types
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";

interface FormFields extends HTMLFormControlsCollection {}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) =>
  ({
    createdBy: "",
    updatedBy: ""
  }) as OrderDocument;

export default getDocumentsFromFormFieldsGenerator;
