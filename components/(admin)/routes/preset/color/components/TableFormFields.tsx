// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type ColorDocument } from "@/common/types/documentation/presets/color";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: ColorDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="color"
        name="hexCode"
        isRequired
        labelConfig={{
          label: "Color",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.hexCode || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
