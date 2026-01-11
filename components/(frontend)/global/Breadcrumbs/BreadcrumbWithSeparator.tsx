// components
import {
  BreadcrumbItem,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";

// types
import { type BreadcrumbsType } from "@/common/types/types";

export default function BreadcrumbWithSeparator({
  breadcrumb: { label, link },
  isLast
}: {
  breadcrumb: BreadcrumbsType;
  isLast: boolean;
}) {
  return (
    <>
      <BreadcrumbSeparator className="translate-y-px" />
      <BreadcrumbItem>
        <Link
          href={isLast ? "#" : link}
          prefetch={false}
          className={
            isLast
              ? "text-[14px] sm:text-[15px] font-semibold text-charcoal-3 whitespace-nowrap pointer-events-none"
              : "text-[14px] sm:text-[15px] font-semibold whitespace-nowrap text-charcoal-3/80"
          }
        >
          {label}
        </Link>
      </BreadcrumbItem>
    </>
  );
}
