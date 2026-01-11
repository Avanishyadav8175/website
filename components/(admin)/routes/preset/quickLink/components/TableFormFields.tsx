// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type QuickLinkDocument } from "@/common/types/documentation/presets/quickLink";
import SelectImage from "@/components/custom/inputs/image/SelectImage";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: QuickLinkDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="label"
        isRequired
        labelConfig={{
          label: "Label",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.label || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="path"
        isRequired
        labelConfig={{
          label: "Path",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.path || ""}
        errorCheck={false}
        validCheck={false}
      />
      <SelectImage
        name="image"
        label="Image"
        defaultValue={initialDocument?.image as string}
      />
    </>
  );
}
