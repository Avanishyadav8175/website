import { ReactNode } from "react";

export default function ContentCustomizeSection({
  children,
  title
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="relative flex flex-col items-stretch justify-start gap-[18px] bg-ivory-1 *:pl-4 pr-3.5 sm:*:pl-7 sm:pr-2 max-sm:pt-6 max-sm:pb-5 sm:mb-4 max-sm:rounded-3xl max-sm:shadow-light">
      <div className="absolute top-5 -z-0 left-0 w-full h-px bg-ivory-3" />
      {Boolean(title) && (
        <span className="text-sienna-1 z-10 bg-ivory-2 w-fit py-2 pr-6 rounded-r-xl font-medium text-[19px] sm:text-lg">
          {title}
        </span>
      )}
      {children}
    </div>
  );
}
