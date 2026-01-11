// libraries
import { v4 as uuid } from "uuid";

// utils
import { getInitialRelatedCategories } from "./utils/getInitialRelatedCategories";

// hooks
import { useEffect, useState } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectContentCategory } from "@/store/features/categories/contentCategorySlice";

// components
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type RelatedContentCategoriesDocument } from "@/common/types/documentation/nestedDocuments/relatedContentCategories";

export default function RelatedContentCategories(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: RelatedContentCategoriesDocument;
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
          defaultValue?: RelatedContentCategoriesDocument;
        }
      | {
          value?: RelatedContentCategoriesDocument;
          defaultValue?: undefined;
          onChangeValue: (newValue: RelatedContentCategoriesDocument) => void;
        }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

  // redux
  const { options: contentCategoryOptions } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [relatedContentCategories, setRelatedContentCategories] =
    useState<RelatedContentCategoriesDocument>(
      defaultValue || getInitialRelatedCategories()
    );

  // variables
  const returnValue = {
    show: relatedContentCategories?.categories?.length
      ? relatedContentCategories.show
      : false,
    ...(relatedContentCategories?.categories?.length
      ? {
          categories: relatedContentCategories.categories
        }
      : {})
  } as RelatedContentCategoriesDocument;

  const relatedContentCategoryValues =
    value !== undefined ? value : relatedContentCategories;
  const setRelatedContentCategoryValues =
    value !== undefined ? props.onChangeValue : setRelatedContentCategories;

  // effects
  useEffect(() => {
    if (defaultValue) {
      setRelatedContentCategories(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (
      value &&
      JSON.stringify(value) !== JSON.stringify(relatedContentCategories)
    ) {
      setRelatedContentCategories(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (
      "onChangeValue" in props &&
      JSON.stringify(returnValue) !== JSON.stringify(value)
    ) {
      props.onChangeValue(returnValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <section>
      {label && (
        <div className="text-2xl font-medium text-teal-600 underline underline-offet-8 pt-4 pb-2">{label}</div>
      )}
      <Toggle
        name={uuid()}
        label={"Show On Frontend"}
        className="grid-cols-[200px_1fr] py-1"
        isActive={relatedContentCategoryValues?.show || false}
        onChangeIsActive={(show) => {
          setRelatedContentCategoryValues({
            ...relatedContentCategoryValues,
            show
          } as RelatedContentCategoriesDocument);
        }}
      />
      <AdvancedCheckbox
        name={uuid()}
        label="Related Categories"
        options={contentCategoryOptions}
        selectedValues={relatedContentCategoryValues?.categories as string[]}
        onChangeSelectedValues={(categories) => {
          setRelatedContentCategoryValues({
            ...relatedContentCategoryValues,
            categories
          } as RelatedContentCategoriesDocument);
        }}
      />
      <input
        className="hidden"
        type="text"
        name={name}
        value={JSON.stringify(returnValue)}
        onChange={() => {}}
      />
    </section>
  );
}
