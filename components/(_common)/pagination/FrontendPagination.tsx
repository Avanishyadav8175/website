// icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// components
import {
  Pagination as ShadCNPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem
} from "@/components/ui/pagination";
import Link from "next/link";

// decorators
import { BLOG_PAGINATION as BLOG_PAGINATIONS } from "@/common/decorators/pagination";

export default async function FrontendPagination({
  count,
  page,
  path,
  prefetch
}: {
  count: number;
  page: number;
  path: string;
  prefetch?: boolean;
}) {
  if (!count || count <= 1) {
    return <></>;
  }

  return (
    <div className="relative backdrop-blur-md bg-ivory-1/40 border rounded-xl px-1.5 flex items-center h-12 min-w-10 w-fit left-1/2 -translate-x-1/2">
      <ShadCNPagination className="text-neutral-500">
        <PaginationContent>
          <PaginationItem>
            <Link
              className={`${BLOG_PAGINATIONS.tile} flex items-center justify-center gap-1 p-2 pr-3 ${page === 1 ? "pointer-events-none" : ""}`}
              href={`${path}/${page - 1}`}
              prefetch={prefetch}
            >
              <ChevronLeft
                strokeWidth={2}
                width={16}
                height={16}
              />
              <span className="text-sm font-semibold">Prev</span>
            </Link>
          </PaginationItem>
          {count <= 7 ? (
            Array.from({ length: count }, (_, i) => i + 1).map(
              (pageIndex, i) => (
                <PaginationItem key={i}>
                  <Link
                    className={`${pageIndex === page ? BLOG_PAGINATIONS.active : BLOG_PAGINATIONS.tile} px-4 py-2`}
                    href={`${path}/${pageIndex}`}
                    prefetch={prefetch}
                  >
                    <span className="text-sm font-semibold">{pageIndex}</span>
                  </Link>
                </PaginationItem>
              )
            )
          ) : page <= 2 ? (
            <>
              {Array.from({ length: 5 }, (_, i) => i + 1).map(
                (pageIndex, i) => (
                  <PaginationItem key={i}>
                    <Link
                      className={`${pageIndex === page ? BLOG_PAGINATIONS.active : BLOG_PAGINATIONS.tile} px-4 py-2`}
                      href={`${path}/${pageIndex}`}
                      prefetch={prefetch}
                    >
                      <span className="text-sm font-semibold">{pageIndex}</span>
                    </Link>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationEllipsis className={BLOG_PAGINATIONS.tile} />
              </PaginationItem>
              <PaginationItem>
                <Link
                  className={`${BLOG_PAGINATIONS.tile} px-4 py-2`}
                  href={`${path}/${count}`}
                  prefetch={prefetch}
                >
                  <span className="text-sm font-semibold">{count}</span>
                </Link>
              </PaginationItem>
            </>
          ) : page >= count - 3 ? (
            <>
              <PaginationItem>
                <Link
                  className={`${BLOG_PAGINATIONS.tile} px-4 py-2`}
                  href={`${path}/${1}`}
                  prefetch={prefetch}
                >
                  <span className="text-sm font-semibold">{1}</span>
                </Link>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className={BLOG_PAGINATIONS.tile} />
              </PaginationItem>
              {Array.from({ length: 5 }, (_, i) => count - 4 + i).map(
                (pageIndex, i) => (
                  <PaginationItem key={i}>
                    <Link
                      className={`${pageIndex === page ? BLOG_PAGINATIONS.active : BLOG_PAGINATIONS.tile} px-4 py-2`}
                      href={`${path}/${pageIndex}`}
                      prefetch={prefetch}
                    >
                      <span className="text-sm font-semibold">{pageIndex}</span>
                    </Link>
                  </PaginationItem>
                )
              )}
            </>
          ) : (
            <>
              <PaginationItem>
                <Link
                  className={`${BLOG_PAGINATIONS.tile} px-4 py-2`}
                  href={`${path}/${1}`}
                  prefetch={prefetch}
                >
                  <span className="text-sm font-semibold">{1}</span>
                </Link>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className={BLOG_PAGINATIONS.tile} />
              </PaginationItem>
              {Array.from({ length: 3 }, (_, i) => page - 1 + i).map(
                (pageIndex, i) => (
                  <PaginationItem key={i}>
                    <Link
                      className={`${pageIndex === page ? BLOG_PAGINATIONS.active : BLOG_PAGINATIONS.tile} px-4 py-2`}
                      href={`${path}/${pageIndex}`}
                      prefetch={prefetch}
                    >
                      <span className="text-sm font-semibold">{pageIndex}</span>
                    </Link>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationEllipsis className={BLOG_PAGINATIONS.tile} />
              </PaginationItem>
              <PaginationItem>
                <Link
                  className={`${BLOG_PAGINATIONS.tile} px-4 py-2`}
                  href={`${path}/${count}`}
                  prefetch={prefetch}
                >
                  <span className="text-sm font-semibold">{count}</span>
                </Link>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <Link
              className={`${BLOG_PAGINATIONS.tile} flex items-center justify-center gap-1 p-2 pl-3 ${page === count ? "pointer-events-none" : ""}`}
              href={`${path}/${page + 1}`}
              prefetch={prefetch}
            >
              <span className="text-sm font-semibold">Next</span>
              <ChevronRight
                strokeWidth={2}
                width={16}
                height={16}
              />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </ShadCNPagination>
    </div>
  );
}
