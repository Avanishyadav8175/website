interface FormFields extends HTMLFormControlsCollection {
  label: HTMLInputElement;
  value: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  label: elements.label.value,
  value: Number(elements.value.value),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
