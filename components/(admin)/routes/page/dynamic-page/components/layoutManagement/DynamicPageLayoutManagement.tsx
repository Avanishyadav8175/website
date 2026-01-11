
"use client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ChevronLeft, CircleSlash2, Menu, Squircle } from "lucide-react";
import BentoHomepage from "@/components/pages/(frontend)/Home/BentoHomepage";
import { DynamicPageLayoutDocument } from "@/common/types/documentation/nestedDocuments/dynamicPageLayout";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { DynamicLayoutStructure } from "../../utils/types";
import { getDynamicPageStructure } from "../../utils/utils";
import { getDynamicPageLayoutDocumentDataToSave } from "../../utils/getDynamicPageLayoutDocumentDataToSave";
import HomepageManagementSidebar from "../sidebar/HomepageManagementSidebar";
import DeleteConfirmDialog from "../dialogs/DeleteConfirmDialog";
import SaveDataConfirmDialog from "../dialogs/SaveDataConfirmDialog";
import NewOrEditLayoutDialog from "../dialogs/NewOrEditLayoutDialog";

export default function DynamicPageLayoutManagement({
  initialLayouts,
  images,
  contents,
  saveUpdatedLayouts
}: {
  initialLayouts: DynamicPageLayoutDocument[];
  images: ImageDocument[];
  contents: ContentDocument[];
  saveUpdatedLayouts: ({
    deletedDocs,
    modifiedDocs,
    newDocs
  }: {
    newDocs: DynamicPageLayoutDocument[];
    modifiedDocs: DynamicPageLayoutDocument[];
    deletedDocs: string[];
  }) => void;
}) {
  const { toast } = useToast();

  // STATES =============================================================
  const [layouts, setLayouts] = useState<DynamicLayoutStructure[]>(
    getDynamicPageStructure(initialLayouts) || []
  );
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showDisabled, setShowDisabled] = useState<boolean>(true);
  const [hoverId, setHoverId] = useState<string>("");
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const [confirmDrop, setConfirmDrop] = useState<boolean>(false);
  const [itemToDrop, setItemToDrop] = useState<
    | {
        type: "id" | "all";
        id: string;
      }
    | undefined
  >();
  const [openSave, setOpenSave] = useState<boolean>(false);
  const [confirmSave, setConfirmSave] = useState<boolean>(false);
  const [deletedLayoutIds, setDeletedLayoutIds] = useState<string[]>([]);
  const [wait, setWait] = useState<boolean>(true);
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [isNewLayout, setIsNewLayout] = useState<boolean>(true);
  const [layoutInQ, setLayoutInQ] = useState<
    DynamicLayoutStructure | undefined
  >(undefined);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [currViewMode, setCurrViewMode] = useState<"pc" | "mobile">("pc");

  const getLayout = (id: string) => {
    return layouts.find(({ _id }) => _id === id);
  };

  // DELETE LOGIC ====================================================
  const triggerDropAll = () => {
    setOpenDrop((prev) => true);
    setItemToDrop((prev) => ({ type: "all", id: "" }));
  };

  const handleDropLayout = (id: string) => {
    const layout = getLayout(id);

    if (layout) {
      setOpenDrop((prev) => true);
      setItemToDrop((prev) => ({ type: "id", id: layout._id }));
    }
  };

  useEffect(() => {
    if (confirmDrop && !openDrop && itemToDrop !== undefined) {
      if (itemToDrop.type === "all") {
        setDeletedLayoutIds((prev) => [
          ...prev,
          ...layouts
            .filter(({ isNew }) => (isNew === undefined ? true : !isNew))
            .map(({ _id }) => _id)
        ]);

        setLayouts((prev) => []);
        toast({ title: "All Layouts Deleted", variant: "destructive" });
      } else {
        // update orders for each layout when delete is performed
        const updatedLayouts: DynamicLayoutStructure[] = [];
        let currIndex = 1;

        const wasNewLayout = getLayout(itemToDrop.id)?.isNew || false;

        for (let i = 0; i < layouts.length; i += 1) {
          if (layouts[i]._id === itemToDrop.id) continue;
          const updatedLayout: DynamicLayoutStructure = {
            ...layouts[i],
            order: currIndex,
            isModified: true
          };

          updatedLayouts.push(updatedLayout);
          currIndex += 1;
        }

        setLayouts((prev) => updatedLayouts);
        toast({ title: "Layout deleted", variant: "destructive" });

        if (!wasNewLayout)
          setDeletedLayoutIds((prev) => [...prev, itemToDrop.id]);
      }

      setItemToDrop((prev) => undefined);
      setConfirmDrop((prev) => false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmDrop]);

  // ADD LAYOUT LOGIC ====================================================
  const triggerLayoutAddition = () => {
    setLayoutInQ((prev) => undefined);
    setIsNewLayout((prev) => true);
    setOpenEditor((prev) => true);
  };

  // EDIT LAYOUT =========================================================
  const handleEditLayout = (id: string) => {
    const layout = getLayout(id);

    if (layout) {
      setLayoutInQ((prev) => layout);
      setOpenEditor((prev) => true);
      setIsNewLayout((prev) => false);
    }
  };

  const handleConfirmSaveEdits = (newLayoutData: DynamicLayoutStructure) => {
    const isNew = isNewLayout;

    if (isNew) {
      const grappleIndex = newLayoutData.order;
      const updatedLayouts: DynamicLayoutStructure[] = [];
      let curr = 1;

      if (layouts.length === 0) {
        updatedLayouts.push({ ...newLayoutData, order: 1, isNew: true });
      } else {
        const sortedLayouts = layouts.sort(
          (a: DynamicLayoutStructure, b: DynamicLayoutStructure) =>
            a.order || 0 - b.order || 0
        );

        for (let i = 0; i < layouts.length; i += 1) {
          const layout = sortedLayouts[i];

          if (grappleIndex === 0 && i === 0) {
            updatedLayouts.push({ ...newLayoutData, order: 1, isNew: true });
            updatedLayouts.push({ ...layout, order: 2, isModified: true });
            curr = 3;
            continue;
          }

          if (layout.order < grappleIndex) {
            updatedLayouts.push(layout);
            curr = layout.order + 1;

            if (grappleIndex > layouts.length && i === layouts.length - 1)
              updatedLayouts.push({
                ...newLayoutData,
                isNew: true,
                order: curr
              });

            continue;
          }

          if (layout.order === grappleIndex) {
            updatedLayouts.push({ ...newLayoutData, isNew: true });
            updatedLayouts.push({
              ...layout,
              order: grappleIndex + 1,
              isModified: true
            });
            curr = grappleIndex + 2;
            continue;
          }

          updatedLayouts.push({ ...layout, order: curr, isModified: true });
          curr += 1;
        }
      }

      setLayouts((prev) => updatedLayouts);
    } else {
      const orderToReplace = newLayoutData.order;
      const layout = layouts.find(({ order }) => order === orderToReplace);

      if (layout) {
        setLayouts((prev) =>
          prev.map((lt) =>
            lt.order === orderToReplace
              ? { ...newLayoutData, isModified: true }
              : lt
          )
        );
      }
    }
    // cleanup
    setOpenEditor((prev) => false);
    setIsNewLayout((prev) => true);
    setLayoutInQ((prev) => undefined);
  };

  // DISABLE LAYOUT =========================================================
  const handleDisableLayout = (id: string) => {
    const layout = getLayout(id);

    if (layout) {
      const newState = layout.isDisabled ? !layout.isDisabled : true;

      setLayouts((prev) =>
        prev.map((lt) =>
          lt._id === id
            ? {
                ...lt,
                isDisabled: newState,
                isModified: true
              }
            : lt
        )
      );
      toast({
        title: newState ? "Layout disabled" : "Layout enabled",
        variant: "default"
      });
    }
  };

  // ORDERING LOGIC ======================================================
  const moveLayoutUp = (id: string) => {
    const layout = getLayout(id);

    if (layout && layout.order > 1) {
      const topLayout = layouts.find(({ order }) => order === layout.order - 1);

      setLayouts((prev) =>
        prev.map((lt) =>
          lt._id === id
            ? { ...lt, order: layout.order - 1, isModified: true }
            : lt._id === topLayout?._id
              ? { ...lt, order: layout.order, isModified: true }
              : lt
        )
      );
    }
  };
  const moveLayoutDown = (id: string) => {
    const layout = getLayout(id);

    if (layout && layout.order < layouts.length) {
      const bottomLayout = layouts.find(
        ({ order }) => order === layout.order + 1
      );
      setLayouts((prev) =>
        prev.map((lt) =>
          lt._id === id
            ? { ...lt, order: layout.order + 1, isModified: true }
            : lt._id === bottomLayout?._id
              ? { ...lt, order: layout.order, isModified: true }
              : lt
        )
      );
    }
  };

  const toggleLeftAlign = (id: string, toggleValue: boolean) => {
    const layout = getLayout(id);
    if (layout && !wait) {
      setLayouts((prev) =>
        prev.map((lt) =>
          lt._id === id && lt.type === "title"
            ? { ...lt, leftAlign: toggleValue, isModified: true }
            : lt
        )
      );
    }
  };
  const toggleExtraSpacing = (id: string, toggleValue: boolean) => {
    const layout = getLayout(id);
    if (layout && !wait) {
      setLayouts((prev) =>
        prev.map((lt) =>
          lt._id === id && lt.type === "component"
            ? { ...lt, extraSpacing: toggleValue, isModified: true }
            : lt
        )
      );
    }
  };

  // HOVER LOGIC =================================================================
  const handleHover = (id: string) => setHoverId((prev) => id);

  useEffect(() => {
    if (hoverId.length) {
      const layout = getLayout(hoverId);
      if (layout) {
        const preview = document.getElementById(hoverId) as HTMLElement;
        preview.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverId]);

  useEffect(() => {
    layouts.forEach(({ _id, isDisabled }) => {
      const preview = document.getElementById(_id) as HTMLElement;
      if (preview) {
        if (isDisabled) {
          preview.style.opacity = "0.5";
          preview.style.filter = "grayscale(1)";
        } else {
          preview.style.opacity = "1";
          preview.style.filter = "grayscale(0)";
        }
      }
    });
  }, [layouts]);

  // SAVE DATA LOGIC =====================================================
  const handleSaveDynamicPage = () => setOpenSave((prev) => true);

  useEffect(() => {
    if (confirmSave && !openSave) {
      const {
        delete: deletedDocs,
        edit: modifiedDocs,
        new: newDocs
      } = getDynamicPageLayoutDocumentDataToSave(layouts, deletedLayoutIds);

      saveUpdatedLayouts({ deletedDocs, modifiedDocs, newDocs });

      setConfirmSave((prev) => false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmSave]);

  // WAIT PERIOD OF 1s ==========================================
  useEffect(() => {
    if (wait) setTimeout(() => setWait((prev) => false), 1000);
  }, [wait]);

  useEffect(() => {
    if (!openEditor) {
      setLayoutInQ((prev) => undefined);
      setIsNewLayout((prev) => true);
    }
  }, [openEditor]);

  // LOAD INITIAL LAYOUTS ==============================
  useEffect(() => {
    setLayouts((prev) => getDynamicPageStructure(initialLayouts) || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-[1fr_auto] items-stretch h-full">
      <section
        className={`transition-all duration-300 relative overflow-y-scroll scrollbar-hide h-[calc(100dvh_-_16px)] pr-10 pl-4 pb-16 ${showSidebar ? "" : ""}`}
      >
        <div className="z-30 sticky top-0 bg-gradient-to-b from-white from-10% to-transparent w-full h-10" />
        {layouts.length === 0 ? (
          <div className="cursor-default flex flex-col justify-center items-center text-xl font-light gap-3.5 text-charcoal-3/90 h-[calc(100dvh_-_50px)]">
            <CircleSlash2
              strokeWidth={1.5}
              height={40}
              width={40}
            />
            <span>No Layouts Added. Start by adding one</span>
          </div>
        ) : currViewMode === "pc" ? (
          <BentoHomepage
            useIds
            backlink={layouts
              .slice()
              .filter(({ isDisabled }) => {
                return isDisabled === undefined
                  ? true
                  : showDisabled
                    ? true
                    : !isDisabled;
              })
              .sort(
                (a: DynamicLayoutStructure, b: DynamicLayoutStructure) =>
                  a.order - b.order
              )}
            data={[]}
            onClickDelete={handleDropLayout}
            onClickDisable={handleDisableLayout}
            onClickEdit={handleEditLayout}
          />
        ) : (
          <div className="flex justify-center">
            <div className="bg-charcoal-3 rounded-[28px] h-[87dvh] aspect-[1/2.1] flex items-stretch justify-stretch p-[4.5px]">
              <div className="relative bg-white text-white rounded-[27px] overflow-auto scrollbar-hide">
                <div className="sticky top-2.5 left-4 rounded-full bg-charcoal-3 w-4 z-[999] aspect-square"></div>

                <BentoHomepage
                  useIds
                  backlink={layouts
                    .slice()
                    .filter(({ isDisabled }) => {
                      return isDisabled === undefined
                        ? true
                        : showDisabled
                          ? true
                          : !isDisabled;
                    })
                    .sort(
                      (a: DynamicLayoutStructure, b: DynamicLayoutStructure) =>
                        a.order - b.order
                    )}
                  data={[]}
                  onClickDelete={handleDropLayout}
                  onClickDisable={handleDisableLayout}
                  onClickEdit={handleEditLayout}
                />

                <div className="sticky bottom-0 scale-x-[1.02] translate-y-px w-full bg-gradient-to-t from-charcoal to-transparent to-70% text-white py-3 z-[999] flex items-center justify-center gap-x-16">
                  <Menu
                    className="rotate-90 shadow-md"
                    width={22}
                    height={22}
                    strokeWidth={2}
                  />
                  <Squircle
                    width={22}
                    height={22}
                    strokeWidth={2}
                    className="shadow-md"
                  />
                  <ChevronLeft
                    width={22}
                    height={22}
                    strokeWidth={2}
                    className="shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <HomepageManagementSidebar
        layouts={layouts}
        moveLayoutUp={moveLayoutUp}
        moveLayoutDown={moveLayoutDown}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        triggerDropAll={triggerDropAll}
        triggerLayoutAddition={triggerLayoutAddition}
        showDisabled={showDisabled}
        toggleShowDisabled={() => setShowDisabled((prev) => !prev)}
        toggleLeftAlign={toggleLeftAlign}
        toggleExtraSpacing={toggleExtraSpacing}
        handleHover={handleHover}
        onSave={handleSaveDynamicPage}
        currViewMode={currViewMode}
        toggleViewMode={() =>
          setCurrViewMode((prev) => (prev === "mobile" ? "pc" : "mobile"))
        }
      />

      <DeleteConfirmDialog
        itemToDrop={itemToDrop}
        openDrop={openDrop}
        setConfirmDrop={setConfirmDrop}
        setOpenDrop={setOpenDrop}
      />

      <SaveDataConfirmDialog
        open={openSave}
        setOpen={setOpenSave}
        setConfirmSave={setConfirmSave}
      />

      {isNewLayout ? (
        <NewOrEditLayoutDialog
          open={openEditor}
          setOpen={setOpenEditor}
          isNewLayout={true}
          onConfirmLayoutAddition={handleConfirmSaveEdits}
          totalCurrSlides={layouts.length}
          allContents={contents}
          allImages={images}
        />
      ) : (
        <NewOrEditLayoutDialog
          open={openEditor}
          setOpen={setOpenEditor}
          isNewLayout={false}
          initialData={layoutInQ as DynamicLayoutStructure}
          onConfirmLayoutEdits={handleConfirmSaveEdits}
          totalCurrSlides={layouts.length}
          allContents={contents}
          allImages={images}
        />
      )}
    </div>
  );
}
