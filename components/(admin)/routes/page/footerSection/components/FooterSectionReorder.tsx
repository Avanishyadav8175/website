// icons
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createFooterSectionAction,
  selectFooterSection
} from "@/store/features/pages/footerSectionSlice";

export default function FooterSectionReorder({
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
  const footerSectionStatus = useSelector(selectFooterSection.status);

  const { documents: footerSections } = useSelector((state) =>
    selectFooterSection.documentList(state, {
      deleted: false,
      sortBy: "order",
      orderBy: "asc"
    })
  );

  // variables
  const currentIndex = footerSections.findIndex(
    (headerNavLink) => headerNavLink._id === currentId
  );
  const prevSection =
    currentIndex > 0 ? footerSections[currentIndex - 1] : null;
  const currentNavLink =
    currentIndex >= 0 ? footerSections[currentIndex] : null;
  const nextSection =
    currentIndex < footerSections.length - 1
      ? footerSections[currentIndex + 1]
      : null;

  // side effects
  useEffect(() => {
    if (footerSectionStatus === "idle") {
      dispatch(createFooterSectionAction.fetchDocumentList());
    }
  }, [footerSectionStatus, dispatch]);

  return (
    <section className="flex gap-2">
      <div
        className={`cursor-pointer ${!prevSection || showTrash || sortBy !== "order" || orderBy !== "asc" ? "text-charcoal-3/30 pointer-events-none" : ""}`}
        title="Move Up"
        onClick={
          currentNavLink && prevSection
            ? () => {
                dispatch(
                  createFooterSectionAction.swapDocumentsOrder({
                    swapOrder: {
                      id1: currentNavLink?._id as string,
                      id2: prevSection?._id as string
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
        className={`cursor-pointer ${!nextSection || showTrash || sortBy !== "order" || orderBy !== "asc" ? "text-charcoal-3/30 pointer-events-none" : ""}`}
        title="Move Down"
        onClick={
          currentNavLink && nextSection
            ? () => {
                dispatch(
                  createFooterSectionAction.swapDocumentsOrder({
                    swapOrder: {
                      id1: currentNavLink?._id as string,
                      id2: nextSection?._id as string
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
