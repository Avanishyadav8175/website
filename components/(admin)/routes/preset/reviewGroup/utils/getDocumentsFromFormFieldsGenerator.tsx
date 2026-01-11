interface FormFields extends HTMLFormControlsCollection {
  category: HTMLSelectElement;
  name: HTMLInputElement;
  reviews: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  category: elements.category.value,
  name: elements.name.value,
  reviews: JSON.parse(elements.reviews.value) as string[],
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
