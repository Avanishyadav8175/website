// components
import Input from "@/lib/Forms/Input/Input";
import SelectImage from "@/components/custom/inputs/image/SelectImage";

// types
import { type EnhancementDocument } from "@/common/types/documentation/presets/enhancement";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: EnhancementDocument;
}) {
  return (
    <section className="flex flex-col gap-3 w-[30vw]">
      <SelectImage
        name="image"
        label="Image"
        isRequired
        defaultValue={initialDocument?.image as string}
      />
      <Input
        type="text"
        name="label"
        isRequired
        labelConfig={{
          label: "Enhancement",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.label || ""}
        errorCheck={false}
        validCheck={false}
      />
    </section>
  );
}
