// icons
import { X } from "lucide-react";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createEnhancementAction,
  selectEnhancement
} from "@/store/features/presets/enhancementSlice";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";

export default function EnhancementItem({
  index,
  enhancementItem,
  onChangeEnhancementItem,
  onDeleteEnhancementItem
}: {
  index: number;
  enhancementItem: ContentEnhancementItemDocument;
  onChangeEnhancementItem: (
    newEnhancementItem: ContentEnhancementItemDocument
  ) => void;
  onDeleteEnhancementItem: () => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const enhancementStatus = useSelector(selectEnhancement.status);

  const { options: enhancementOptions } = useSelector((state) =>
    selectEnhancement.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  // effects
  useEffect(() => {
    if (enhancementStatus === "idle") {
      dispatch(createEnhancementAction.fetchDocumentList());
    }
  }, [enhancementStatus, dispatch]);

  return (
    <>
      <div className="font-semibold">{index + 1}</div>
      <Input
        type="dropdown"
        name="enhancement"
        isRequired={false}
        nullOption
        customInitialValuePlaceholderLabel="Select Enhancement"
        options={enhancementOptions}
        customValue={{
          value: enhancementItem.enhancement as string,
          setValue: (enhancement) => {
            onChangeEnhancementItem({
              ...enhancementItem,
              enhancement
            } as ContentEnhancementItemDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="price"
        isRequired={false}
        customValue={{
          value: enhancementItem.price ? enhancementItem.price.toString() : "",
          setValue: (price) => {
            onChangeEnhancementItem({
              ...enhancementItem,
              price: Number(price)
            } as ContentEnhancementItemDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <div
        onClick={() => {
          onDeleteEnhancementItem();
        }}
        className="w-min rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
    </>
  );
}
