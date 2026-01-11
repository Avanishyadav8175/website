"use client";

import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { WhatsappSVG } from "@/common/svgs/svg";
import { Children } from "@/common/types/reactTypes";
import { whatsappContact } from "@/common/utils/_contactDetails";
import { BASE_HOME_BG_COLOR } from "@/components/pages/(frontend)/Home/static/pallette";
import { Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalBG({ children }: { children: Children }) {
  const currPath = usePathname();
  const SMOKEN_BG_ROUTES = /^\/([a-zA-Z]{2,}(?!\/).*)?$/;

  const smokenBg =
    SMOKEN_BG_ROUTES.test(currPath) ||
    currPath.startsWith(FRONTEND_LINKS.SERVICE_PAGE) ||
    currPath.startsWith(FRONTEND_LINKS.PRODUCT_PAGE);

  const showStickyButtons = currPath !== "/cart";

  return (
    <div
      className={`relative flex flex-col items-stretch justify-start ${currPath.includes("/vendor/registration") ? "min-h-[3050px] sm:min-h-[2250px]" : "min-h-device"} relative ${smokenBg ? BASE_HOME_BG_COLOR : "bg-ivory-1"}`}
    >
      {children}

      {showStickyButtons && (
        <div className="text-white sticky bottom-0 left-full flex flex-col justify-start gap-4 sm:gap-5 h-[155px] sm:h-44 -mt-[155px] sm:-mt-44 w-fit pr-3 sm:pr-4">
          <Link
            href={whatsappContact()}
            target="_blank"
          >
            <div className="group aspect-square rounded-full p-4 bg-ivory-2 shadow-md border border-ash/50 text-purple-500 fill-purple-500 transition-all duration-300 cursor-pointer hover:bg-purple-500">
              <Phone
                width={24}
                height={24}
                strokeWidth={0.5}
                className="fill-purple-500 stroke-ivory-2 transition-all duration-300 group-hover:fill-ivory group-hover:stroke-purple-500"
              />
            </div>
          </Link>

          <Link
            href={whatsappContact()}
            target="_blank"
          >
            <div className="group aspect-square rounded-full p-4 bg-ivory-2 shadow-md border border-ash/50 text-green-600 transition-all duration-300 cursor-pointer hover:bg-green-600 hover:text-white">
              <WhatsappSVG
                dimensions={24}
                strokeWidth={0.1}
                className="fill-green-600 stroke-ivory-2 transition-all duration-100 scale-[1.35]"
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
