import { getInitialClassificationValue } from "./utils/getInitialClassificationValue";
import { useEffect, useState } from "react";
import { useSelector } from "@/store/withType";
import { selectContentCategory } from "@/store/features/categories/contentCategorySlice";
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import Input from "@/lib/Forms/Input/Input";
import { type ContentClassificationDocument } from "@/common/types/documentation/nestedDocuments/contentClassification";

export default function ContentClassification(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: ContentClassificationDocument;
  } & (
      | {
        isRequired?: undefined;
      }
      | {
        isRequired?: boolean;
        label: string;
      }
    ) &
    (
      | {
        value?: undefined;
        defaultValue?: ContentClassificationDocument;
      }
      | {
        value?: ContentClassificationDocument;
        defaultValue?: undefined;
        onChangeValue: (newValue: ContentClassificationDocument) => void;
      }
    )
) {
  const { name, label, defaultValue } = props;

  const { options: contentCategoryOptions } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const [classification, setClassification] =
    useState<ContentClassificationDocument>(defaultValue || getInitialClassificationValue());

  useEffect(() => {
    if (defaultValue) setClassification(defaultValue);
    else setClassification(getInitialClassificationValue());
  }, [defaultValue]);

  return (
    <section className="grid grid-cols-1 gap-3 w-full py-3">
      {label && (
        <div className="text-2xl text-center font-light pb-2">{label}</div>
      )}
      <Input
        type="dropdown"
        name="primaryCategory"
        labelConfig={{
          label: "Main Category"
        }}
        isRequired
        nullOption
        customInitialValuePlaceholderLabel="Select Category"
        options={contentCategoryOptions.filter(
          ({ value }) => !(classification.related as string[]).includes(value)
        )}
        customValue={{
          value: classification.primary as string,
          setValue: (primary) => {
            setClassification({
              ...classification,
              primary
            } as ContentClassificationDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <AdvancedCheckbox
        name="relatedCategories"
        label="Other Categories"
        searchPlaceholder="Search Other Categories"
        options={contentCategoryOptions.filter(
          ({ value }) => classification.primary !== value
        )}
        selectedValues={classification.related as string[]}
        onChangeSelectedValues={(related) => {
          setClassification({
            ...classification,
            related
          } as ContentClassificationDocument);
        }}
      />
      <input
        className="hidden"
        type="text"
        name={name}
        value={JSON.stringify(classification)}
        onChange={() => { }}
      />
    </section>
  );
}
