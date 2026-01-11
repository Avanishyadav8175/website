// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type GSTDocument } from "@/common/types/documentation/presets/gst";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: GSTDocument;
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
        type="number"
        name="value"
        isRequired
        labelConfig={{
          label: "Percentage",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.value?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
