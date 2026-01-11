import { Children } from "@/common/types/reactTypes";
import { BreadcrumbsType } from "@/common/types/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import BreadcrumbWithSeparator from "./BreadcrumbWithSeparator";

export default function Breadcrumbs({
  children,
  forceShowBreadcrumb,
  bgColor,
  perspective,
  breadcrumbs,
  hideInMobile
}: {
  children: Children;
  breadcrumbs: BreadcrumbsType[];
  forceShowBreadcrumb?: boolean;
  bgColor?: string;
  perspective?: string;
  hideInMobile?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col justify-start ${bgColor || ""}`}
      style={{
        perspective: perspective || "0px",
        transformStyle: "preserve-3d"
      }}
    >
      <div
        className={`${hideInMobile ? "max-sm:hidden" : ""} ${forceShowBreadcrumb ? "" : "max-sm:hidden"} px-3 1200:px-0 pt-1.5 pb-4 lg:pt-3 max-sm:pb-0 mt-3 sm:mt-2 lg:mt-3`}
      >
        <Breadcrumb className="overflow-x-scroll scrollbar-hide whitespace-nowrap flex-nowrap">
          <BreadcrumbList className="overflow-x-scroll scrollbar-hide whitespace-nowrap flex-nowrap">
            <BreadcrumbItem>
              <Link
                href={"/"}
                prefetch={false}
                className="text-[14px] sm:text-[15px] whitespace-nowrap font-semibold text-charcoal-3/80"
              >
                Home
              </Link>
            </BreadcrumbItem>
            {breadcrumbs.length &&
              breadcrumbs.map((breadcrumb, i) => (
                <BreadcrumbWithSeparator
                  key={i}
                  breadcrumb={breadcrumb}
                  isLast={i === breadcrumbs.length - 1}
                />
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </div>
  );
}
