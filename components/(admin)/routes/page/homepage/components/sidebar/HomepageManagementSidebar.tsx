import { SetStateType } from "@/common/types/reactTypes";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  LayoutTemplate,
  Plus,
  RotateCcw,
  Shell,
  TentTree,
  Trash2,
  X
} from "lucide-react";
import { HomepageLayoutType } from "../../HomepageManagement";
import SidebarLayoutBlock from "./SidebarLayoutBlock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { revalidateHomepageCache } from "@/components/(admin)/routes/cache/revalidate/requests/revalidateHomepageCache";
import { useToast } from "@/components/ui/use-toast";

export default function HomepageManagementSidebar({
  layouts,
  moveLayoutUp,
  moveLayoutDown,
  showSidebar,
  setShowSidebar,
  triggerLayoutAddition,
  triggerDropAll,
  showDisabled,
  toggleShowDisabled,
  toggleExtraSpacing,
  toggleLeftAlign,
  handleHover,
  onSave,
  currViewMode,
  toggleViewMode
}: {
  layouts: HomepageLayoutType[];
  moveLayoutUp: (id: string) => void;
  moveLayoutDown: (id: string) => void;
  showSidebar: boolean;
  setShowSidebar: SetStateType<boolean>;
  triggerLayoutAddition: () => void;
  triggerDropAll: () => void;
  showDisabled: boolean;
  toggleShowDisabled: () => void;
  toggleLeftAlign: (id: string, toggleValue: boolean) => void;
  toggleExtraSpacing: (id: string, toggleValue: boolean) => void;
  handleHover: (id: string) => void;
  onSave: () => void;
  currViewMode: "pc" | "mobile";
  toggleViewMode: () => void;
}) {
  return (
    <section
      className={`pl-[17px] relative border-l border-charcoal-3/25 grid grid-cols-1 grid-rows-[auto_1fr] gap-2 transition-all duration-300 overflow-x-hidden overflow-hidden scrollbar-hide h-[calc(100%_+_6px)] ${showSidebar ? "min-w-[300px] max-w-[300px]" : "min-w-[60px] max-w-[60px]"}`}
    >
      {/* HEADER ------------------------------------ */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => setShowSidebar((prev) => !prev)}
          className="p-2.5 cursor-pointer transition-all duration-300 hover:bg-charcoal-3/10 aspect-square rounded-full"
        >
          <ArrowLeft
            strokeWidth={1.5}
            width={22}
            height={22}
            className={`transition-all duration-300 ${showSidebar ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        <div
          className={`transition-all duration-300 flex items-center justify-end gap-1 ${showSidebar ? "opacity-100" : "opacity-0"}`}
        >
          <LayoutActions
            triggerLayoutAddition={triggerLayoutAddition}
            triggerDropAll={triggerDropAll}
            showDisabled={showDisabled}
            toggleShowDisabled={toggleShowDisabled}
            emptyLayouts={layouts.length === 0}
          />
        </div>
      </div>

      {/* <div
        className={`${showSidebar ? "opacity-100" : "opacity-0"} pb-2 sticky top-4 w-full grid grid-cols-2 gap-x-3 text-sm text-center *:rounded-full *:p-1 transition-all duration-300`}
      >
        <div className="text-sm text-left flex items-center justify-start gap-1 text-charcoal-3/70 font-medium">
          <LayoutTemplate
            width={15}
            height={15}
            className="-translate-y-px"
          />{" "}
          {layouts.length} layouts
        </div>

        <div
          onClick={toggleViewMode}
          className={`relative overflow-hidden cursor-pointer transition-all duration-300 text-white group ${currViewMode === "mobile" ? "bg-gradient-to-br from-sky-200/90 to-teal-500" : "bg-gradient-to-br from-teal-50/80 to-teal-200/50 !text-teal-400  transition-all duration-300"}`}
        >
          <span className="">
            {currViewMode === "pc" ? "Desktop" : "Mobile"} View
          </span>
          <div
            className={`z-0 absolute w-full h-full flex items-center justify-center *:-translate-y-px ${currViewMode === "mobile" ? "bg-gradient-to-br from-transparent to-teal-700" : "bg-gradient-to-br from-transparent to-teal-200"} left-0 top-0 group-hover:opacity-100 opacity-0 transition-all duration-300`}
          >
            <span className="transition-all duration-300">
              {currViewMode === "pc" ? "Desktop" : "Mobile"} View
            </span>
          </div>
        </div>
      </div> */}

      {/* COLLAPSED SIDEBAR ITEMS ------------------ */}
      <div
        className={`z-40 flex flex-col items-start justify-center gap-4 absolute left-[17px] top-1/2 -translate-y-1/2 transition-all duration-300 ${showSidebar ? "-translate-x-10 opacity-0" : "translate-x-0 opacity-100"}`}
      >
        <LayoutActions
          triggerLayoutAddition={triggerLayoutAddition}
          triggerDropAll={triggerDropAll}
          showDisabled={showDisabled}
          toggleShowDisabled={toggleShowDisabled}
          emptyLayouts={layouts.length === 0}
        />
      </div>

      {/* SAVE BUTTON ---------------------- */}
      <div
        className={`z-40 gap-4 absolute left-[17px] bottom-0 transition-all duration-300 ${showSidebar ? "-translate-x-10 opacity-0" : "translate-x-0 opacity-100"}`}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={onSave}
                className="bg-green-500 text-white flex items-center justify-center rounded-full cursor-pointer w-[42px] h-[42px] hover:brightness-90 transition-all duration-300"
              >
                <Check
                  strokeWidth={1.5}
                  width={22}
                  height={22}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="px-2">Save</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        className={`border-t border-charcoal-3/20 relative overflow-y-scroll scrollbar-hide flex flex-col justify-start gap-3 items-stretch h-[calc(100dvh_-_64px)] transition-all duration-300 ${showSidebar ? "opacity-100" : "opacity-0"}`}
      >
        <div className="z-30 sticky top-0 bg-gradient-to-b from-white from-10% to-transparent w-full h-2.5" />
        {layouts.length === 0 ? (
          <EmptyLayoutsUI />
        ) : (
          layouts
            .slice()
            .filter(({ isDisabled }) => {
              return isDisabled === undefined
                ? true
                : showDisabled
                  ? true
                  : !isDisabled;
            })
            .sort(
              (a: HomepageLayoutType, b: HomepageLayoutType) =>
                a.order - b.order
            )
            .map((layout, index) => {
              const { _id, tag, type, isDisabled } = layout;

              return (
                <SidebarLayoutBlock
                  tag={tag}
                  label={
                    tag === "title"
                      ? (`"${layout.type === "title" ? layout.data : ""}"` as string)
                      : (`${(Math.floor(Math.random() * 1000) % 9) + 1} items` as string)
                  }
                  onHover={() => {
                    if (showSidebar) handleHover(_id);
                  }}
                  onMoveDown={() => moveLayoutDown(_id)}
                  onMoveUp={() => moveLayoutUp(_id)}
                  onToggle={
                    tag === "title"
                      ? (val: boolean) => toggleLeftAlign(_id, val)
                      : (val: boolean) => toggleExtraSpacing(_id, val)
                  }
                  toggled={
                    type === "title"
                      ? layout.leftAlign || false
                      : layout.extraSpacing || false
                  }
                  key={index}
                  toggleLabel={
                    type === "component" ? "Extra Padding" : "Left Align"
                  }
                  disabled={isDisabled || false}
                />
              );
            })
        )}

        <div className="z-30 flex items-end justify-end sticky bottom-4 mt-16 w-fit left-full">
          <div
            onClick={onSave}
            className=" bg-green-500 text-white rounded-full flex items-center justify-end gap-3 p-3.5 px-6 text-[17px] w-fit hover:brightness-90 cursor-pointer transition-all duration-300"
          >
            <Check
              strokeWidth={1.5}
              width={22}
              height={22}
            />
            <span>Save</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const LayoutActions = ({
  triggerDropAll,
  triggerLayoutAddition,
  showDisabled,
  toggleShowDisabled,
  emptyLayouts
}: {
  triggerLayoutAddition: () => void;
  triggerDropAll: () => void;
  showDisabled: boolean;
  toggleShowDisabled: () => void;
  emptyLayouts: boolean;
}) => {
  const { toast } = useToast();

  // event handlers
  const handleClick = () => {
    revalidateHomepageCache()
      .then(() => {
        toast({
          variant: "success",
          title: "Success",
          description: `Successfully Revalidate Homepage`
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: `Couldn't Revalidate Homepage`
        });
      });
  };

  return (
    <>
      <div
        onClick={triggerLayoutAddition}
        className="p-2.5 cursor-pointer transition-all duration-300 hover:bg-charcoal-3/10 aspect-square rounded-full"
      >
        <Plus
          strokeWidth={1.5}
          width={22}
          height={22}
        />
      </div>

      <div
        onClick={handleClick}
        className="p-2.5 cursor-pointer transition-all duration-300 hover:bg-charcoal-3/10 aspect-square rounded-full"
      >
        <RotateCcw
          strokeWidth={1.5}
          width={22}
          height={22}
        />
      </div>

      {!emptyLayouts ? (
        <>
          {/* <div
          onClick={toggleShowDisabled}
          className="p-2.5 cursor-pointer transition-all duration-300 hover:bg-charcoal-3/10 aspect-square rounded-full"
        >
          {showDisabled ? (
            <Eye
              strokeWidth={1.5}
              width={22}
              height={22}
            />
          ) : (
            <EyeOff
              strokeWidth={1.5}
              width={22}
              height={22}
            />
          )}
        </div> */}

          <div
            onClick={triggerDropAll}
            className="p-2.5 cursor-pointer transition-all duration-300 hover:bg-rose-50 hover:text-rose-600 aspect-square rounded-full"
          >
            <Trash2
              strokeWidth={1.5}
              width={22}
              height={22}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const EmptyLayoutsUI = () => (
  <div className="text-center flex flex-col items-center justify-center gap-3  text-sm text-charcoal-3/90">
    <X
      strokeWidth={1}
      width={40}
      height={40}
    />
    <span>No Layouts Added</span>
    <span className="mt-14">
      Click on &quot;+&quot; icon on top <br /> to start.
    </span>
  </div>
);
