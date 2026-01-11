
"use client";
import { HomepageLayoutStructure } from "@/components/pages/(frontend)/Home/static/types";
import {
  getHomepageStructure,
  populateHomepageImages
} from "@/components/pages/(frontend)/Home/static/utils";
import { useEffect, useState } from "react";
import HomepageManagementSidebar from "./components/sidebar/HomepageManagementSidebar";
import DeleteConfirmDialog from "./components/dialogs/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import SaveDataConfirmDialog from "./components/dialogs/SaveDataConfirmDialog";
import { getHomepageLayoutDocumentDataToSave } from "./utils/getHomepageLayoutDocumentDataToSave";
import NewOrEditLayoutDialog from "./components/dialogs/NewOrEditLayoutDialog";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { useDispatch, useSelector } from "@/store/withType";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";
import {
  createHomepageLayoutAction,
  selectHomepageLayout
} from "@/store/features/pages/homepageLayoutSlice";
import { ChevronLeft, CircleSlash2, Home, Menu, Squircle } from "lucide-react";
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";
import { PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";
import { HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import BentoHomepage from "@/components/pages/(frontend)/Home/BentoHomepage";
import { AppStatesProvider } from "@/hooks/useAppState/useAppState";

export type HomepageLayoutType = HomepageLayoutStructure;

export default function HomepageManagement() {
  const { toast } = useToast();

  // REDUX INITIALIZATIONS =============================================
  const dispatch = useDispatch();

  const imageStatus = useSelector((state) => selectImage.status(state));

  const { documents: imageDocuments } = useSelector(selectImage.documentList);

  const contentStatus = useSelector((state) => selectContent.status(state));

  const { documents: contentDocuments } = useSelector(
    selectContent.documentList
  );

  const homepageLayoutStatus = useSelector((state) =>
    selectHomepageLayout.status(state)
  );

  const { documents: homepageDocumentsFromRedux } = useSelector((state) =>
    selectHomepageLayout.documentList(state)
  );

  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [dispatch, imageStatus]);

  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(createContentAction.fetchDocumentList());
    }
  }, [dispatch, contentStatus]);

  useEffect(() => {
    if (homepageLayoutStatus === "idle") {
      dispatch(createHomepageLayoutAction.fetchDocumentList());
    }
  }, [dispatch, homepageLayoutStatus]);

  // STATES =============================================================
  const [layouts, setLayouts] = useState<HomepageLayoutStructure[]>([]);
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
    HomepageLayoutStructure | undefined
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
        const updatedLayouts: HomepageLayoutStructure[] = [];
        let currIndex = 1;

        const wasNewLayout = getLayout(itemToDrop.id)?.isNew || false;

        for (let i = 0; i < layouts.length; i += 1) {
          if (layouts[i]._id === itemToDrop.id) continue;
          const updatedLayout: HomepageLayoutStructure = {
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

  const handleConfirmSaveEdits = (newLayoutData: HomepageLayoutStructure) => {
    const isNew = isNewLayout;

    if (isNew) {
      const grappleIndex = newLayoutData.order;
      const updatedLayouts: HomepageLayoutStructure[] = [];
      let curr = 1;

      if (layouts.length === 0) {
        updatedLayouts.push({ ...newLayoutData, order: 1, isNew: true });
      } else {
        const sortedLayouts = layouts.sort(
          (a: HomepageLayoutStructure, b: HomepageLayoutStructure) =>
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
  const handleSaveHomepage = () => setOpenSave((prev) => true);

  useEffect(() => {
    if (confirmSave && !openSave) {
      const {
        delete: deletedDocs,
        edit: modifiedDocs,
        new: newDocs
      } = getHomepageLayoutDocumentDataToSave(layouts, deletedLayoutIds);

      // dump this data into redux...
      if (newDocs.length)
        dispatch(
          createHomepageLayoutAction.addDocuments({ newDocuments: newDocs })
        );

      if (modifiedDocs.length)
        modifiedDocs.forEach((doc) =>
          dispatch(
            createHomepageLayoutAction.updateDocument({
              documentId: doc._id as string,
              updateData: doc
            })
          )
        );

      if (deletedDocs.length)
        dispatch(
          createHomepageLayoutAction.trashDocuments({
            documentIds: deletedDocs
          })
        );

      toast({
        title: "Homepage Layouts Saved!",
        description: "Changes may take a while to reflect",
        variant: "success"
      });

      setConfirmSave((prev) => false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmSave]);

  // WAIT PERIOD OF 1s ==========================================
  useEffect(() => {
    if (wait) setTimeout(() => setWait((prev) => false), 1000);
  }, [wait]);

  // PUT REDUX DATA INTO STATE =================================
  useEffect(() => {
    if (
      homepageLayoutStatus === "fulfilled" &&
      imageStatus === "fulfilled" &&
      contentStatus === "fulfilled" &&
      !hasLoaded
    ) {
      const readableLayoutData = populateHomepageImages(
        getHomepageStructure(
          homepageDocumentsFromRedux
            .filter(({ isDeleted }) => !isDeleted)
            .map((layout) =>
              layout.type === "content"
                ? ({
                    ...layout,
                    layout: {
                      content: (layout.layout.content &&
                      layout.layout.content.length > 0
                        ? layout.layout.content.map((ct) =>
                            typeof ct === "string"
                              ? contentDocuments.find(
                                  ({ _id }) => (_id as string) === ct
                                ) || ct
                              : ct
                          )
                        : []) as ContentDocument[]
                    } as PageLayoutDocument
                  } as HomepageLayoutDocument)
                : layout
            )
            .map((layout) =>
              layout.type === "content"
                ? ({
                    ...layout,
                    layout: {
                      content: (layout.layout.content &&
                      layout.layout.content.length > 0
                        ? (layout.layout.content as ContentDocument[]).map(
                            (ct) => ({
                              ...ct,
                              media: {
                                primary: ct.media?.primary ? (
                                  imageDocuments.find(
                                    ({ _id }) =>
                                      (_id as string) === ct.media?.primary
                                  ) || ct.media.primary
                                ) : null
                              }
                            })
                          )
                        : []) as ContentDocument[]
                    }
                  } as HomepageLayoutDocument)
                : layout
            )
        ),
        imageDocuments
      );
      setHasLoaded((prev) => true);
      setLayouts((prev) => readableLayoutData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homepageLayoutStatus, hasLoaded, imageStatus, contentStatus]);

  useEffect(() => {
    if (!openEditor) {
      setLayoutInQ((prev) => undefined);
      setIsNewLayout((prev) => true);
    }
  }, [openEditor]);

  const loadingMessage =
    imageStatus === "fulfilled"
      ? contentStatus === "fulfilled"
        ? "Layouts are loading"
        : "Loading Products and Services"
      : "Loading up Images";

  if (!hasLoaded)
    return (
      <div className="cursor-default flex flex-col justify-center items-center text-xl font-light gap-2.5 text-charcoal-3/90 animate-pulse h-[calc(100dvh_-_50px)]">
        <Home
          strokeWidth={1.5}
          height={40}
          width={40}
        />
        <span>{loadingMessage}</span>
      </div>
    );

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
          <AppStatesProvider>
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
                  (a: HomepageLayoutStructure, b: HomepageLayoutStructure) =>
                    a.order - b.order
                )}
              data={[]}
              onClickDelete={handleDropLayout}
              onClickDisable={handleDisableLayout}
              onClickEdit={handleEditLayout}
            />
          </AppStatesProvider>
        ) : (
          <div className="flex justify-center">
            <div className="bg-charcoal-3 rounded-[28px] h-[87dvh] aspect-[1/2.1] flex items-stretch justify-stretch p-[4.5px]">
              <div className="relative bg-white text-white rounded-[27px] overflow-auto scrollbar-hide">
                <div className="sticky top-2.5 left-4 rounded-full bg-charcoal-3 w-4 z-[999] aspect-square"></div>

                <AppStatesProvider>
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
                        (
                          a: HomepageLayoutStructure,
                          b: HomepageLayoutStructure
                        ) => a.order - b.order
                      )}
                    data={[]}
                    onClickDelete={handleDropLayout}
                    onClickDisable={handleDisableLayout}
                    onClickEdit={handleEditLayout}
                  />
                </AppStatesProvider>

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
        onSave={handleSaveHomepage}
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
          allContents={contentDocuments}
          allImages={imageDocuments}
        />
      ) : (
        <NewOrEditLayoutDialog
          open={openEditor}
          setOpen={setOpenEditor}
          isNewLayout={false}
          initialData={layoutInQ as HomepageLayoutStructure}
          onConfirmLayoutEdits={handleConfirmSaveEdits}
          totalCurrSlides={layouts.length}
          allContents={contentDocuments}
          allImages={imageDocuments}
        />
      )}
    </div>
  );
}
