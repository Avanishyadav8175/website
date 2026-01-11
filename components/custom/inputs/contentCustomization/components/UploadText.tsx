// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createLabelAction,
  selectLabel
} from "@/store/features/presets/labelSlice";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type ContentCustomizationUploadTextDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadText";

export default function UploadText({
  uploadText,
  onChangeUploadText
}: {
  uploadText: ContentCustomizationUploadTextDocument;
  onChangeUploadText: (
    newUploadText: ContentCustomizationUploadTextDocument
  ) => void;
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

  // effects
  useEffect(() => {
    if (labelStatus === "idle") {
      dispatch(createLabelAction.fetchDocumentList());
    }
  }, [labelStatus, dispatch]);

  return (
    <section className="flex flex-col gap-3 w-full">
      <div className="text-xl py-2 underline underline-offset-4 text-teal-600 pt-4">
        {"Upload Text"}
      </div>
      <Input
        type="dropdown"
        name="label"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        labelConfig={{
          label: "Label"
        }}
        nullOption
        customInitialValuePlaceholderLabel="Select Label"
        options={labelOptions}
        customValue={{
          value: uploadText.label as string,
          setValue: (label) => {
            onChangeUploadText({
              ...uploadText,
              label
            } as ContentCustomizationUploadTextDocument);
          }
        }}
      />
      <Input
        type="number"
        name="characterLimit"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        labelConfig={{
          label: "Character Limit"
        }}
        customValue={{
          value: uploadText.characterLimit
            ? uploadText.characterLimit.toString()
            : "",
          setValue: (characterLimit) => {
            onChangeUploadText({
              ...uploadText,
              characterLimit: Number(characterLimit)
            } as ContentCustomizationUploadTextDocument);
          }
        }}
      />
    </section>
  );
}
