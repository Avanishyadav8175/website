import { ChangeEvent, memo, useEffect, useState } from "react";
import { capitalize } from "./utils/capitalize";
import { ModalType, TableModalWrapperButton } from "./TableModalWrapper";
import SortUI from "./components/SortUI";
import { SortType } from "@/common/types/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Children } from "@/common/types/reactTypes";
type TriggeredActionType = "function" | "none" | "component" | "modalButton";
type ItemActionType = {
  action: any;
  type: TriggeredActionType;
  modalType?: ModalType;
};
type T = string;

export type TableLabelType = "svg" | "image" | "text";
export type TableDataRowType = {
  value: {
    label: string | JSX.Element;
    type: TableLabelType;
    align?: CellAlignType;
  };
  action: ItemActionType;
}[];
export type CellAlignType = "left" | "center" | "right";
export type TableContent = {
  header: ({
    label: string;
    span: number;
    align?: CellAlignType;
  } & (
    | {
        sortable: true;
        currSortValue: SortType;
        setSortValue: () => void;
      }
    | { sortable: false }
  ))[];
  data: {
    cols: TableDataRowType;
    batchSelectData?: T;
    hoverData?: JSX.Element;
  }[];
  offset?: number;
};

export default function TableContent(
  props: {
    content: TableContent;
    mode?: "frontend" | "backend" | "bale-moon";
  } & (
    | { batchSelect?: false }
    | { batchSelect?: true; onBatchSelect?: (selectedValues: T[]) => void }
  )
) {
  const { content: data, mode, batchSelect } = props;

  const rowOffset = data.offset ? data.offset : 0;
  const gridTemplateColsRatio =
    "40px " +
    (batchSelect ? "32px " : "") +
    data.header.reduce((acc, el) => {
      return acc + `${el.span}fr `;
    }, "");

  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleItemAction = (obj: ItemActionType) => {
    const actionType = obj.type;
    switch (actionType) {
      case "none":
        return () => {};
      case "function":
        return obj.action();
    }
  };

  const handleRowCheck = (
    e: ChangeEvent<HTMLInputElement>,
    row: {
      cols: TableDataRowType;
      batchSelectData?: T;
    }
  ) => {
    const isChecked = e.target.checked;
    if (isChecked && row.batchSelectData) {
      const hasBatchCollectableData: boolean =
        Object.keys(row.batchSelectData).length > 0;

      if (hasBatchCollectableData)
        setSelectedRows((prev) => [...prev, row.batchSelectData as T]);
    }

    if (!isChecked && row.batchSelectData) {
      const hasBatchCollectableData: boolean =
        Object.keys(row.batchSelectData).length > 0;

      if (hasBatchCollectableData) {
        const returningDataEntries = Object.entries(row.batchSelectData);

        setSelectedRows((prev) =>
          prev.filter((vals) => {
            const entries = Object.entries(vals);
            let isNotAllowedToFilter: boolean = true;

            for (let i = 0; i < entries.length; i++)
              isNotAllowedToFilter &&=
                entries[i][0] === returningDataEntries[i][0] &&
                entries[i][1] === returningDataEntries[i][1];

            return !isNotAllowedToFilter;
          })
        );
      }
    }
  };

  useEffect(() => {
    if (!batchSelect) setSelectedRows((prev) => []);
  }, [batchSelect]);

  useEffect(() => {
    if (batchSelect && props.onBatchSelect) props.onBatchSelect(selectedRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows]);

  const tableTuples = data.data.map((row, index) => (
    <TooltipWrapper
      key={index}
      hoverData={row.hoverData}
    >
      <div
        className={
          mode && mode === "frontend"
            ? `group rounded-lg py-[8px] px-[12px] gap-[8px] grid bg-[#12121209] hover:bg-pink-300/80 transition-all duration-300 overflow-auto scrollbar-hide hover:shadow-lg hover:shadow-[#fe00ed15]`
            : mode === "bale-moon"
              ? `group py-[8px] px-[12px] gap-[8px] grid hover:bg-rose-50 transition-all duration-300 overflow-auto scrollbar-hide border border-transparent border-b-ash/50 hover:border-rose-200/70`
              : `group py-[8px] px-[12px] gap-[8px] grid hover:bg-teal-50 transition-all duration-300 overflow-auto scrollbar-hide border border-transparent border-b-ash/50 hover:border-teal-200/70`
        }
        style={{
          gridTemplateColumns: gridTemplateColsRatio
        }}
      >
        {batchSelect && (
          <span className="flex items-center text-[14px]">
            <input
              type="checkbox"
              name=""
              className="cursor-pointer accent-teal-500 w-4 h-4"
              checked={selectedRows.includes(row.batchSelectData as string)}
              onChange={(e) => handleRowCheck(e, row)}
            />
          </span>
        )}
        <span className="pl-[5px] flex items-center text-[14px]">
          {index + 1 + rowOffset}.
        </span>
        {row.cols.map((item, index2) => (
          <MemoizedTuple
            item={item}
            index={index}
            keyIndex={index2}
            key={index2}
            onClick={() => handleItemAction(item.action)}
          />
        ))}
      </div>
    </TooltipWrapper>
  ));

  return (
    <>
      <section
        className={`${mode && mode === "frontend" ? "" : "relative max-h-[calc(100dvh_-_90px)]"} max-1200:px-3.5 sm:px-0 pb-24 w-full grid grid-cols-1 justify-start items-start h-full overflow-scroll scrollbar-hide`}
      >
        <div
          className={`${mode && mode === "frontend" ? "" : "relative"} flex flex-col sm:w-full h-fit even:*:bg-transparent`}
        >
          {/* header ------------------------- */}
          <div
            className={`${mode && mode === "frontend" ? "bg-zinc-900 text-white" : mode === "bale-moon" ? "bg-rose-900 text-white" : "bg-zinc-900 text-white"} overflow-auto scrollbar-hide sticky top-0 p-3 grid mb-1 gap-2`}
            style={{
              gridTemplateColumns: gridTemplateColsRatio
            }}
          >
            {batchSelect && (
              <span className="flex items-center text-[14px]">
                <input
                  type="checkbox"
                  name=""
                  className="cursor-pointer accent-teal-500 w-4 h-4"
                  checked={selectedRows.length === data.data.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(
                        data.data.map(
                          ({ batchSelectData }) => batchSelectData as string
                        )
                      );
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </span>
            )}
            <span className="pl-[5px] text-[14px] flex items-center">Sl.</span>
            {data.header.map((head, index) => (
              <span
                key={index}
                onClick={head.sortable ? head.setSortValue : () => {}}
                className={
                  index === 0
                    ? `flex items-center gap-2 text-[14px] ${head.sortable ? "cursor-pointer" : ""} ${head.align === "left" ? "text-left justify-start" : head.align === "center" ? "text-center justify-center" : head.align === "right" ? "text-right justify-end" : "justify-start text-left"}`
                    : `flex items-center gap-2 text-[14px] ${head.sortable ? "cursor-pointer" : ""} ${head.align === "left" ? "text-left justify-start" : head.align === "center" ? "text-center justify-center" : head.align === "right" ? "text-right justify-end" : "justify-center text-center"}`
                }
              >
                <span>{capitalize(head.label)}</span>
                {head.sortable ? (
                  <SortUI sortValue={head.currSortValue} />
                ) : (
                  <></>
                )}
              </span>
            ))}
          </div>

          {/* table data ------------------------- */}
          {tableTuples}
        </div>
      </section>
    </>
  );
}

const MemoizedTuple = memo(Tuple);

function Tuple({
  item,
  index,
  keyIndex: index2,
  onClick
}: {
  item: {
    value: {
      label: string | JSX.Element;
      type: TableLabelType;
      align?: CellAlignType | undefined;
    };
    action: ItemActionType;
  };
  keyIndex: number;
  index: number;
  onClick: () => void;
}) {
  return item.action.type === "modalButton" ? (
    <TableModalWrapperButton
      key={index2}
      label={item.value.label}
      modalTitle="Confirm action"
      onClickTrigger={item.action.action}
      type="action"
      modalType={item.action.modalType ? item.action.modalType : "normal"}
      className={
        index2 === 0
          ? ` ${item.value.align === "left" ? "justify-start" : item.value.align === "center" ? "justify-center" : item.value.align === "right" ? "justify-end" : "justify-start"}`
          : `w-full flex items-center ${item.value.align === "left" ? "justify-start" : item.value.align === "center" ? "justify-center" : item.value.align === "right" ? "justify-end" : "justify-center"}`
      }
    />
  ) : item.action.type === "component" ? (
    <span
      className={`w-full h-full flex items-center ${item.value.align === "left" ? "justify-start" : item.value.align === "center" ? "justify-center" : item.value.align === "right" ? "justify-end" : index2 === 0 ? "justify-start" : "justify-center"} text-[14px]`}
      key={String(index2) + String(index)}
    >
      {item.value.label}
    </span>
  ) : (
    <span
      onClick={onClick}
      key={String(index2) + String(index)}
      className={
        index2 === 0
          ? ` text-[14px] flex items-center ${item.value.align === "left" ? "justify-start" : item.value.align === "center" ? "justify-center" : item.value.align === "right" ? "justify-end" : "justify-start"}`
          : `flex items-center text-[14px] ${item.value.align === "left" ? "justify-start" : item.value.align === "center" ? "justify-center" : item.value.align === "right" ? "justify-end" : "justify-center"}`
      }
    >
      {item.value.label}
    </span>
  );
}

const TooltipWrapper = ({
  children,
  hoverData
}: {
  children: Children;
  hoverData: JSX.Element | undefined;
}) =>
  hoverData === undefined ? (
    <>{children}</>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent asChild>{hoverData}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
