import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  ArrowUpDown,
  EllipsisVertical,
  Filter,
  Parentheses,
  Reply,
  Trash
} from "lucide-react";
import { useEffect, useState } from "react";

export type ThreeDotsType = (
  | {
      hasTrash: false;
    }
  | { hasTrash: true; isTrashOpen: boolean; onSelectTrashBtn: () => void }
) &
  (
    | {
        hasFilter: false;
      }
    | {
        hasFilter: true;
        currFiltersApplied: string[];
        onSelectFilterBtn: () => void;
      }
  ) &
  (
    | {
        hasSort: false;
      }
    | {
        hasSort: true;
        currSortsApplied: string[];
        onSelectSortBtn: () => void;
      }
  ) &
  (
    | {
        hasLimit: false;
      }
    | {
        hasLimit: true;
        currLimitApplied: number;
        setCurrLimit: (newLimit: number) => void;
      }
  );

export default function AdminThreeDots(props: ThreeDotsType) {
  const { hasFilter, hasLimit, hasSort, hasTrash } = props;

  const [openLimit, setOpenLimit] = useState<boolean>(false);
  const [currLimit, setCurrLimit] = useState<number>(
    (hasLimit && props.currLimitApplied) || 0
  );
  useEffect(() => {
    if (hasLimit) props.setCurrLimit(currLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currLimit]);

  if (!hasFilter && !hasLimit && !hasSort && !hasTrash) return <></>;

  return (
    <Popover>
      <PopoverTrigger className="hover:bg-neutral-200">
        <EllipsisVertical
          strokeWidth={1.5}
          width={22}
          height={22}
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col justify-start gap-1 *:cursor-pointer *:rounded-xl p-3 rounded-xl max-w-[280px]">
        {/* FILTER ------------------------------------- */}
        {hasFilter && (
          <div
            onClick={props.onSelectFilterBtn}
            className="p-3 gap-4 grid grid-cols-[28px_1fr_auto] items-center transition-all duration-300 hover:bg-neutral-200/70"
          >
            <span className="grid place-items-center">
              <Filter
                strokeWidth={1.5}
                width={20}
                height={20}
              />
            </span>
            <span>Filter by</span>
            <span className="text-sm text-neutral-400">
              {props.currFiltersApplied.length
                ? props.currFiltersApplied.length > 1
                  ? `${props.currFiltersApplied.length} applied`
                  : props.currFiltersApplied[0]
                : ""}
            </span>
          </div>
        )}

        {/* SORT ------------------------------------- */}
        {hasSort && (
          <div
            onClick={props.onSelectSortBtn}
            className="p-3 gap-4 grid grid-cols-[28px_1fr_auto] items-center transition-all duration-300 hover:bg-neutral-200/70"
          >
            <span className="grid place-items-center">
              <ArrowUpDown
                strokeWidth={1.5}
                width={20}
                height={20}
              />
            </span>
            <span>Sort by</span>
            <span className="text-sm text-neutral-400">
              {props.currSortsApplied.length
                ? props.currSortsApplied.length > 1
                  ? `${props.currSortsApplied.length} applied`
                  : props.currSortsApplied[0]
                : ""}
            </span>
          </div>
        )}

        {/* LIMIT ------------------------------------- */}
        {hasLimit && (
          <div
            onClick={() => setOpenLimit((prev) => !prev)}
            className={`p-3 ${openLimit ? "h-[48px]" : "h-[90px]"} gap-x-4 grid grid-rows-[auto_42px] grid-cols-[28px_1fr_auto] items-center transition-all duration-300 hover:bg-neutral-200/70 overflow-hidden scrollbar-hide`}
          >
            <span className="grid place-items-center">
              <Parentheses
                strokeWidth={1.5}
                width={20}
                height={20}
              />
            </span>
            <span>Limit</span>
            <span className="text-sm text-neutral-400">{currLimit}</span>

            <span className="col-span-3">
              <input
                type="range"
                min={10}
                max={50}
                step={10}
                value={currLimit}
                onChange={(e) => setCurrLimit((prev) => Number(e.target.value))}
                className="w-full h-1.5 cursor-pointer"
              />
            </span>
          </div>
        )}

        {/* SHOW TRASH ---------------------------------- */}
        {hasTrash && (
          <>
            <div className="h-px w-full my-1 bg-neutral-300" />
            <div
              onClick={props.onSelectTrashBtn}
              className={`p-3 gap-4 grid grid-cols-[28px_1fr] items-center transition-all duration-300 ${props.isTrashOpen ? "hover:bg-teal-200/50 text-teal-500" : "hover:bg-rose-200/50 text-red-500"}`}
            >
              <span className="grid place-items-center">
                {props.isTrashOpen ? (
                  <Reply
                    strokeWidth={1.5}
                    width={20}
                    height={20}
                  />
                ) : (
                  <Trash
                    strokeWidth={1.5}
                    width={20}
                    height={20}
                  />
                )}
              </span>
              <span>{props.isTrashOpen ? "Exit Trash" : "Show Trash"}</span>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
