interface FormFields extends HTMLFormControlsCollection {
  label: HTMLInputElement;
  hours: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  label: elements.label.value,
  hours: Number(elements.hours.value),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
