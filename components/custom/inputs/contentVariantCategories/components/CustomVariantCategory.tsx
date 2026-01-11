// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createUnitAction,
  selectUnit
} from "@/store/features/presets/unitSlice";

// components
import CustomVariants from "./CustomVariants";
import Input from "@/lib/Forms/Input/Input";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCustomVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategory";

export default function CustomVariantCategory({
  content,
  customVariantCategory,
  onChangeCustomVariantCategory
}: {
  content: ContentDocument;
  customVariantCategory: ContentCustomVariantCategoryDocument;
  onChangeCustomVariantCategory: (
    newCustomVariantCategory: ContentCustomVariantCategoryDocument
  ) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const unitStatus = useSelector(selectUnit.status);

  const { options: unitOptions } = useSelector((state) =>
    selectUnit.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // effects
  useEffect(() => {
    if (unitStatus === "idle") {
      dispatch(createUnitAction.fetchDocumentList());
    }
  }, [unitStatus, dispatch]);

  return (
    <>
      <section className="flex flex-col gap-2 p-2">
        <Toggle
          name="includeImage"
          label="Include Image"
          isActive={customVariantCategory?.options?.image}
          onChangeIsActive={(image) => {
            onChangeCustomVariantCategory({
              ...customVariantCategory,
              options: {
                ...customVariantCategory?.options,
                image
              }
            } as ContentCustomVariantCategoryDocument);
          }}
        />
        <Toggle
          name="includeUnit"
          label="Include Unit"
          isActive={customVariantCategory?.options?.unit}
          onChangeIsActive={(unit) => {
            onChangeCustomVariantCategory({
              ...customVariantCategory,
              options: {
                ...customVariantCategory?.options,
                unit
              }
            } as ContentCustomVariantCategoryDocument);
          }}
        />
        {customVariantCategory?.options?.unit && (
          <Input
            type="dropdown"
            name="unit"
            labelConfig={{
              label: "Unit"
            }}
            isRequired={true}
            errorCheck={false}
            validCheck={false}
            nullOption
            customInitialValuePlaceholderLabel="Select Unit"
            options={unitOptions}
            customValue={{
              value: customVariantCategory?.unit as string,
              setValue: (unit) => {
                onChangeCustomVariantCategory({
                  ...customVariantCategory,
                  unit
                } as ContentCustomVariantCategoryDocument);
              }
            }}
          />
        )}
      </section>
      <CustomVariants
        content={content}
        customOptions={customVariantCategory.options}
        customVariants={customVariantCategory.variants}
        onChangeCustomVariants={(variants) => {
          onChangeCustomVariantCategory({
            ...customVariantCategory,
            variants
          } as ContentCustomVariantCategoryDocument);
        }}
      />
    </>
  );
}
