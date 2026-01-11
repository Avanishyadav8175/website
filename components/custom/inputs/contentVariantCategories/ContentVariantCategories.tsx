// libraries
import mongoose from "mongoose";

// icons
import { Plus } from "lucide-react";

// utils
import { getInitialVariantCategoryValue } from "./utils/getInitialVariantCategoryValue";
import { getInitialVariantCategoriesValue } from "./utils/getInitialVariantCategoriesValue";

// hooks
import { useEffect, useState } from "react";

// components
import VariantCategory from "./components/VariantCategory";

// types
import { type ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";
import { type ContentCustomVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategory";
import { type ContentReferenceVariantDocument } from "@/common/types/documentation/nestedDocuments/contentReferenceVariant";
import { type ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import { FormSubTitle } from "../title/Form";

export default function ContentVariantCategories(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    contentId: string;
    defaultValue?: ContentVariantCategoryDocument[];
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
        defaultValue?: ContentVariantCategoryDocument[];
      }
      | {
        value?: ContentVariantCategoryDocument[];
        defaultValue?: undefined;
        onChangeValue: (newValue: ContentVariantCategoryDocument[]) => void;
      }
    )
) {
  // props
  const {
    name,
    label,
    isRequired,
    performReset,
    contentId,
    defaultValue,
    value
  } = props;

  // states
  const [variantCategories, setVariantCategories] = useState<
    ContentVariantCategoryDocument[]
  >(defaultValue || value || getInitialVariantCategoriesValue());

  // variables
  const returnValue = variantCategories
    .filter(
      ({ type, label, reference, custom }) =>
        type &&
        label &&
        ((reference && reference.length > 1) ||
          (custom && custom.variants.length > 1))
    )
    .filter((variantCategory) =>
      variantCategory.type === "custom"
        ? variantCategory.label &&
          variantCategory.custom &&
          variantCategory.custom.variants.length > 1
          ? variantCategory.custom.options.unit
            ? variantCategory.custom.unit
            : true
          : false
        : variantCategory.label &&
        variantCategory.reference &&
        variantCategory.reference.length > 1
    )
    .map((variantCategory) => {
      const validVariantCategory = { ...variantCategory };

      if (
        !mongoose.Types.ObjectId.isValid(validVariantCategory._id as string)
      ) {
        delete validVariantCategory._id;
      }

      if (validVariantCategory.type === "custom") {
        const validCustomVariantCategory = { ...validVariantCategory.custom };

        if (
          !mongoose.Types.ObjectId.isValid(
            validCustomVariantCategory._id as string
          )
        ) {
          delete validCustomVariantCategory._id;
        }

        if (validCustomVariantCategory.options?.image) {
          validCustomVariantCategory.variants = [
            ...(validCustomVariantCategory.variants as ContentCustomVariantDocument[])
          ].filter(({ image }) => image);
        } else {
          validCustomVariantCategory.variants = [
            ...(validCustomVariantCategory.variants as ContentCustomVariantDocument[])
          ].map((customVariant, i) => {
            const validCustomVariant = { ...customVariant };

            if (i !== 0) {
              delete validCustomVariant.image;
            }

            return validCustomVariant;
          }) as ContentCustomVariantDocument[];
        }

        if (validCustomVariantCategory.options?.unit) {
          validCustomVariantCategory.variants = [
            ...(validCustomVariantCategory.variants as ContentCustomVariantDocument[])
          ]
            .filter(({ price, value }) => price && value)
            .map((customVariant) => {
              const validCustomVariant = { ...customVariant };

              if (
                !mongoose.Types.ObjectId.isValid(
                  validCustomVariant._id as string
                )
              ) {
                delete validCustomVariant._id;
              }

              delete validCustomVariant.label;

              return validCustomVariant;
            }) as ContentCustomVariantDocument[];
        } else {
          delete validCustomVariantCategory.unit;

          validCustomVariantCategory.variants = [
            ...(validCustomVariantCategory.variants as ContentCustomVariantDocument[])
          ]
            .filter(({ label, price }) => label && price)
            .map((customVariant) => {
              const validCustomVariant = { ...customVariant };

              if (
                !mongoose.Types.ObjectId.isValid(
                  validCustomVariant._id as string
                )
              ) {
                delete validCustomVariant._id;
              }

              delete validCustomVariant.value;

              return validCustomVariant;
            }) as ContentCustomVariantDocument[];
        }

        validVariantCategory.custom =
          validCustomVariantCategory as ContentCustomVariantCategoryDocument;

        delete validVariantCategory.reference;
      }

      if (validVariantCategory.type === "reference") {
        const validReferenceVariants = [
          ...(validVariantCategory.reference as ContentReferenceVariantDocument[])
        ]
          .filter(({ label, reference }) => label && reference)
          .map((referenceVariant) => {
            const validReferenceVariant = { ...referenceVariant };

            if (
              !mongoose.Types.ObjectId.isValid(
                validReferenceVariant._id as string
              )
            ) {
              delete validReferenceVariant._id;
            }

            return validReferenceVariant;
          });

        validVariantCategory.reference =
          validReferenceVariants as ContentReferenceVariantDocument[];

        delete validVariantCategory.custom;
      }

      return validVariantCategory;
    })
    .filter(
      ({ reference, custom }) =>
        (reference && reference.length > 1) ||
        (custom && custom.variants.length > 1)
    );

  // handlers
  const handleAddVariantCategory = () => {
    setVariantCategories([
      ...variantCategories,
      getInitialVariantCategoryValue()
    ]);
  };

  const handleDeleteVariantCategory = (variantCategoryId: string) => {
    if (variantCategories.length === 1) {
      setVariantCategories(getInitialVariantCategoriesValue());
    } else {
      setVariantCategories(
        [...variantCategories].filter(({ _id }) => _id !== variantCategoryId)
      );
    }
  };

  // effects
  useEffect(() => {
    if (defaultValue) {
      setVariantCategories(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if ("onChangeValue" in props) {
      props.onChangeValue(returnValue as ContentVariantCategoryDocument[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantCategories]);

  return (
    <>
      {label && (
        <FormSubTitle subtitle={label} />
      )}
      <section className="flex flex-col gap-5">
        {variantCategories.map((variantCategory, i) => (
          <VariantCategory
            key={i}
            index={i}
            contentId={contentId}
            variantCategory={variantCategory}
            onChangeVariantCategory={(newVariantCategory) => {
              setVariantCategories(
                [...variantCategories].map((variantCategory) =>
                  variantCategory._id === newVariantCategory._id
                    ? newVariantCategory
                    : variantCategory
                )
              );
            }}
            onDeleteVariantCategory={() => {
              handleDeleteVariantCategory(variantCategory._id as string);
            }}
          />
        ))}

        <div
          onClick={handleAddVariantCategory}
          className="rounded-lg py-2 text-teal-600 w-full flex items-center justify-center col-span-4 cursor-pointer gap-1.5 transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
        >
          <Plus
            strokeWidth={1.5}
            width={20}
            height={20}
          />
          <span>Add</span>
        </div>
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={returnValue.length ? JSON.stringify(returnValue) : ""}
        onChange={() => { }}
      />
    </>
  );
}
