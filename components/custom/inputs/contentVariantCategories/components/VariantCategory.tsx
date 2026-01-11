// icons
import { Trash2 } from "lucide-react";

// utils
import { getInitialReferenceVariantsValue } from "../utils/getInitialReferenceVariantsValue";
import { getInitialCustomVariantCategoryValue } from "../utils/getInitialCustomVariantCategoryValue";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createLabelAction,
  selectLabel
} from "@/store/features/presets/labelSlice";
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";

// components
import CustomVariantCategory from "./CustomVariantCategory";
import Input from "@/lib/Forms/Input/Input";
import ReferenceVariants from "./ReferenceVariants";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCustomVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategory";
import { type ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";

export default function VariantCategory({
  index,
  contentId,
  variantCategory,
  onChangeVariantCategory,
  onDeleteVariantCategory
}: {
  index: number;
  contentId: string;
  variantCategory: ContentVariantCategoryDocument;
  onChangeVariantCategory: (
    newVariantCategory: ContentVariantCategoryDocument
  ) => void;
  onDeleteVariantCategory: () => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const labelStatus = useSelector(selectLabel.status);

  const { options: labelOptions } = useSelector((state) =>
    selectLabel.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  const contentStatus = useSelector(selectContent.status);

  const { documents: contents } = useSelector((state) =>
    selectContent.documentList(state, {
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // variables
  const content = contents.find(
    ({ _id }) => _id === contentId
  ) as ContentDocument;

  // effects
  useEffect(() => {
    if (labelStatus === "idle") {
      dispatch(createLabelAction.fetchDocumentList());
    }
  }, [labelStatus, dispatch]);

  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(createContentAction.fetchDocumentList());
    }
  }, [contentStatus, dispatch]);

  return (
    <div
      className={`relative min-w-full rounded-xl border-[1.5px] border-black/30`}
    >
      <section
        className={`w-full sticky top-0 bg-zinc-200 px-5 flex items-center justify-between z-[999]`}
      >
        <span
          className={`flex items-center justify-start gap-7 *:text-[16px] capitalize font-semibold py-2`}
        >
          <span>{`Category:`}</span>
          <span>
            <Input
              type="dropdown"
              name="variantCategoryType"
              isRequired={false}
              errorCheck={false}
              validCheck={false}
              nullOption
              customInitialValuePlaceholderLabel="Select Category"
              options={[
                {
                  label: "Custom",
                  value: "custom"
                },
                {
                  label: "Refer other product",
                  value: "reference"
                }
              ]}
              customValue={{
                value: variantCategory?.type || "",
                setValue: (type) => {
                  onChangeVariantCategory({
                    ...variantCategory,
                    type: type as "custom" | "reference",
                    ...(type === "reference"
                      ? {
                          reference: getInitialReferenceVariantsValue(contentId)
                        }
                      : {
                          reference: undefined
                        }),
                    ...(type === "custom"
                      ? {
                          custom: getInitialCustomVariantCategoryValue(content)
                        }
                      : {
                          custom: undefined
                        })
                  } as ContentVariantCategoryDocument);
                }
              }}
            />
          </span>
        </span>
        <div
          className="py-2 px-5 rounded-lg border-[1.5px] border-[#aa000060] bg-[#aa000020] text-red-600 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-red-700 hover:text-white cursor-pointer text-[14px]"
          onClick={onDeleteVariantCategory}
        >
          <Trash2 /> Delete
        </div>
      </section>
      {variantCategory?.type && (
        <div className="w-full px-2 py-2">
          <Input
            type="dropdown"
            name="label"
            isRequired={true}
            errorCheck={false}
            validCheck={false}
            labelConfig={{
              label: "Label"
            }}
            nullOption
            customInitialValuePlaceholderLabel="Select Label"
            options={labelOptions}
            customValue={{
              value: variantCategory.label as string,
              setValue: (label) => {
                onChangeVariantCategory({
                  ...variantCategory,
                  label
                } as ContentVariantCategoryDocument);
              }
            }}
          />
        </div>
      )}
      <div>
        {variantCategory?.type === "reference" && (
          <ReferenceVariants
            contentId={contentId}
            referenceVariants={variantCategory?.reference || []}
            onChangeReferenceVariants={(reference) => {
              onChangeVariantCategory({
                ...variantCategory,
                reference
              } as ContentVariantCategoryDocument);
            }}
          />
        )}
        {variantCategory?.type === "custom" && (
          <CustomVariantCategory
            content={content}
            customVariantCategory={
              variantCategory.custom as ContentCustomVariantCategoryDocument
            }
            onChangeCustomVariantCategory={(custom) => {
              onChangeVariantCategory({
                ...variantCategory,
                custom
              } as ContentVariantCategoryDocument);
            }}
          />
        )}
      </div>
    </div>
  );
}
