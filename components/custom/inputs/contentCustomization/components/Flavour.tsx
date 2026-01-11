// icons
import { Plus } from "lucide-react";

// utils
import { getInitialFlavourItemValue } from "../utils/getInitialFlavourItemValue";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createLabelAction,
  selectLabel
} from "@/store/features/presets/labelSlice";
import {
  createFlavourAction,
  selectFlavour
} from "@/store/features/presets/flavourSlice";

// components
import Input from "@/lib/Forms/Input/Input";
import FlavourItem from "./FlavourItem";

// types
import { type ContentFlavourDocument } from "@/common/types/documentation/nestedDocuments/contentFlavour";

export default function Flavour({
  flavour,
  onChangeFlavour
}: {
  flavour: ContentFlavourDocument;
  onChangeFlavour: (newFlavour: ContentFlavourDocument) => void;
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

  const flavourStatus = useSelector(selectFlavour.status);

  const { options: flavourOptions } = useSelector((state) =>
    selectFlavour.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );
  // handlers
  const handleAddFlavourItem = () => {
    onChangeFlavour({
      ...flavour,
      options: [...flavour.options, getInitialFlavourItemValue()]
    } as ContentFlavourDocument);
  };

  const handleDeleteFlavourItem = (flavourItemId: string) => {
    if (flavour.options.length === 1) {
      onChangeFlavour({
        ...flavour,
        options: [getInitialFlavourItemValue()]
      } as ContentFlavourDocument);
    } else {
      onChangeFlavour({
        ...flavour,
        options: [...flavour.options].filter(({ _id }) => _id !== flavourItemId)
      } as ContentFlavourDocument);
    }
  };

  // effects
  useEffect(() => {
    if (labelStatus === "idle") {
      dispatch(createLabelAction.fetchDocumentList());
    }
  }, [labelStatus, dispatch]);

  useEffect(() => {
    if (flavourStatus === "idle") {
      dispatch(createFlavourAction.fetchDocumentList());
    }
  }, [flavourStatus, dispatch]);

  return (
    <section className="flex flex-col gap-3 w-full">
      <div className="text-xl py-2 underline underline-offset-4 text-teal-600 pt-4">
        {"Flavours"}
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
          value: flavour.label as string,
          setValue: (label) => {
            onChangeFlavour({
              ...flavour,
              label
            } as ContentFlavourDocument);
          }
        }}
      />
      <Input
        type="dropdown"
        name="default"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        labelConfig={{
          label: "Default"
        }}
        nullOption
        customInitialValuePlaceholderLabel="Select Default Flavour"
        options={flavourOptions}
        customValue={{
          value: flavour.default as string,
          setValue: (defaultFlavour) => {
            onChangeFlavour({
              ...flavour,
              default: defaultFlavour
            } as ContentFlavourDocument);
          }
        }}
      />
      <section className="grid grid-cols-[10px_1fr_1fr_30px] items-center justify-center gap-x-3 gap-y-4 py-4 text-center">
        <span>No</span>
        <span>Flavour</span>
        <span>Price</span>
        <span></span>
        {flavour.options.map((flavourItem, i) => (
          <FlavourItem
            key={i}
            index={i}
            flavourOptions={flavourOptions.filter(
              ({ value }) => value !== flavour.default
            )}
            flavourItem={flavourItem}
            onChangeFlavourItem={(newFlavourItem) => {
              onChangeFlavour({
                ...flavour,
                options: [...flavour.options].map((upgradeItem) =>
                  upgradeItem._id === newFlavourItem._id
                    ? newFlavourItem
                    : upgradeItem
                )
              } as ContentFlavourDocument);
            }}
            onDeleteFlavourItem={() => {
              handleDeleteFlavourItem(flavourItem._id as string);
            }}
          />
        ))}
        <div
          onClick={handleAddFlavourItem}
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
