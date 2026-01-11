// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: OccasionDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Occasion",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
