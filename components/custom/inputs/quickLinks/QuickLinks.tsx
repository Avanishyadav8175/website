// libraries
import mongoose from "mongoose";

// icons
import { Plus } from "lucide-react";

// utils
import { getInitialQuickLinkValue } from "./utils/getInitialQuickLinkValue";
import { getInitialQuickLinksValue } from "./utils/getInitialQuickLinksValue";

// hooks
import { useEffect, useState } from "react";

// components
import QuickLink from "./components/QuickLink";

// types
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";
import { FormSubSubTitle } from "../title/Form";

export default function QuickLinks(
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

  // states
  const [quickLinks, setQuickLinks] = useState<ClickableImageDocument[]>(
    defaultValue && defaultValue.length
      ? defaultValue
      : getInitialQuickLinksValue()
  );
  const [selectedQuickLinkDocumentIds, setSelectedQuickLinkDocumentIds] =
    useState<string[]>([]);

  // variables
  const returnValue = quickLinks
    .map((quickLink) => {
      const validQuickLink = { ...quickLink };

      if (!mongoose.Types.ObjectId.isValid(validQuickLink._id as string)) {
        delete validQuickLink._id;
      }

      if (!validQuickLink.image) {
        delete validQuickLink.image;
      }

      return validQuickLink;
    })
    .filter(({ label, path }) => label && path);

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
    if (defaultValue && defaultValue.length) {
      setQuickLinks(defaultValue);
    }
  }, [defaultValue]);

  // useEffect(() => {
  //   console.log({ returnValue });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [quickLinks]);

  return (
    <>
      {label && (
        <FormSubSubTitle subtitle={label} />
      )}
      <section className="flex flex-col gap-5">
        {quickLinks.map((quickLink, i) => (
          <QuickLink
            key={quickLink._id as string}
            index={i}
            label={itemLabel}
            selectedPresetQuickLinkIds={selectedQuickLinkDocumentIds}
            quickLink={quickLink}
            onChangePresetQuickLinkIds={setSelectedQuickLinkDocumentIds}
            onChangeQuickLink={(newQuickLink) => {
              setQuickLinks(
                [...quickLinks].map((quickLink) =>
                  quickLink._id === newQuickLink._id ? newQuickLink : quickLink
                )
              );
            }}
            onDeleteQuickLink={() => {
              handleDeleteQuickLink(quickLink._id as string);
            }}
          />
        ))}
        <div
          onClick={handleAddQuickLink}
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
