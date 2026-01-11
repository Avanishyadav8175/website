// icons
import { HeadsetIcon } from "lucide-react";
import { WhatsappSVG } from "@/common/svgs/svg";

// utils
import { mobileContact, whatsappContact } from "@/common/utils/_contactDetails";

// components
import Link from "next/link";

export default function FooterTopLeft() {
  return (
    <section className="flex flex-col items-center sm:items-start justify-start pb-6 sm:pb-10">
      <div>LOGO</div>
      <span className="text-charcoal/70 text-sm mt-5 sm:mt-8 max-sm:hidden">
        Reach out to us
      </span>
      <Link
        href={whatsappContact()}
        target="_blank"
        // prefetch
        className="flex items-center justify-start gap-1.5 text-charcoal-2/95 mt-1.5 mb-0.5 transition-all duration-300 hover:text-sienna hover:brightness-75 hover:underline hover:underline-offset-4 max-sm:hidden"
      >
        <WhatsappSVG
          strokeWidth={1}
          dimensions={26}
          className="min-w-[25px] grid place-items-center"
        />
        <span>Whatsapp</span>
      </Link>
      <Link
        href={mobileContact()}
        target="_blank"
        // prefetch
        className="flex items-center justify-start gap-1.5 text-charcoal-2/95 my-0.5 transition-all duration-300 hover:text-sienna hover:brightness-75 hover:underline hover:underline-offset-4 max-sm:hidden"
      >
        <HeadsetIcon
          strokeWidth={1.6}
          height={20}
          width={20}
          className="min-w-[25px] grid place-items-center"
        />
        <span>Contact Us</span>
      </Link>
    </section>
  );
}
