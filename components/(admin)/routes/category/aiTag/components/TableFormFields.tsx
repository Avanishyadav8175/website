// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type AITagCategoryDocument } from "@/common/types/documentation/categories/aiTagCategory";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: AITagCategoryDocument;
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
    </>
  );
}
