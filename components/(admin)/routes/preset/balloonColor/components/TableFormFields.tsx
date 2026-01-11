// components
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: BalloonColorGroupDocument;
}) {
  return (
    <>
      <Textarea
        name="colors"
        isRequired
        isList
        labelConfig={{
          label: "Colors",
          labelStyle: "",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.colors as string[]}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
