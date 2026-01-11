// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// libraries
import moment from "moment";

// icons
import { Check, Sprout, Truck, X } from "lucide-react";

// constants
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

// utils
import { getCustomVariant } from "@/hooks/useOptimizedCart/utils/getCustomVariant";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ImageDocument } from "@/common/types/documentation/media/image";

export default function CustomerOrderItem({
  item
}: {
  item: CartItemDocument;
}) {
  // variables
  const content = item.content as ContentDocument;
  const customVariant = item.customVariant
    ? getCustomVariant({ content, variantId: item.customVariant })
    : null;
  const name = customVariant ? customVariant.name : content.name;
  const { alt, defaultAlt, url } = customVariant?.image
    ? customVariant.image
    : (content.media.primary as ImageDocument);

  return (
    <Link
      className="grid grid-cols-[50px_1fr] items-center min-w-[260px] gap-2.5"
      href={`${content.type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`}
    >
      <div className="aspect-square bg-ivory rounded-lg overflow-hidden relative">
        <Image
          className="w-full h-full object-cover object-center"
          src={url}
          alt={alt || defaultAlt || "Content Image"}
          width={60}
          height={60}
          priority
          unoptimized={!OPTIMIZE_IMAGE}
          decoding="async"
          draggable={false}
        />
      </div>

      <section>
        {/* Title -------------------- */}
        <span className="text-charcoal-2 text-sm font-medium">{`${name.slice(0, 22)}${name.length > 25 ? "..." : ""}`}</span>

        {/* Delivery by ---------------- */}
        <span className="flex gap-1 text-xs text-charcoal-3">
          <span>{content.type === "product" ? "Delivery by" : "Event on"}</span>
          {item.delivery.date ? (
            <span className="font-semibold">
              {moment(item.delivery.date).format("Do MMM YYYY")}
            </span>
          ) : (
            <></>
          )}
        </span>

        {/* STATUS ---------------- */}
        <div className="flex items-center justify-start gap-1">
          {item.status === "completed" ? (
            <>
              <Check
                className="text-green-600 translate-y-px"
                width={14}
                height={14}
              />
              <span className="text-green-600 text-xs font-medium">
                Delivered
              </span>
            </>
          ) : item.status === "cancelled" ? (
            <>
              <X
                className="text-red-500"
                width={14}
                height={14}
              />
              <span className="text-red-500 text-xs font-medium">
                Cancelled
              </span>
            </>
          ) : (
            <>
              <Truck
                className="text-purple-500"
                width={14}
                height={14}
              />
              <span className="text-purple-500 text-xs font-medium">
                Upcoming
              </span>
            </>
          )}
        </div>
      </section>
    </Link>
  );
}
