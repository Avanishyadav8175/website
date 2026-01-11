// constants
import { IS_MOBILE } from "@/common/constants/mediaQueries";

// hooks
import { useMediaQuery } from "usehooks-ts";

// components
import {
  Pagination as ShadCNPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

// decorators
import PAGINATION from "@/common/decorators/pagination";

export default function TableLayoutPagination({
  count,
  offset,
  limit,
  onChangeOffset
}: {
  count: number;
  offset: number;
  limit: number;
  onChangeOffset: (newOffset: number) => void;
}) {
  const isMobile = useMediaQuery(IS_MOBILE);

  const pageCount = Math.ceil(count / limit);

  const currentPageIndex = Math.floor(offset / limit);

  const handleChangePage = (pageIndex: number) => {
    onChangeOffset(pageIndex * limit);
  };

  if (!pageCount || pageCount <= 1) {
    return <></>;
  }

  return (
    <section className="sticky bottom-2 left-0 !z-[200] flex items-center justify-center w-full">
      <div className="backdrop-blur-md bg-ivory-1/40 border rounded-xl px-1.5 flex items-center h-12 min-w-10 w-fit">
        <ShadCNPagination className="text-neutral-500">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={PAGINATION.tile}
                onClick={
                  currentPageIndex === 0
                    ? undefined
                    : () => {
                        handleChangePage(currentPageIndex - 1);
                      }
                }
              />
            </PaginationItem>
            {pageCount <= (isMobile ? 5 : 7) ? (
              Array.from({ length: pageCount }, (_, i) => i).map(
                (pageIndex, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className={
                        pageIndex === currentPageIndex
                          ? PAGINATION.active
                          : PAGINATION.tile
                      }
                      onClick={() => {
                        handleChangePage(pageIndex);
                      }}
                    >
                      {pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )
            ) : currentPageIndex <= 2 ? (
              <>
                {Array.from({ length: isMobile ? 3 : 5 }, (_, i) => i).map(
                  (pageIndex, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        className={
                          pageIndex === currentPageIndex
                            ? PAGINATION.active
                            : PAGINATION.tile
                        }
                        onClick={() => {
                          handleChangePage(pageIndex);
                        }}
                      >
                        {pageIndex + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationEllipsis className={PAGINATION.tile} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={PAGINATION.tile}
                    onClick={() => {
                      handleChangePage(pageCount - 1);
                    }}
                  >
                    {pageCount}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : currentPageIndex >= pageCount - 3 ? (
              <>
                <PaginationItem>
                  <PaginationLink
                    className={PAGINATION.tile}
                    onClick={() => {
                      handleChangePage(0);
                    }}
                  >
                    {1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className={PAGINATION.tile} />
                </PaginationItem>
                {Array.from(
                  { length: isMobile ? 3 : 5 },
                  (_, i) => pageCount - (isMobile ? 3 : 5) + i
                ).map((pageIndex, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className={
                        pageIndex === currentPageIndex
                          ? PAGINATION.active
                          : PAGINATION.tile
                      }
                      onClick={() => {
                        handleChangePage(pageIndex);
                      }}
                    >
                      {pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
            ) : (
              <>
                <PaginationItem>
                  <PaginationLink
                    className={PAGINATION.tile}
                    onClick={() => {
                      handleChangePage(0);
                    }}
                  >
                    {1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className={PAGINATION.tile} />
                </PaginationItem>
                {Array.from(
                  { length: isMobile ? 1 : 3 },
                  (_, i) => currentPageIndex - (isMobile ? 0 : 1) + i
                ).map((pageIndex, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className={
                        pageIndex === currentPageIndex
                          ? PAGINATION.active
                          : PAGINATION.tile
                      }
                      onClick={() => {
                        handleChangePage(pageIndex);
                      }}
                    >
                      {pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis className={PAGINATION.tile} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={PAGINATION.tile}
                    onClick={() => {
                      handleChangePage(pageCount - 1);
                    }}
                  >
                    {pageCount}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                className={PAGINATION.tile}
                onClick={
                  currentPageIndex === pageCount - 1
                    ? undefined
                    : () => {
                        handleChangePage(currentPageIndex + 1);
                      }
                }
              />
            </PaginationItem>
          </PaginationContent>
        </ShadCNPagination>
      </div>
    </section>
  );
}
