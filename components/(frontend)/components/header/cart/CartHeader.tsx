"use client";

// icons
import { ArrowLeft, Phone } from "lucide-react";
import { WhatsappSVG } from "@/common/svgs/svg";

// utils
import { whatsappContact } from "@/common/utils/_contactDetails";

// hooks
import { useRouter } from "next/navigation";

// components
import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useCart } from "@/hooks/useOptimizedCart/useCart";
import { useAppStates } from "@/hooks/useAppState/useAppState";

import { ContentDocument } from "@/common/types/documentation/contents/content";
import { COMPANY_NUMBER } from "@/common/constants/companyDetails";

export default function CartHeader() {
  const router = useRouter();
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();
  const { items } = useCart();

  const whatsappMessage = () =>
    `Hwllo, I am looking for these:
  ${items.map(({ content, pricePerUnit }) => `\nName: ${(content as ContentDocument).name || ""}\nPrice: ${pricePerUnit || ""}`)}
  \n${selectedCity ? `City: ${selectedCity.name}` : ""}`;

  return (
    <HorizontalSpacing className="sticky z-40 top-0 pt-4 pb-4 max-lg:border-b border-charcoal-3/20 lg:pb-2 lg:col-span-2 flex items-center justify-between bg-ivory-1 lg:bg-ivory-1 lg:py-5 lg:rounded-br-xl">
      <div className="flex items-center font-medium justify-start gap-2.5 lg:gap-3.5">
        <div
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft width={20} height={20} />
        </div>
        <span className="lg:text-xl">{`Shopping Cart`}</span>
      </div>
      {/* <Popover>
        <PopoverTrigger className="underline underline-offset-2 max-lg:text-xs text-charcoal-3/60">
          Need help?
        </PopoverTrigger>
        <PopoverContent className="outline-none grid  grid-cols-2 p-4 py-5 w-[250px] text-sm rounded-xl z-[900]">
         
        </PopoverContent>
      </Popover> */}

      <div className="text-sm font-medium flex items-center justify-end gap-x-3 lg:gap-x-5">
        <Link
          href={whatsappContact(whatsappMessage())}
          prefetch
          target="_blank"
          className="flex items-center justify-center gap-1 cursor-pointer transition-all duration-300 hover:underline hover:underline-offset-4 text-green-700"
        >
          <WhatsappSVG dimensions={20} />
          <span>Whatsapp</span>
        </Link>
        <Link
          href={`tel:"${COMPANY_NUMBER}`}
          prefetch
          target="_blank"
          className="flex items-center justify-center gap-1 cursor-pointer transition-all duration-300 hover:underline hover:underline-offset-4 text-blue-600"
        >
          <Phone
            width={15}
            height={15}
          />
          <span>Call Us</span>
        </Link>
      </div>
    </HorizontalSpacing>
  );
}
