// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type VenueDocument } from "@/common/types/documentation/presets/venue";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: VenueDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Venue",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
