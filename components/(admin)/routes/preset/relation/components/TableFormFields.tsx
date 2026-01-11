// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type RelationDocument } from "@/common/types/documentation/presets/relation";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: RelationDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Relation",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
