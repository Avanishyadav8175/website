"use client";
import { Children, ClassNameType } from "@/common/types/reactTypes";
import { usePathname } from "next/navigation";

export const HorizontalSpacing = ({
  children,
  className,
  inCategoryPage,
  id
}: {
  children: Children;
  className?: ClassNameType;
  inCategoryPage?: boolean;
  id?: string;
}) => {
  const currPath = usePathname();
  const isProductPage = currPath.includes("/n/");

  if (id)
    return (
      <div
        id={id}
        className={`${isProductPage ? "px-4" : "px-3"} ${inCategoryPage ? "1200:px-0" : "min-[1350px]:px-0"} ${className || ""}`}
      >
        {children}
      </div>
    );

  return (
    <div
      className={`${isProductPage ? "px-4" : "px-3"} ${inCategoryPage ? "1200:px-0" : "min-[1350px]:px-0"} ${className || ""}`}
    >
      {children}
    </div>
  );
};
