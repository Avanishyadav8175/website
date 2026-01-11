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
import { type ContentCustomizationUploadImageDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadImage";

export default function UploadImage({
  uploadImage,
  onChangeUploadImage
}: {
  uploadImage: ContentCustomizationUploadImageDocument;
  onChangeUploadImage: (
    newUploadImage: ContentCustomizationUploadImageDocument
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
        {"Upload Image"}
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
          value: uploadImage.label as string,
          setValue: (label) => {
            onChangeUploadImage({
              ...uploadImage,
              label
            } as ContentCustomizationUploadImageDocument);
          }
        }}
      />
      <Input
        type="number"
        name="imageLimit"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        labelConfig={{
          label: "Image Limit"
        }}
        customValue={{
          value: uploadImage.imageLimit
            ? uploadImage.imageLimit.toString()
            : "",
          setValue: (imageLimit) => {
            onChangeUploadImage({
              ...uploadImage,
              imageLimit: Number(imageLimit)
            } as ContentCustomizationUploadImageDocument);
          }
        }}
      />
    </section>
  );
}
