// icons
import { X } from "lucide-react";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createQuickLinkAction,
  selectQuickLink
} from "@/store/features/presets/quickLinkSlice";

// components
import Input from "@/lib/Forms/Input/Input";
import SelectImage from "../../image/SelectImage";

// types
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";

export default function QuickLink({
  index,
  label,
  selectedPresetQuickLinkIds,
  quickLink,
  onChangePresetQuickLinkIds,
  onChangeQuickLink,
  onDeleteQuickLink
}: {
  index: number;
  label?: string;
  selectedPresetQuickLinkIds: string[];
  quickLink: ClickableImageDocument;
  onChangePresetQuickLinkIds: (presetQuickLinkIds: string[]) => void;
  onChangeQuickLink: (newQuickLink: ClickableImageDocument) => void;
  onDeleteQuickLink: () => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const quickLinkStatus = useSelector(selectQuickLink.status);

  const { documents: quickLinkDocuments, options: quickLinkOptions } =
    useSelector((state) =>
      selectQuickLink.documentList(state, {
        active: true,
        sortBy: "label",
        orderBy: "asc"
      })
    );

  // states
  const [presetQuickLinkId, setPresetQuickLinkId] = useState<string>("");

  // event handlers
  const handleSelectPresetQuickLink = (selectedPresetQuickLinkId: string) => {
    onChangePresetQuickLinkIds([
      ...(presetQuickLinkId
        ? selectedPresetQuickLinkIds.filter((id) => id !== presetQuickLinkId)
        : selectedPresetQuickLinkIds),
      ...(selectedPresetQuickLinkId ? [selectedPresetQuickLinkId] : [])
    ]);

    setPresetQuickLinkId(selectedPresetQuickLinkId);
  };

  const handleDeleteQuickLink = () => {
    if (presetQuickLinkId) {
      onChangePresetQuickLinkIds(
        selectedPresetQuickLinkIds.filter((id) => id !== presetQuickLinkId)
      );
      setPresetQuickLinkId("");
    }
    onDeleteQuickLink();
  };

  // side effects
  useEffect(() => {
    if (quickLinkStatus === "idle") {
      dispatch(createQuickLinkAction.fetchDocumentList());
    }
  }, [quickLinkStatus, dispatch]);

  useEffect(() => {
    if (presetQuickLinkId && presetQuickLinkId !== "none") {
      const presetQuickLink = quickLinkDocuments.find(
        ({ _id }) => _id === presetQuickLinkId
      );

      if (presetQuickLink) {
        const newQuickLink = {
          ...quickLink,
          label: presetQuickLink.label,
          path: presetQuickLink.path
        };

        if (presetQuickLink.image) {
          newQuickLink.image = presetQuickLink.image as string;
        } else {
          delete newQuickLink.image;
        }

        onChangeQuickLink(newQuickLink as ClickableImageDocument);
      }
    } else if (presetQuickLinkId && presetQuickLinkId === "none") {
      onChangeQuickLink({
        ...quickLink,
        label: "",
        path: "",
        image: ""
      } as ClickableImageDocument);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetQuickLinkId, quickLinkDocuments]);

  return (
    <section className="flex flex-col gap-5 bg-ash/30 relative rounded-xl p-5 border border-ash">
      <div
        onClick={handleDeleteQuickLink}
        className="absolute -top-1.5 -right-1.5 rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
      <Input
        type="dropdown"
        name="quickLinkPreset"
        labelConfig={{
          label: "From Preset"
        }}
        isRequired={false}
        nullOption={false}
        options={[
          { label: "None", value: "none" },
          ...quickLinkOptions.filter(
            ({ value }) =>
              value === presetQuickLinkId ||
              !selectedPresetQuickLinkIds.includes(value)
          )
        ]}
        customValue={{
          value: presetQuickLinkId,
          setValue: handleSelectPresetQuickLink
        }}
        errorCheck={false}
        validCheck={false}
      />

      <div className="grid grid-cols-[1fr_5fr] grid-rows-[repeat(3,auto)] gap-4">
        <SelectImage
          name="image"
          label="Image"
          value={quickLink.image as string}
          onChangeValue={(image: string) => {
            onChangeQuickLink({
              ...quickLink,
              image
            } as ClickableImageDocument);
          }}
          layoutStyle="row-span-3 space-y-2 flex flex-col items-center"
          labelStyle="self-start pl-2"
        />
        <Input
          type="text"
          name="label"
          isRequired
          labelConfig={{
            label: "Label",
            layoutStyle: "mt-1 space-y-1"
          }}
          customValue={{
            value: quickLink.label || "",
            setValue: (label) => {
              onChangeQuickLink({
                ...quickLink,
                label
              } as ClickableImageDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Input
          type="text"
          name="path"
          isRequired
          labelConfig={{
            label: "Path",
            layoutStyle: "mt-0 space-y-1"
          }}
          customValue={{
            value: quickLink.path,
            setValue: (path) => {
              onChangeQuickLink({
                ...quickLink,
                path
              } as ClickableImageDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
      </div>
    </section>
  );
}
