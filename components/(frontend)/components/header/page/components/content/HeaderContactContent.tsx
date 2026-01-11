// icons
import { WhatsappSVG } from "@/common/svgs/svg";

// constants
import { HEADER_CONTACTS } from "./constants/headerContacts";

// utils
import { memo } from "react";
import { whatsappContact } from "@/common/utils/_contactDetails";

// components
import Link from "next/link";
import { PopoverContent } from "@/components/ui/popover";

function HeaderContactContent() {
  return (
    <PopoverContent
      sideOffset={10}
      className="z-[999] text-charcoal-3 outline-none border border-charcoal-3/10 rounded-2xl bg-ivory-1 px-2.5 py-3 flex flex-col justify-start *:flex *:cursor-pointer *:items-center *:justify-start *:gap-x-3 *:px-2.5 *:rounded-lg *:py-2 *:transition-all *:duration-300 w-[210px]"
    >
      {HEADER_CONTACTS.map(({ svg, label, link }, index) => (
        <Link
          key={index}
          href={link}
          prefetch={false}
          className="hover:bg-charcoal-3/10"
        >
          {svg}
          <span>{label}</span>
        </Link>
      ))}
      <div className="!h-px !py-0 w-full my-2 bg-gradient-to-r from-transparent via-charcoal-3/35 to-transparent" />
      <Link
        href={whatsappContact()}
        prefetch={false}
        className="hover:bg-green-100 hover:text-green-700 flex cursor-pointer items-center justify-start gap-x-3 px-2.5 rounded-lg py-2 transition-all duration-300 "
      >
        <WhatsappSVG
          dimensions={17}
          className="scale-125"
        />
        <span>{"Whatsapp Us"}</span>
      </Link>
    </PopoverContent>
  );
}

export default memo(HeaderContactContent);
