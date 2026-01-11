interface FormFields extends HTMLFormControlsCollection {
  label: HTMLInputElement;
  content: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  label: elements.label.value,
  content: JSON.parse(elements.content.value) as string[],
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
