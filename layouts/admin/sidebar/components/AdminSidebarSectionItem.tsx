import { AdminPanelSection } from "@/common/types/layouts/admin/adminPanelLayout";
import Link from "next/link";
import { ChevronRight, Dot, Square } from "lucide-react";
import { type ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { DOMAIN } from "@/common/constants/domain";
import { XApiKey } from "@/common/constants/apiKey";

export default function AdminSidebarSectionItem({
  section,
  isMobile,
  isLocked,
  isActive,
  customHeight,
  rightSideComponent,
  isSubSection,
  toggleIsExpanded: setShowSubLinks
}: {
  section: AdminPanelSection;
  isMobile?: boolean;
  isLocked: boolean;
  isActive: boolean;
  customHeight?: string;
  rightSideComponent?: ReactNode;
  isSubSection?: boolean;
  toggleIsExpanded?: () => void;
}) {
  const { toast } = useToast();
  if ("path" in section)
    return (
      <Link
        href={section.path}
        prefetch
        className={`relative ${!isSubSection ? customHeight || "min-h-[calc(68px_-_20px)] h-[calc(68px_-_20px)] sm:min-h-[calc(68px_-_24px)] sm:h-[calc(68px_-_24px)] mt-3 *:py-2.5" : "h-9 min-h-9 sm:min-h-8 sm:h-8 mb-0.5"} grid grid-cols-[50px_12px_1fr] w-full sm:grid-cols-[calc(68px_-_24px)_12px_calc(300px_-_36px_-_calc(68px_-_24px))] items-center rounded-xl overflow-hidden cursor-pointer ${isActive && !isSubSection ? "bg-teal-600 text-ivory-1" : `bg-transparent ${customHeight ? "" : isSubSection ? "hover:text-charcoal-1 hover:font-semibold" : "hover:bg-[#f0f0f0]"}`} transition-all duration-300`}
      >
        <span className={`grid place-items-center rounded-xl`}>
          {isSubSection ? (
            !isActive ? (
              <Dot
                width={20}
                className="scale-150"
                stroke={"#383838"}
              />
            ) : (
              <Square
                width={12}
                fill={"#0d9488"}
                stroke={"#0d9488"}
              />
            )
          ) : (
            section.icon
          )}
        </span>
        <span
          className={
            isLocked || isMobile
              ? ""
              : `opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300`
          }
        ></span>
        <span
          className={`${isLocked || isMobile ? "" : "opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300"} ${isSubSection ? `text-sm ${isActive ? "text-teal-600 font-bold" : "text-charcoal-3"}` : ""}`}
        >
          {section.sectionLabel}
        </span>
        {rightSideComponent ? (
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${isLocked || isMobile ? "" : "opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300"}`}
          >
            {rightSideComponent}
          </div>
        ) : (
          <></>
        )}
      </Link>
    );

  if ("onConfirmAction" in section)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            onClick={
              section.askConfirmation ? () => {} : section.onConfirmAction
            }
            className={`relative ${!isSubSection ? customHeight || "min-h-[calc(68px_-_20px)] h-[calc(68px_-_20px)] sm:min-h-[calc(68px_-_24px)] sm:h-[calc(68px_-_24px)] mt-3 *:py-2.5" : "h-9 min-h-9 sm:min-h-8 sm:h-8 mb-0.5"} grid grid-cols-[50px_12px_1fr] w-full sm:grid-cols-[calc(68px_-_24px)_12px_calc(300px_-_36px_-_calc(68px_-_24px))] items-center rounded-xl overflow-hidden cursor-pointer ${isActive && !isSubSection ? "bg-teal-600 text-ivory-1" : `bg-transparent ${customHeight ? "" : isSubSection ? "hover:text-charcoal-1 hover:font-semibold" : "hover:bg-[#f0f0f0]"}`} transition-all duration-300`}
          >
            <span className={`grid place-items-center rounded-xl`}>
              {isSubSection ? (
                !isActive ? (
                  <Dot
                    strokeWidth={1.5}
                    width={20}
                    fill={"#383838"}
                    stroke={"#383838"}
                  />
                ) : (
                  <Dot
                    strokeWidth={1.5}
                    width={20}
                    fill={"#4f46e5"}
                    stroke={"#4f46e5"}
                    className={"scale-[2.5]"}
                  />
                )
              ) : (
                section.icon
              )}
            </span>
            <span
              className={
                isLocked || isMobile
                  ? ""
                  : `opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300`
              }
            ></span>
            <span
              className={`${isLocked || isMobile ? "" : "opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300"} ${isSubSection ? `text-sm ${isActive ? "text-teal-600 font-bold" : "text-charcoal-3"}` : ""}`}
            >
              {section.sectionLabel}
            </span>
            {rightSideComponent ? (
              <div
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${isLocked || isMobile ? "" : "opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300"}`}
              >
                {rightSideComponent}
              </div>
            ) : (
              <></>
            )}
          </div>
        </DialogTrigger>

        <DialogContent className="flex flex-col items-start justify-start gap-4 min-w-fit outline-none !z-[9398] w-[300px]">
          <div className="font-light text-2xl text-charcoal-3 pb-3">
            Confirm Action?
          </div>
          <div className="flex items-center justify-start gap-x-3">
            <DialogClose asChild>
              <span
                className="py-2 px-4 rounded-lg bg-teal-500 text-white cursor-pointer transition-all duration-300 hover:brightness-90"
                onClick={() => {
                  fetch(`${DOMAIN}/api/admin/reset-cache`, {
                    headers: { "x-api-key": XApiKey }
                  })
                    .then(async (val) => await val.json())
                    .then((val) => console.log({ val }));
                  toast({
                    title: "Success",
                    description: "Action completed",
                    variant: "success"
                  });
                }}
              >
                Confirm
              </span>
            </DialogClose>
            <DialogClose asChild>
              <span className="py-2 px-4 rounded-lg  cursor-pointer bg-charcoal-3/10 transition-all duration-300 hover:brightness-90">
                Cancel
              </span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <div
      onClick={setShowSubLinks}
      className={`relative ${!isSubSection ? customHeight || "min-h-[calc(68px_-_20px)] h-[calc(68px_-_20px)] sm:min-h-[calc(68px_-_24px)] sm:h-[calc(68px_-_24px)] mt-3 *:py-2.5" : "h-9 min-h-9 sm:min-h-8 sm:h-8 mb-0.5"} grid grid-cols-[50px_12px_1fr] w-full sm:grid-cols-[calc(68px_-_24px)_12px_calc(300px_-_36px_-_calc(68px_-_24px))] items-center rounded-xl overflow-hidden cursor-pointer ${isActive ? "bg-teal-600 text-ivory-1" : "bg-transparent hover:bg-[#f0f0f0]"} transition-all duration-300`}
    >
      <span className={`grid place-items-center rounded-xl`}>
        {section.icon}
      </span>
      <span
        className={
          isLocked || isMobile
            ? ""
            : `opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300`
        }
      ></span>
      <span
        className={
          isLocked || isMobile
            ? ""
            : `opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300`
        }
      >
        {section.sectionLabel}
      </span>
      {rightSideComponent ? (
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${isLocked || isMobile ? "" : "opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300"}`}
        >
          {rightSideComponent}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
