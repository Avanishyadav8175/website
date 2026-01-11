// icons
import { Plus } from "lucide-react";

// utils
import { getInitialHeaderNavLinkSectionLinkValue } from "../utils/getInitialHeaderNavLinkSectionLinkValue";

// components
import HeaderNavLinkSectionLink from "./HeaderNavLinkSectionLink";

// types
import { type HeaderNavLinkSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSectionLink";

export default function HeaderNavLinkSectionLinks({
  links,
  onChangeLinks
}: {
  links: HeaderNavLinkSectionLinkDocument[];
  onChangeLinks: (newLinks: HeaderNavLinkSectionLinkDocument[]) => void;
}) {
  // handlers
  const handleAddLink = () => {
    onChangeLinks([...links, getInitialHeaderNavLinkSectionLinkValue()]);
  };

  const handleDeleteLink = (linkId: string) => {
    if (links.length === 1) {
      onChangeLinks([getInitialHeaderNavLinkSectionLinkValue()]);
    } else {
      onChangeLinks([...links].filter(({ _id }) => _id !== linkId));
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <section className="grid grid-cols-[24px_1fr_1fr_1fr_24px] items-center justify-center gap-5 text-center">
        <span>No</span>
        <span className="flex gap-1 justify-center">
          <span>Label</span>
          <span className="text-red-500">*</span>
        </span>
        <span className="flex gap-1 justify-center">
          <span>Path</span>
          <span className="text-red-500">*</span>
        </span>
        <span>Tag</span>
        <span></span>
      </section>
      {links.map((link, i) => (
        <HeaderNavLinkSectionLink
          key={link._id as string}
          index={i}
          link={link}
          onChangeLink={(newLink) => {
            onChangeLinks(
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
  );
}
