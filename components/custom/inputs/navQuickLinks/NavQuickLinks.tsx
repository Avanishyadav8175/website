// libraries
import mongoose from "mongoose";

// icons
import { Plus, PlusCircle } from "lucide-react";

// utils
import { getInitialQuickLinkValue } from "./utils/getInitialQuickLinkValue";
import { getInitialQuickLinksValue } from "./utils/getInitialQuickLinksValue";

// hooks
import { useEffect, useState } from "react";

// components
import NavQuickLink from "./components/NavQuickLink";

// types
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";
import { useDispatch, useSelector } from "@/store/withType";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";

export default function NavQuickLinks(
  props: {
    name: string;
    label?: string;
    itemLabel?: string;
    performReset?: boolean;
    defaultValue?: ClickableImageDocument[];
  } & (
    | {
        isRequired?: undefined;
      }
    | {
        isRequired?: boolean;
        label: string;
      }
  ) &
    (
      | {
          value?: undefined;
          defaultValue?: ClickableImageDocument[];
        }
      | {
          value?: ClickableImageDocument[];
          defaultValue?: undefined;
          onChangeValue: (newValue: ClickableImageDocument[]) => void;
        }
    )
) {
  // props
  const {
    name,
    label,
    itemLabel,
    isRequired,
    performReset,
    defaultValue,
    value
  } = props;

  // hooks
  const dispatch = useDispatch();

  // redux
  const imageStatus = useSelector(selectImage.status);

  // states
  const [quickLinks, setQuickLinks] = useState<ClickableImageDocument[]>(
    defaultValue && defaultValue.length
      ? defaultValue
      : getInitialQuickLinksValue()
  );

  // variables
  const returnValue = quickLinks
    .map((quickLink) => {
      const validQuickLink = { ...quickLink };

      if (!mongoose.Types.ObjectId.isValid(validQuickLink._id as string)) {
        delete validQuickLink._id;
      }

      return validQuickLink;
    })
    .filter(({ image, path }) => image && path);

  // handlers
  const handleAddQuickLink = () => {
    setQuickLinks([...quickLinks, getInitialQuickLinkValue()]);
  };

  const handleDeleteQuickLink = (quickLinkId: string) => {
    if (quickLinks.length === 1) {
      setQuickLinks(getInitialQuickLinksValue());
    } else {
      setQuickLinks([...quickLinks].filter(({ _id }) => _id !== quickLinkId));
    }
  };

  // effects
  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  useEffect(() => {
    if (defaultValue && defaultValue.length) {
      setQuickLinks(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      {label && (
        <div className="text-2xl font-medium text-teal-600 underline underline-offet-8 pt-4 pb-1">{label}</div>
      )}
      <section className="flex flex-col gap-5">
        <section className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-5">
          {quickLinks.map((quickLink, i) => (
            <NavQuickLink
              key={quickLink._id as string}
              index={i}
              quickLink={quickLink}
              label={itemLabel}
              onChangeQuickLink={(newQuickLink) => {
                setQuickLinks(
                  [...quickLinks].map((quickLink) =>
                    quickLink._id === newQuickLink._id
                      ? newQuickLink
                      : quickLink
                  )
                );
              }}
              onDeleteQuickLink={() => {
                handleDeleteQuickLink(quickLink._id as string);
              }}
            />
          ))}
        </section>
        <div
          onClick={handleAddQuickLink}
          className="flex justify-end"
        >
          <Plus
            className="rounded-lg p-2 text-teal-600 flex items-center justify-center col-span-4 cursor-pointer gap-1.5 transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
            strokeWidth={1.5}
            width={36}
            height={36}
          />
        </div>
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={returnValue.length ? JSON.stringify(returnValue) : ""}
        onChange={() => {}}
      />
    </>
  );
}
