// icons
import {
  Plus,
  Reply,
  Search,
  SquareMousePointer,
  SquareX
} from "lucide-react";

// types
import { type ReactNode } from "react";

export default function TableLayoutTitle({
  title,
  controls: { refresh, add, querySidebar, trash },
  batchControls
}: {
  title: string;
  controls: {
    refresh?: {
      onRefresh: () => void;
    };
    add?: {
      onAdd: () => void;
    };
    querySidebar?: {
      showSidebar: boolean;
      isResettable: boolean;
      toggleShowSidebar: () => void;
      onReset: () => void;
    };
    trash?: {
      showTrash: boolean;
      toggleShowTrash: () => void;
    };
  };
  batchControls?: {
    showBatchControls: boolean;
    component: ReactNode;
    toggleShowBatchControls: () => void;
  };
}) {
  return (
    <section className="flex items-center justify-between pt-10 sm:pt-6">
      <h2 className="text-3xl sm:text-xl pb-3 max-1200:px-3.5">
        {trash && trash.showTrash ? `TRASH: ${title}` : title}
      </h2>

      {!batchControls?.showBatchControls ? (
        <section className="flex items-center justify-end gap-1.5 sm:gap-2 *:cursor-pointer *:aspect-square *:p-2.5 *:rounded-full *:transition-all *:duration-300">
          {/* {refresh && (
            <span
              onClick={refresh.onRefresh}
              className="hover:bg-blue-100 hover:text-blue-700"
              title="Refresh Table"
            >
              <RefreshCcw
                strokeWidth={1.8}
                width={22}
                height={22}
              />
            </span>
          )} */}
          {add && (!trash || !trash.showTrash) && (
            <span
              onClick={add.onAdd}
              className="hover:bg-emerald-100 hover:text-emerald-700"
              title="Add New Document"
            >
              <Plus
                strokeWidth={1.8}
                width={22}
                height={22}
              />
            </span>
          )}
          {querySidebar && (
            <>
              <span
                onClick={querySidebar.toggleShowSidebar}
                className={
                  querySidebar.showSidebar
                    ? "bg-violet-100 text-violet-700"
                    : "hover:bg-violet-100 hover:text-violet-700"
                }
              >
                <Search
                  strokeWidth={2}
                  width={22}
                  height={22}
                  className="scale-90"
                />
              </span>
              {/* <span
                onClick={querySidebar.onReset}
                className={
                  querySidebar.isResettable
                    ? "bg-amber-100 text-amber-700"
                    : "hover:bg-amber-100 hover:text-amber-700"
                }
                title="Reset Query"
              >
                <RotateCcw
                  strokeWidth={2}
                  width={22}
                  height={22}
                  className={`scale-90 ${querySidebar.isResettable ? "text-amber-700" : ""}`}
                />
              </span> */}
            </>
          )}

          {batchControls && (
            <span
              onClick={batchControls.toggleShowBatchControls}
              className="hover:bg-blue-100 hover:text-blue-700"
              title="Batch Operations"
            >
              <SquareMousePointer
                strokeWidth={1.8}
                width={22}
                height={22}
              />
            </span>
          )}

          {trash && (
            <span
              onClick={trash.toggleShowTrash}
              className={
                trash.showTrash
                  ? "bg-teal-100 text-teal-700"
                  : "hover:text-rose-700 hover:bg-rose-100"
              }
            >
              {trash.showTrash ? (
                <Reply
                  strokeWidth={2}
                  width={20}
                  height={20}
                />
              ) : (
                <SquareX
                  className="text-rose-700"
                  strokeWidth={2}
                  width={20}
                  height={20}
                />
              )}
            </span>
          )}
        </section>
      ) : (
        batchControls.component
      )}
    </section>
  );
}
