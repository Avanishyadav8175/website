interface FormFields extends HTMLFormControlsCollection {
  // name: HTMLInputElement;
  colors: HTMLTextAreaElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  name: (() => {
    const colors = JSON.parse(elements.colors.value) as string[];

    if (!colors.length) {
      return "";
    } else if (colors.length === 1) {
      return colors[0];
    } else if (colors.length === 2) {
      return `${colors[0]} & ${colors[1]}`;
    } else {
      return `${colors.slice(0, colors.length - 1).join(", ")} & ${colors[colors.length - 1]}`;
    }
  })(),
  colors: JSON.parse(elements.colors.value) as string[],
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
