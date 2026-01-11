// icons
import { Plus } from "lucide-react";

// utils
import { getInitialUpgradeItemValue } from "../utils/getInitialUpgradeItemValue";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createLabelAction,
  selectLabel
} from "@/store/features/presets/labelSlice";
import {
  createUpgradeAction,
  selectUpgrade
} from "@/store/features/presets/upgradeSlice";

// components
import Input from "@/lib/Forms/Input/Input";
import UpgradeItem from "./UpgradeItem";

// types
import { type ContentUpgradeDocument } from "@/common/types/documentation/nestedDocuments/contentUpgrade";

export default function Upgrade({
  upgrade,
  onChangeUpgrade
}: {
  upgrade: ContentUpgradeDocument;
  onChangeUpgrade: (newUpgrade: ContentUpgradeDocument) => void;
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

  const upgradeStatus = useSelector(selectUpgrade.status);

  const { options: upgradeOptions } = useSelector((state) =>
    selectUpgrade.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );
  // handlers
  const handleAddUpgradeItem = () => {
    onChangeUpgrade({
      ...upgrade,
      options: [...upgrade.options, getInitialUpgradeItemValue()]
    } as ContentUpgradeDocument);
  };

  const handleDeleteUpgradeItem = (upgradeItemId: string) => {
    if (upgrade.options.length === 1) {
      onChangeUpgrade({
        ...upgrade,
        options: [getInitialUpgradeItemValue()]
      } as ContentUpgradeDocument);
    } else {
      onChangeUpgrade({
        ...upgrade,
        options: [...upgrade.options].filter(({ _id }) => _id !== upgradeItemId)
      } as ContentUpgradeDocument);
    }
  };

  // effects
  useEffect(() => {
    if (labelStatus === "idle") {
      dispatch(createLabelAction.fetchDocumentList());
    }
  }, [labelStatus, dispatch]);

  useEffect(() => {
    if (upgradeStatus === "idle") {
      dispatch(createUpgradeAction.fetchDocumentList());
    }
  }, [upgradeStatus, dispatch]);

  return (
    <section className="flex flex-col gap-3 w-full">
      <div className="text-xl py-2 underline underline-offset-4 text-teal-600 pt-4">
        {"Upgrades"}
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
          value: upgrade.label as string,
          setValue: (label) => {
            onChangeUpgrade({
              ...upgrade,
              label
            } as ContentUpgradeDocument);
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
        customInitialValuePlaceholderLabel="Select Default Upgrade"
        options={upgradeOptions}
        customValue={{
          value: upgrade.default as string,
          setValue: (defaultUpgrade) => {
            onChangeUpgrade({
              ...upgrade,
              default: defaultUpgrade
            } as ContentUpgradeDocument);
          }
        }}
      />
      <section className="grid grid-cols-[10px_1fr_1fr_30px] items-center justify-center gap-x-3 gap-y-4 py-4 text-center">
        <span>No</span>
        <span>Upgrade</span>
        <span>Price</span>
        <span></span>
        {upgrade.options.map((upgradeItem, i) => (
          <UpgradeItem
            key={i}
            index={i}
            upgradeOptions={upgradeOptions.filter(
              ({ value }) => value !== upgrade.default
            )}
            upgradeItem={upgradeItem}
            onChangeUpgradeItem={(newUpgradeItem) => {
              onChangeUpgrade({
                ...upgrade,
                options: [...upgrade.options].map((upgradeItem) =>
                  upgradeItem._id === newUpgradeItem._id
                    ? newUpgradeItem
                    : upgradeItem
                )
              } as ContentUpgradeDocument);
            }}
            onDeleteUpgradeItem={() => {
              handleDeleteUpgradeItem(upgradeItem._id as string);
            }}
          />
        ))}
        <div
          onClick={handleAddUpgradeItem}
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
