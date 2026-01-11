// icons
import { Star } from "lucide-react";

// hooks
import { useLocation } from "@/hooks/useLocation/useLocation";
import { useSearch } from "@/hooks/useSearch/useSearch";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { alwaysDecimal } from "@/components/pages/(frontend)/Content/components/Details/helpers/alwaysDecimal";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

export default function SearchResultContent({
  content: { type, name, slug, media, quality, price: contentPrice }
}: {
  content: ContentDocument;
}) {
  // hooks
  const { onChangeKeyword } = useSearch();
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  // variables
  const contentSlug = `${FRONTEND_LINKS.PRODUCT_PAGE}/${slug}`;
  const { alt, defaultAlt, url } = media.primary as ImageDocument;
  const rating = quality?.rating?.value;
  const price = selectedCity
    ? contentPrice?.cities?.find(({ city }) => city === selectedCity._id)
      ?.price || contentPrice?.base?.price
    : contentPrice?.base?.price;

  return (
    <Link
      className="grid grid-cols-[53px_1fr] gap-2 sm:gap-3 items-start rounded-xl py-2 group hover:text-sienna"
      href={contentSlug}
      onClick={() => {
        onChangeKeyword("");
      }}
    >
      <div className="relative overflow-hidden aspect-square rounded-lg">
        <Image
          className="w-full h-full object-cover object-center"
          src={url}
          alt={alt || defaultAlt || "Content Image"}
          width={53}
          height={53}
          unoptimized={!OPTIMIZE_IMAGE}
          draggable={false}
          decoding="async"
        />
      </div>
      <section className="flex flex-col justify-start">
        <span className="pb-0.5 line-clamp-1 transition-all duration-300">
          {name}
        </span>
        <div className="flex items-center justify-between">
          <span className="font-medium transition-all duration-300 text-[17px]">{`₹${price}`}</span>
          {rating && (
            <section className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-md">
              <Star
                fill="#fff"
                width={12}
                height={12}
              />
              <span className="text-xs font-semibold">
                {alwaysDecimal(rating)}
              </span>
            </section>
          )}
        </div>
      </section>
    </Link>
  );
}
