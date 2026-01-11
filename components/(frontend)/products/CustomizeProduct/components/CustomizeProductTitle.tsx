import { Children } from "@/common/types/reactTypes";

export const CustomizeProductSpacing = ({
  children,
  title
}: {
  children: Children;
  title: string;
}) => (
  <div className="flex flex-col items-stretch justify-start gap-[18px] bg-ivory-1 pl-4 pr-3.5 sm:pl-7 sm:pr-2 max-sm:pt-6 max-sm:pb-5 sm:mb-4 max-sm:rounded-3xl max-sm:shadow-light">
    {title ? (
      <span className="relative text-[19px] sm:text-xl">
        {title}{" "}
        <span className="absolute -bottom-1.5 left-0 w-20 h-0.5 bg-sienna/60" />
      </span>
    ) : (
      <></>
    )}
    {children}
  </div>
);
