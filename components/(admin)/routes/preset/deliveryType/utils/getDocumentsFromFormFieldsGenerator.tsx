import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  price: HTMLInputElement;
  timeSlots: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  name: elements.name.value,
  price: Number(elements.price.value),
  timeSlots: JSON.parse(elements.timeSlots.value) as TimeSlotDocument[],
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
