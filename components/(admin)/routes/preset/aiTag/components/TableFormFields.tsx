// redux
import { selectAITagCategory } from "@/store/features/categories/aiTagCategorySlice";

// hooks
import { useSelector } from "@/store/withType";

// components
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: AITagDocument;
}) {
  // redux
  const { options: aiTagCategoryOptions } = useSelector((state) =>
    selectAITagCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  return (
    <>
      <Input
        type="dropdown"
        name="category"
        isRequired
        labelConfig={{
          label: "Category",
          layoutStyle: ""
        }}
        errorCheck={false}
        validCheck={false}
        nullOption
        customInitialValuePlaceholderLabel="None"
        defaultValue={initialDocument?.category as string}
        options={aiTagCategoryOptions}
      />
      {initialDocument ? (
        <Input
          type="text"
          name="name"
          isRequired
          labelConfig={{
            label: "Tag",
            layoutStyle: ""
          }}
          defaultValue={initialDocument?.name || ""}
          errorCheck={false}
          validCheck={false}
        />
      ) : (
        <Textarea
          name="names"
          labelConfig={{
            label: "Tags",
            labelStyle: "",
            layoutStyle: ""
          }}
          isList
          defaultValue={[]}
          errorCheck={false}
          validCheck={false}
        />
      )}
    </>
  );
}
