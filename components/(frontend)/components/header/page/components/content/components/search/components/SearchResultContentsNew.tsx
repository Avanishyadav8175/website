// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { Star } from "lucide-react";

// constants
import { IS_MOBILE } from "@/common/constants/mediaQueries";

// utils
import { memo } from "react";
import { alwaysDecimal } from "@/components/pages/(frontend)/Content/components/Details/helpers/alwaysDecimal";

// hooks
import { useMediaQuery } from "usehooks-ts";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type SearchContentsType } from "../SearchContentUI";

function SearchResultContentsNew({
  contents,
  indices,
  collapse
}: {
  contents: SearchContentsType[];
  indices: number[];
  collapse: () => void;
}) {
  const isMobile = useMediaQuery(IS_MOBILE);

  return indices.length > 0 ? (
    <section className="flex flex-col relative sm:w-full">
      <span className="font-medium text-lg text-charcoal-3 max-sm:pt-1 pb-1">
        Products
      </span>
      <section className="relative flex flex-col gap-2 max-h-[75dvh] sm:max-h-[360px] overflow-y-scroll scrollbar-hide">
        {indices.slice(0, 300).map((i, index) => (
          <Link
            key={index}
            className="grid grid-cols-[53px_1fr] gap-2 sm:gap-3 items-start rounded-xl py-1 group hover:text-sienna"
            href={contents[i].slug}
            prefetch={false}
          >
            <div className="relative overflow-hidden aspect-square rounded-lg">
              <Image
                className="w-full h-full object-cover object-center"
                src={contents[i].image}
                alt={"Content Image"}
                width={53}
                height={53}
                unoptimized={!OPTIMIZE_IMAGE}
                draggable={false}
                decoding="async"
              />
            </div>
            <section className="flex flex-col justify-start">
              <span className="pb-0.5 line-clamp-1 transition-all duration-300">
                {contents[i].name}
              </span>
              <div className="flex items-center justify-between">
                <span className="font-medium transition-all duration-300 text-[17px]">{`₹${contents[i].price || contents[i].basePrice || 0}`}</span>
                {contents[i].rating > 0 ? (
                  <section className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-md">
                    <Star
                      fill="#fff"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs font-semibold">
                      {alwaysDecimal(contents[i].rating)}
                    </span>
                  </section>
                ) : (
                  <></>
                )}
              </div>
            </section>
          </Link>
        ))}
      </section>
    </section>
  ) : (
    <></>
  );
}

export default memo(SearchResultContentsNew);
