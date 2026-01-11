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

export default function NavQuickLink({
  index,
  quickLink,
  label,
  onChangeQuickLink,
  onDeleteQuickLink
}: {
  index: number;
  quickLink: ClickableImageDocument;
  label?: string;
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

  // state
  const [presetQuickLinkId, setPresetQuickLinkId] = useState<string>("");

  // effects
  useEffect(() => {
    if (quickLinkStatus === "idle") {
      dispatch(createQuickLinkAction.fetchDocuments());
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
    <section className="flex flex-col gap-5 w-40">
      <section className="flex justify-between">
        <span>{`${label || "Quick Link"} ${index + 1}`}</span>
        <div
          onClick={() => {
            onDeleteQuickLink();
          }}
          className="rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
        >
          <X
            strokeWidth={1.5}
            width={16}
            height={16}
          />
        </div>
      </section>
      <div className="flex flex-col gap-4">
        <SelectImage
          name="quick-link-image"
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
          name="quick-link-label"
          isRequired={false}
          labelConfig={{
            label: ""
          }}
          placeholder="label"
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
            label: ""
          }}
          placeholder="path"
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
