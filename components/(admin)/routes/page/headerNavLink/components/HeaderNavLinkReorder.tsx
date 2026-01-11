import {
  createHeaderNavLinkAction,
  selectHeaderNavLink
} from "@/store/features/pages/headerNavLinkSlice";
import { useDispatch, useSelector } from "@/store/withType";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect } from "react";

export default function HeaderNavLinkReorder({
  currentId,
  showTrash,
  sortBy,
  orderBy
}: {
  currentId: string;
  showTrash: boolean;
  sortBy: string;
  orderBy: string;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const headerNavLinkStatus = useSelector(selectHeaderNavLink.status);

  const { documents: headerNavLinks } = useSelector((state) =>
    selectHeaderNavLink.documentList(state, {
      deleted: false,
      sortBy: "order",
      orderBy: "asc"
    })
  );

  // variables
  const currentIndex = headerNavLinks.findIndex(
    (headerNavLink) => headerNavLink._id === currentId
  );
  const prevNavLink =
    currentIndex > 0 ? headerNavLinks[currentIndex - 1] : null;
  const currentNavLink =
    currentIndex >= 0 ? headerNavLinks[currentIndex] : null;
  const nextNavLink =
    currentIndex < headerNavLinks.length - 1
      ? headerNavLinks[currentIndex + 1]
      : null;

  // side effects
  useEffect(() => {
    if (headerNavLinkStatus === "idle") {
      dispatch(createHeaderNavLinkAction.fetchDocuments());
    }
  }, [headerNavLinkStatus, dispatch]);

  return (
    <section className="flex gap-2">
      <div
        className={`cursor-pointer ${!prevNavLink || showTrash || sortBy !== "order" || orderBy !== "asc" ? "text-charcoal-3/30 pointer-events-none" : ""}`}
        title="Move Up"
        onClick={
          currentNavLink && prevNavLink
            ? () => {
                dispatch(
                  createHeaderNavLinkAction.swapDocumentsOrder({
                    swapOrder: {
                      id1: currentNavLink?._id as string,
                      id2: prevNavLink?._id as string
                    }
                  })
                );
              }
            : () => {}
        }
      >
        <ArrowBigUp
          strokeWidth={1.5}
          width={24}
          height={24}
        />
      </div>
      <div
        className={`cursor-pointer ${!nextNavLink || showTrash || sortBy !== "order" || orderBy !== "asc" ? "text-charcoal-3/30 pointer-events-none" : ""}`}
        title="Move Down"
        onClick={
          currentNavLink && nextNavLink
            ? () => {
                dispatch(
                  createHeaderNavLinkAction.swapDocumentsOrder({
                    swapOrder: {
                      id1: currentNavLink?._id as string,
                      id2: nextNavLink?._id as string
                    }
                  })
                );
              }
            : () => {}
        }
      >
        <ArrowBigDown
          strokeWidth={1.5}
          width={24}
          height={24}
        />
      </div>
    </section>
  );
}
