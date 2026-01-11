interface FormFields extends HTMLFormControlsCollection {
  occasion: HTMLSelectElement;
  name: HTMLInputElement;
  templates: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  occasion: elements.occasion.value,
  name: elements.name.value,
  templates: JSON.parse(elements.templates.value) as string[],
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
