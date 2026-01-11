// libraries
import mongoose from "mongoose";

// icons
import { Plus } from "lucide-react";

// utils
import { getInitialHeaderNavLinkSectionValue } from "./utils/getInitialHeaderNavLinkSectionValue";

// hooks
import { useEffect, useState } from "react";

// components
import HeaderNavLinkSection from "./components/HeaderNavLinkSection";

// types
import { type HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";
import { type HeaderNavLinkSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSectionLink";

export default function HeaderNavLinkSections(
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
          defaultValue: HeaderNavLinkSectionDocument[];
        }
      | {
          value: HeaderNavLinkSectionDocument[];
          defaultValue?: undefined;
          onChangeValue: (newValue: HeaderNavLinkSectionDocument[]) => void;
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
  const [sections, setSections] = useState<HeaderNavLinkSectionDocument[]>(
    defaultValue && defaultValue.length
      ? defaultValue
      : [getInitialHeaderNavLinkSectionValue()]
  );

  // variables
  const returnValue = sections
    .map((section) => {
      const validSection = { ...section };
      let validLinks =
        section?.links && section?.links?.length
          ? [...section.links]
          : undefined;

      if (validLinks && validLinks.length) {
        validLinks = validLinks.map((link) => {
          const validLink = { ...link };

          if (!mongoose.Types.ObjectId.isValid(validLink._id as string)) {
            delete validLink._id;
          }

          if (!validLink.tag) {
            delete validLink.tag;
          }

          return validLink as HeaderNavLinkSectionLinkDocument;
        });

        validSection.links = validLinks;
      }

      if (!mongoose.Types.ObjectId.isValid(validSection._id as string)) {
        delete validSection._id;
      }

      return validSection;
    })
    .filter(({ heading, links }) => heading && links && links.length);

  // handlers
  const handleAddSection = () => {
    setSections([...sections, getInitialHeaderNavLinkSectionValue()]);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (sections.length === 1) {
      setSections([getInitialHeaderNavLinkSectionValue()]);
    } else {
      setSections([...sections].filter(({ _id }) => _id !== sectionId));
    }
  };

  // effects
  useEffect(() => {
    if (defaultValue && defaultValue.length) {
      setSections(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      {label && (
        <div className="text-2xl font-medium text-teal-600 underline underline-offet-8 pt-4 pb-1">{label}</div>
      )}
      <section className="flex flex-col gap-5">
        {sections.map((section, i) => (
          <HeaderNavLinkSection
            key={section._id as string}
            index={i}
            section={section}
            label={itemLabel}
            onChangeSection={(newSection) => {
              setSections(
                [...sections].map((section) =>
                  section._id === newSection._id ? newSection : section
                )
              );
            }}
            onDeleteSection={() => {
              handleDeleteSection(section._id as string);
            }}
          />
        ))}
        <div
          onClick={handleAddSection}
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
