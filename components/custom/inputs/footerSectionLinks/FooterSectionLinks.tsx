// libraries
import mongoose from "mongoose";

// icons
import { Plus } from "lucide-react";

// utils
import { getInitialFooterSectionLinkValue } from "./utils/getInitialFooterSectionLinkValue";

// hooks
import { useEffect, useState } from "react";

// components
import FooterSectionLink from "./FooterSectionLink";

// types
import { type FooterSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/footerSectionLink";

export default function FooterSectionLinks(
  props: {
    name: string;
    label?: string;
    itemLabel?: string;
    performReset?: boolean;
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
          defaultValue: FooterSectionLinkDocument[];
        }
      | {
          value: FooterSectionLinkDocument[];
          defaultValue?: undefined;
          onChangeValue: (newValue: FooterSectionLinkDocument[]) => void;
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
  const [links, setLinks] = useState<FooterSectionLinkDocument[]>(
    defaultValue && defaultValue.length
      ? defaultValue
      : [getInitialFooterSectionLinkValue()]
  );

  // variables
  const returnValue = links
    .map((link) => {
      const validLink = { ...link };

      if (!mongoose.Types.ObjectId.isValid(validLink._id as string)) {
        delete validLink._id;
      }

      return validLink;
    })
    .filter(({ label, path }) => label && path);

  // handlers
  const handleAddLink = () => {
    setLinks([...links, getInitialFooterSectionLinkValue()]);
  };

  const handleDeleteLink = (linkId: string) => {
    if (links.length === 1) {
      setLinks([getInitialFooterSectionLinkValue()]);
    } else {
      setLinks([...links].filter(({ _id }) => _id !== linkId));
    }
  };

  // effects
  useEffect(() => {
    if (defaultValue && defaultValue.length) {
      setLinks(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      {label && (
        <div className="text-2xl font-medium text-teal-600 underline underline-offet-8 pt-4 pb-1">{label}</div>
      )}
      <section className="flex flex-col gap-5">
        <section className="grid grid-cols-[24px_1fr_1fr_24px] items-center justify-center gap-5 text-center">
          <span>No</span>
          <span className="flex gap-1 justify-center">
            <span>Label</span>
            <span className="text-red-500">*</span>
          </span>
          <span className="flex gap-1 justify-center">
            <span>Path</span>
            <span className="text-red-500">*</span>
          </span>
          <span></span>
        </section>
        {links.map((link, i) => (
          <FooterSectionLink
            key={link._id as string}
            index={i}
            link={link}
            onChangeLink={(newLink) => {
              setLinks(
                [...links].map((link) =>
                  link._id === newLink._id ? newLink : link
                )
              );
            }}
            onDeleteLink={() => {
              handleDeleteLink(link._id as string);
            }}
          />
        ))}
        <div
          onClick={handleAddLink}
          className="flex items-center justify-end"
        >
          <Plus
            className="p-1 rounded-md text-teal-600 cursor-pointer transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
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
