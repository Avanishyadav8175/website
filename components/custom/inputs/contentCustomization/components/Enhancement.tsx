// icons
import { Plus } from "lucide-react";

// utils
import { getInitialEnhancementItemValue } from "../utils/getInitialEnhancementItemValue";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createLabelAction,
  selectLabel
} from "@/store/features/presets/labelSlice";

// components
import EnhancementItem from "./EnhancementItem";
import Input from "@/lib/Forms/Input/Input";

// types
import { ContentEnhancementDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancement";

export default function Enhancement({
  enhancement,
  onChangeEnhancement
}: {
  enhancement: ContentEnhancementDocument;
  onChangeEnhancement: (newEnhancement: ContentEnhancementDocument) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const labelStatus = useSelector(selectLabel.status);

  const { options: labelOptions } = useSelector((state) =>
    selectLabel.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  // handlers
  const handleAddEnhancementItem = () => {
    onChangeEnhancement({
      ...enhancement,
      items: [...enhancement.items, getInitialEnhancementItemValue()]
    } as ContentEnhancementDocument);
  };

  const handleDeleteEnhancementItem = (enhancementItemId: string) => {
    if (enhancement.items.length === 1) {
      onChangeEnhancement({
        ...enhancement,
        items: [getInitialEnhancementItemValue()]
      } as ContentEnhancementDocument);
    } else {
      onChangeEnhancement({
        ...enhancement,
        items: [...enhancement.items].filter(
          ({ _id }) => _id !== enhancementItemId
        )
      } as ContentEnhancementDocument);
    }
  };

  // effects
  useEffect(() => {
    if (labelStatus === "idle") {
      dispatch(createLabelAction.fetchDocumentList());
    }
  }, [labelStatus, dispatch]);

  return (
    <section className="flex flex-col gap-3 w-full pt-1">
      <div className="text-xl py-2 underline underline-offset-4 text-teal-600 pt-4">
        {"Enhancements"}
      </div>
      <Input
        type="dropdown"
        name="label"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        labelConfig={{
          label: "Label"
        }}
        nullOption
        customInitialValuePlaceholderLabel="Select Label"
        options={labelOptions}
        customValue={{
          value: enhancement.label as string,
          setValue: (label) => {
            onChangeEnhancement({
              ...enhancement,
              label
            } as ContentEnhancementDocument);
          }
        }}
      />
      <section className="grid grid-cols-[10px_1fr_1fr_30px] items-center justify-center gap-x-3 gap-y-4 py-4 text-center">
        <span>No</span>
        <span>Enhancement</span>
        <span>Price</span>
        <span></span>
        {enhancement.items.map((enhancementItem, i) => (
          <EnhancementItem
            key={i}
            index={i}
            enhancementItem={enhancementItem}
            onChangeEnhancementItem={(newEnhancementItem) => {
              onChangeEnhancement({
                ...enhancement,
                items: [...enhancement.items].map((enhancementItem) =>
                  enhancementItem._id === newEnhancementItem._id
                    ? newEnhancementItem
                    : enhancementItem
                )
              } as ContentEnhancementDocument);
            }}
            onDeleteEnhancementItem={() => {
              handleDeleteEnhancementItem(enhancementItem._id as string);
            }}
          />
        ))}
        <div
          onClick={handleAddEnhancementItem}
          className="rounded-lg py-2 text-teal-600 w-full flex items-center justify-center col-span-4 cursor-pointer gap-1.5 transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
        >
          <Plus
            strokeWidth={1.5}
            width={20}
            height={20}
          />
          <span>Add another</span>
        </div>
      </section>
    </section>
  );
}
