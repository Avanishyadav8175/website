// redux
import {
  createColorAction,
  selectColor
} from "@/store/features/presets/colorSlice";

// hooks
import { useDispatch, useSelector } from "@/store/withType";
import { useEffect, useState } from "react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: PromotionTagDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const colorStatus = useSelector(selectColor.status);

  const { options: colorOptions } = useSelector((state) =>
    selectColor.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );
  // states
  const [color, setColor] = useState<string>(
    (initialDocument?.color as string) || ""
  );

  // effects
  useEffect(() => {
    if (colorStatus === "idle") {
      dispatch(createColorAction.fetchDocumentList());
    }
  }, [colorStatus, dispatch]);

  useEffect(() => {
    if (initialDocument) {
      setColor((initialDocument?.color as string) || "");
    }
  }, [initialDocument]);

  return (
    <>
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
      <Input
        type="dropdown"
        name="color"
        isRequired
        labelConfig={{
          label: "Color",
          layoutStyle: ""
        }}
        errorCheck={false}
        validCheck={false}
        nullOption
        customInitialValuePlaceholderLabel="None"
        customValue={{
          value: color,
          setValue: setColor
        }}
        options={colorOptions}
      />
    </>
  );
}
