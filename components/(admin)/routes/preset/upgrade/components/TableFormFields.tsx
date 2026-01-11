// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type UpgradeDocument } from "@/common/types/documentation/presets/upgrade";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: UpgradeDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="label"
        isRequired
        labelConfig={{
          label: "Upgrade",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.label || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
