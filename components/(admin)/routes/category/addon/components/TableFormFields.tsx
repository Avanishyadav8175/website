// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type AddonCategoryDocument } from "@/common/types/documentation/categories/addonCategory";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: AddonCategoryDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Category Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
