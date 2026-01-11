// hooks
import { ReactNode, useEffect, useState } from "react";

// components
import TableLayoutTitle from "./components/TableLayoutTitle";
import TableLayoutQuerySidebar from "./components/TableLayoutQuerySidebar";
import TableLayoutPagination from "./components/TableLayoutPagination";
import TableContent from "@/components/(_common)/TableLayout/TableContent";

// types
import { type FilterOptionWithKeywordOptions } from "@/common/types/redux/filterOption";
import { type SelectOption } from "@/common/types/inputs";
import { type TableContent as TableContentType } from "@/components/(_common)/TableLayout/TableContent";

export default function TableLayout({
  title,
  content: table,
  pagination,
  controls,
  batchControls,
  query
}: {
  title: string;
  content: TableContentType;
  pagination?: {
    count: number;
    offset: number;
    limit: number;
    onChangeOffset: (newOffset: number) => void;
    onChangeLimit: (newLimit: number) => void;
  };
  controls?: {
    refresh?: {
      onRefresh: () => void;
    };
    add?: {
      onAdd: () => void;
    };
    trash?: {
      showTrash: boolean;
      toggleShowTrash: () => void;
    };
  };
  batchControls?: {
    selectedDocuments: string[];
    onSelectDocuments: (newSelectedDocuments: string[]) => void;
    getComponent: (
      showBatchControls: boolean,
      toggleShowBatchControls: () => void
    ) => ReactNode;
  };
  query?: {
    onReset: () => void;
    search?: {
      keyword: string;
      onChangeKeyword: (newKeyword: string) => void;
    };
    filter?: {
      options: FilterOptionWithKeywordOptions[];
      filterBy: string;
      keyword: string;
      onChangeFilterBy: (newFilterBy: string) => void;
      onChangeKeyword: (newKeyword: string) => void;
    };
    sort?: {
      options: SelectOption[];
      sortBy: string;
      orderBy: "asc" | "desc";
      onChangeSortBy: (newSortBy: string) => void;
      onChangeOrderBy: (newOrderBy: "asc" | "desc") => void;
    };
  };
}) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showBatchControls, setShowBatchControls] = useState<boolean>(false);

  useEffect(() => {
    if (!showBatchControls) {
      if (batchControls?.onSelectDocuments) {
        batchControls.onSelectDocuments([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBatchControls]);

  return (
    <div className="relative grid grid-cols-[1fr_auto]">
      <section>
        <TableLayoutTitle
          title={title}
          controls={{
            refresh: controls?.refresh,
            add: controls?.add,
            ...(query
              ? {
                  querySidebar: {
                    showSidebar,
                    toggleShowSidebar: () => {
                      setShowSidebar((prevShowSidebar) => !prevShowSidebar);
                    },
                    isResettable: Boolean(
                      query?.search?.keyword || query?.filter?.filterBy
                    ),
                    onReset: query.onReset
                  }
                }
              : {}),
            trash: controls?.trash
          }}
          batchControls={
            batchControls
              ? {
                  showBatchControls,
                  component: batchControls.getComponent(
                    showBatchControls,
                    () => {
                      setShowBatchControls(
                        (prevShowBatchControls) => !prevShowBatchControls
                      );
                    }
                  ),
                  toggleShowBatchControls: () => {
                    setShowBatchControls(
                      (prevShowBatchControls) => !prevShowBatchControls
                    );
                  }
                }
              : undefined
          }
        />
        <div className="pt-2 min-h-[calc(100dvh_-_82px)]">
          <TableContent
            content={table}
            mode={
              controls?.trash && controls.trash.showTrash
                ? "bale-moon"
                : "backend"
            }
            batchSelect={showBatchControls}
            onBatchSelect={batchControls?.onSelectDocuments}
          />
        </div>
        {pagination && (
          <TableLayoutPagination
            count={pagination.count}
            offset={pagination.offset}
            limit={pagination.limit}
            onChangeOffset={pagination.onChangeOffset}
          />
        )}
      </section>
      {query && (
        <TableLayoutQuerySidebar
          showSidebar={showSidebar}
          search={query.search}
          limit={
            pagination
              ? {
                  limit: pagination.limit,
                  onChangeLimit: pagination.onChangeLimit
                }
              : undefined
          }
          filter={query.filter}
          sort={query.sort}
        />
      )}
    </div>
  );
}
