interface FormFields extends HTMLFormControlsCollection {
  label: HTMLInputElement;
  days: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  label: elements.label.value,
  days: Number(elements.days.value),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
