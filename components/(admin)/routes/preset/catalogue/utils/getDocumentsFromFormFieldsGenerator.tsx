interface FormFields extends HTMLFormControlsCollection {
  category: HTMLSelectElement;
  name: HTMLInputElement;
  path: HTMLInputElement;
  icon: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => {
  return (elements: FormFields) => {
    const category = elements.category?.value;
    const icon = elements.icon?.value;

    if (!category) {
      alert("Category is required. Please select a category.");
      throw new Error("Category is required. Please select a category.");
    }

    if (!icon) {
      alert("Icon is required. Please select an icon image.");
      throw new Error("Icon is required. Please select an icon image.");
    }

    return {
      category,
      name: elements.name.value,
      path: elements.path.value,
      icon,
      isActive: true,
      createdBy: "admin",
      updatedBy: "admin"
    };
  };
};

export default getDocumentsFromFormFieldsGenerator;
