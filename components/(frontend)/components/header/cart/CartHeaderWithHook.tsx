"use client";

// icons
import { ArrowLeft, Phone } from "lucide-react";
import { WhatsappSVG } from "@/common/svgs/svg";

// constants
import { COMPANY_NUMBER } from "@/common/constants/companyDetails";

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

export default function CartHeader() {
  const router = useRouter();

  return (
    <HorizontalSpacing className="sticky z-[850] top-0 pt-3 pb-2 sm:col-span-2 flex items-center justify-between bg-ivory-1 sm:bg-ivory sm:py-3.5 sm:rounded-br-xl">
      <div className="flex items-center font-medium justify-start gap-3.5">
        <div
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft
            strokeWidth={1.5}
            className="max-sm:scale-[0.8] max-sm:translate-y-[0.5px]"
          />
        </div>
        <span className="max-sm:translate-y-[1px] sm:text-xl">{` Cart`}</span>
      </div>
      <Popover>
        <PopoverTrigger className="underline underline-offset-2 max-sm:text-xs text-charcoal-3/60">
          Need help?
        </PopoverTrigger>
        <PopoverContent className="outline-none grid  grid-cols-2 p-4 py-5 w-[250px] text-sm rounded-xl z-[900]">
          <Link
            href={whatsappContact()}
            prefetch
            target="_blank"
            className="flex items-center flex-col justify-center gap-1.5 cursor-pointer transition-all duration-300 hover:text-green-500 text-charcoal-3"
          >
            <div className="rounded-full grid place-items-center w-10 bg-green-500 text-white aspect-square">
              <WhatsappSVG dimensions={28} />
            </div>
            <span>Whatsapp Us</span>
          </Link>
          <Link
            href={`tel"${COMPANY_NUMBER}`}
            prefetch
            target="_blank"
            className="flex items-center flex-col justify-center gap-1.5 cursor-pointer transition-all duration-300 hover:text-amber-500 text-charcoal-3"
          >
            <div className="rounded-full grid place-items-center w-10 bg-amber-500 text-white aspect-square">
              <Phone
                width={21}
                height={21}
                strokeWidth={1.5}
              />
            </div>
            <span>Contact us</span>
          </Link>
        </PopoverContent>
      </Popover>
    </HorizontalSpacing>
  );
}
