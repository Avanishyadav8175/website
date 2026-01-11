interface FormFields extends HTMLFormControlsCollection {
  state: HTMLSelectElement;
  name: HTMLInputElement;
  aliases: HTMLTextAreaElement;
  isTopCity: HTMLInputElement;
  icon: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => {
  return {
    state: elements.state.value,
    name: elements.name.value,
    ...(elements.aliases?.value
      ? {
          aliases: elements.aliases.value
            .split(",")
            .map((alias) => alias.trim())
        }
      : {}),
    isTopCity: elements.isTopCity?.checked || false,
    // ...(elements.isTopCity.checked && elements.icon.value
    //   ? { icon: elements.icon.value }
    //   : {}),
    createdBy: "",
    updatedBy: ""
  };
};

export default getDocumentsFromFormFieldsGenerator;
