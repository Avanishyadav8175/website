// hooks
import { getInitialSEOMetaValue } from "./utils/getInitialSEOMetaValue";

// hooks
import { useEffect, useState } from "react";

// components
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { FormSubTitle } from "../title/Form";

export default function SEOMeta(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: SEOMetaDocument;
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
          defaultValue?: SEOMetaDocument;
        }
      | {
          value?: SEOMetaDocument;
          defaultValue?: undefined;
          onChangeValue: (newValue: SEOMetaDocument) => void;
        }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

  // states
  const [seoMeta, setSEOMeta] = useState<SEOMetaDocument>(
    defaultValue || getInitialSEOMetaValue()
  );

  // variables
  const seoMetaValue = value !== undefined ? value : seoMeta;
  const setSEOMetaValue =
    "onChangeValue" in props ? props.onChangeValue : setSEOMeta;

  // effects
  useEffect(() => {
    if (defaultValue) {
      setSEOMeta(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      {label && (
        <FormSubTitle subtitle={label} />
      )}
      <div className="grid grid-cols-[2fr_4fr] gap-4 pb-4">
        <Input
          type="text"
          name="metaTitle"
          isRequired
          labelConfig={{
            label: "Meta Title",
            layoutStyle: "grid grid-cols-[150px_1fr] col-span-2"
          }}
          placeholder={""}
          customValue={{
            value: seoMetaValue.title,
            setValue: (title) => {
              setSEOMetaValue({ ...seoMetaValue, title } as SEOMetaDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Textarea
          name="metaTags"
          isRequired
          isList
          labelConfig={{
            label: "Meta Keywords",
            labelStyle: "",
            layoutStyle: "space-y-2 flex-col"
          }}
          customValue={{
            value: seoMetaValue.tags,
            setValue: (tags) => {
              setSEOMetaValue({
                ...seoMetaValue,
                tags
              } as SEOMetaDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Textarea
          name="metaDescription"
          isRequired
          labelConfig={{
            label: "Meta Description",
            labelStyle: "",
            layoutStyle: "space-y-2 flex-col"
          }}
          customValue={{
            value: seoMetaValue.description,
            setValue: (description) => {
              setSEOMetaValue({
                ...seoMetaValue,
                description
              } as SEOMetaDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
      </div>
      <input
        className="hidden"
        type="text"
        name={name}
        value={JSON.stringify(seoMeta)}
        onChange={() => {}}
      />
    </>
  );
}
