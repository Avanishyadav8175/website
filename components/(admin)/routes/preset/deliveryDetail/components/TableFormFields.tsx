// components
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type DeliveryDetailDocument } from "@/common/types/documentation/presets/deliveryDetail";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: DeliveryDetailDocument;
}) {
  return (
    <section className="flex flex-col gap-5 w-[60dvw] px-1">
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
      <Textarea
        name="content"
        labelConfig={{
          label: "Content",
          labelStyle: "",
          layoutStyle: ""
        }}
        isRequired
        isList
        longer
        defaultValue={initialDocument?.content || []}
      />
    </section>
  );
}
