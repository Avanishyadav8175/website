import { Children, ClassNameType } from "@/common/types/reactTypes";

export const ProductSpacing = ({
  children,
  inCategoryPage,
  className
}: {
  children: Children;
  inCategoryPage?: boolean;
  className?: ClassNameType;
}) => {
  return (
    <div
      className={`px-0.5 sm:px-3 ${inCategoryPage ? "1200:px-0" : "min-[1350px]:px-0"} ${className || ""}`}
    >
      {children}
    </div>
  );
};
