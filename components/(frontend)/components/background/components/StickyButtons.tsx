"use client";

// icons
import { Headset } from "lucide-react";
import { WhatsappSVG } from "@/common/svgs/svg";

// utils
import { whatsappContact } from "@/common/utils/_contactDetails";

// components
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CATEGORY_PAGE_REGEX,
  PRODUCT_PAGE_REGEX
} from "@/common/constants/regex";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/common/utils/storage/local";
import { DOMAIN } from "@/common/constants/domain";
import { fromSlug } from "@/common/utils/slugOperations";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { COMPANY_NAME, COMPANY_NUMBER } from "@/common/constants/companyDetails";

export default function StickyButtons() {
  const currPath = usePathname();
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  const [data, setData] = useState<object>({});
  const [msg, setMsg] = useState<string>("");

  const url = `${DOMAIN}${currPath}`;

  const isProductPage = PRODUCT_PAGE_REGEX.test(url);
  const isCategoryPage = !isProductPage ? CATEGORY_PAGE_REGEX.test(url) : false;

  useEffect(() => {
    if (isProductPage)
      setTimeout(() => {
        setData((prev) => getLocalStorage({ key: "whatsapp" }));
      }, 1000);
    else if (isCategoryPage)
      setData((prev) => ({
        link: url,
        name: fromSlug(currPath.split("/")[1]),
        city: selectedCity ? selectedCity.name : ""
      }));
    else setData((prev) => ({}));
  }, [url, selectedCity, isProductPage, isCategoryPage, currPath]);

  useEffect(() => {
    const whatsappMessage =
      typeof data === "object" && data && Object?.keys(data)?.length > 0
        ? isProductPage
          ? // @ts-ignore
          `Hi, I'm interested in the following product from ${COMPANY_NAME}:\nName: ${data?.name || ""}\nPrice: ${data?.price || "-"}\nCity: ${data?.city || "__Not selected__"}\n\n${data?.link || ""}`
          : isCategoryPage
            ? // @ts-ignore
            `Hi, I'm looking for ${data?.name || "items"} in ${COMPANY_NAME}${data?.city ? `\nCity: ${data?.city || ""}` : ""}`
            : ""
        : "";
    setMsg((prev) => whatsappMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div
      className={`text-white sticky bottom-0 left-full flex flex-col justify-start gap-3 lg:gap-5 h-64 lg:h-44 w-fit pr-3 lg:pr-4 z-40`}
    >
      {/* <Catalogue /> */}
      <Link
        href={whatsappContact(msg)}
        target="_blank"
        prefetch={false}
      >
        <div className="aspect-square rounded-lg p-3 lg:p-4 bg-ivory-1 lg:bg-ivory-2 shadow-md border border-ash/50 text-green-600 transition-all duration-300 cursor-pointer hover:bg-green-600 hover:text-white">
          <WhatsappSVG
            dimensions={24}
            strokeWidth={0.1}
            className="fill-green-600 stroke-ivory-2 transition-all duration-100 scale-[1.35]"
          />
        </div>
      </Link>
      <Link
        href={`tel:${COMPANY_NUMBER}`}
        target="_blank"
        prefetch={false}
      >
        <div className="group aspect-square rounded-lg p-3 lg:p-4 bg-ivory-1 lg:bg-ivory-2  shadow-md border border-ash/50 transition-all duration-300 cursor-pointer hover:bg-sienna-1">
          <Headset
            width={24}
            height={24}
            strokeWidth={1.5}
            className="stroke-sienna-1 group-hover:stroke-ivory-1 transition-all duration-300"
          />
        </div>
      </Link>
    </div>
  );
}
