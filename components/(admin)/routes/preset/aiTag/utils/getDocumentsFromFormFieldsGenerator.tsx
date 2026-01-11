interface FormFields extends HTMLFormControlsCollection {
  category: HTMLSelectElement;
  name: HTMLInputElement;
  names: HTMLTextAreaElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) =>
  elements.names?.value
    ? (JSON.parse(elements.names.value) as string[]).map((name) => ({
        category: elements.category.value,
        name: name,
        isActive: true,
        createdBy: "",
        updatedBy: ""
      }))
    : {
        category: elements.category.value,
        name: elements.name?.value,
        createdBy: "",
        updatedBy: ""
      };

export default getDocumentsFromFormFieldsGenerator;
