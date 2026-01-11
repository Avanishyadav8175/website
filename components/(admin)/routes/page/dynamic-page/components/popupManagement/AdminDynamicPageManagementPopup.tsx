import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";
import { SetStateType } from "@/common/types/reactTypes";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DynamicPageLayoutManagement from "../layoutManagement/DynamicPageLayoutManagement";
import { DynamicPageLayoutDocument } from "@/common/types/documentation/nestedDocuments/dynamicPageLayout";
import { useEffect, useState } from "react";
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";
import { toSlug } from "@/common/utils/slugOperations";
import { SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";

export default function AdminDynamicPageManagementPopup({
  open,
  setOpen,
  dataInQ,
  contents,
  images,
  saveNewDynamicPage,
  saveModificationsToDynamicPage
}: {
  open: boolean;
  setOpen: SetStateType<boolean>;
  dataInQ?: DynamicPageDocument;
  images: ImageDocument[];
  contents: ContentDocument[];
  saveNewDynamicPage: (data: DynamicPageDocument) => void;
  saveModificationsToDynamicPage: (
    id: string,
    updatedData: Partial<DynamicPageDocument>
  ) => void;
}) {
  const [updatedDocs, setUpdatedDocs] = useState<{
    newDocs: DynamicPageLayoutDocument[];
    modifiedDocs: DynamicPageLayoutDocument[];
    deletedDocs: string[];
  }>({ deletedDocs: [], modifiedDocs: [], newDocs: [] });

  const [updatedDynamicPage, setUpdatedDynamicPage] = useState<
    DynamicPageDocument | undefined
  >(dataInQ);

  const [showAdditionalDetailsPopup, setShowAdditionalDetailsPopup] =
    useState<boolean>(false);

  const handleSaveDynamicPage = () => {
    // console.log("SAVING DATA OF DYNAMIC PAGE");
    // console.log({
    //   newDynamicPage: dataInQ === undefined,
    //   updatedDynamicPage,
    //   updatedDocs
    // });

    const newLayout = dataInQ === undefined;

    // new layout, save -----------------------
    if (newLayout)
      saveNewDynamicPage({
        ...updatedDynamicPage,
        layouts: updatedDocs.newDocs
      } as DynamicPageDocument);
    // existing layout, modify -----------------------
    else {
      const modifiedIds = updatedDocs.modifiedDocs.map(
        ({ _id }) => _id as string
      );

      const modifiedPageLayouts = [
        ...dataInQ.layouts.filter(({ _id }) =>
          _id ? !modifiedIds.includes(_id as string) : true
        ),
        ...updatedDocs.newDocs,
        ...updatedDocs.modifiedDocs
      ]
        .filter(({ _id }) =>
          _id ? !updatedDocs.deletedDocs.includes(_id as string) : true
        )
        .slice()
        .sort(
          (a: DynamicPageLayoutDocument, b: DynamicPageLayoutDocument) =>
            a.order - b.order
        );

      const dynamicPage: DynamicPageDocument = {
        ...updatedDynamicPage,
        layouts: modifiedPageLayouts,
        createdBy: "Someone",
        updatedBy: "Someone"
      } as DynamicPageDocument;

      saveModificationsToDynamicPage(dataInQ._id as string, dynamicPage);
    }

    setOpen((prev) => false);
    cleanup();
  };

  const cleanup = () => {
    setUpdatedDocs((prev) => ({
      deletedDocs: [],
      modifiedDocs: [],
      newDocs: []
    }));
    setShowAdditionalDetailsPopup((prev) => false);
  };

  useEffect(() => {
    setUpdatedDynamicPage((prev) => dataInQ);
  }, [dataInQ]);

  useEffect(() => {
    if (!open) {
      setUpdatedDynamicPage((prev) => undefined);
      cleanup();
    }
  }, [open]);

  // useEffect(() => {
  //   console.log({ updatedDocs });
  // }, [updatedDocs]);

  const EMPTY_DYNAMIC_PAGE_DOCUMENT = {
    name: "",
    slug: "",
    seoMeta: {
      title: "",
      tags: [] as string[],
      description: ""
    } as SEOMetaDocument,
    layouts: [] as DynamicPageLayoutDocument[],
    layoutCounter: 0
  } as DynamicPageDocument;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="border-none outline-none bg-ivory-1 !rounded-none p-0 overflow-hidden h-[100dvh] min-w-[100dvw] px-5 py-3.5">
          <DynamicPageLayoutManagement
            contents={contents}
            images={images}
            initialLayouts={dataInQ ? dataInQ.layouts : []}
            saveUpdatedLayouts={({
              deletedDocs,
              modifiedDocs,
              newDocs
            }: {
              newDocs: DynamicPageLayoutDocument[];
              modifiedDocs: DynamicPageLayoutDocument[];
              deletedDocs: string[];
            }) => {
              setUpdatedDocs((prev) => ({
                deletedDocs,
                modifiedDocs,
                newDocs
              }));
              setShowAdditionalDetailsPopup((prev) => true);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={showAdditionalDetailsPopup}
        onOpenChange={setShowAdditionalDetailsPopup}
      >
        <DialogContent className="min-w-fit border-none outline-none bg-ivory-1 rounded-2xl p-5 flex flex-col justify-start gap-3">
          <span className="text-xl pb-3 pt-1">Additional Details</span>
          <div>
            <Input
              type="text"
              errorCheck={false}
              isRequired={true}
              name=""
              validCheck={false}
              labelConfig={{
                label: "Name",
                layoutStyle: "grid grid-cols-[110px_1fr]"
              }}
              customValue={{
                setValue: (newVal: string) => {
                  setUpdatedDynamicPage((prev) =>
                    prev
                      ? ({ ...prev, name: newVal } as DynamicPageDocument)
                      : ({
                          ...EMPTY_DYNAMIC_PAGE_DOCUMENT,
                          name: newVal
                        } as DynamicPageDocument)
                  );
                },
                value: updatedDynamicPage ? updatedDynamicPage.name || "" : ""
              }}
            />
          </div>
          <div>
            <Input
              type="text"
              errorCheck={false}
              isRequired={true}
              name=""
              validCheck={false}
              labelConfig={{
                label: "URL",
                layoutStyle: "grid grid-cols-[110px_1fr]"
              }}
              customValue={{
                setValue: (newVal: string) => {
                  setUpdatedDynamicPage((prev) =>
                    prev
                      ? ({
                          ...prev,
                          slug: toSlug(newVal)
                        } as DynamicPageDocument)
                      : ({
                          ...EMPTY_DYNAMIC_PAGE_DOCUMENT,
                          slug: toSlug(newVal)
                        } as DynamicPageDocument)
                  );
                },
                value: updatedDynamicPage ? updatedDynamicPage.slug || "" : ""
              }}
            />
          </div>
          <span className="font-light text-xl pt-6 pb-3">SEO Data</span>
          <div>
            <Input
              type="text"
              errorCheck={false}
              isRequired={false}
              name=""
              validCheck={false}
              labelConfig={{
                label: "Title",
                layoutStyle: "grid grid-cols-[110px_1fr]"
              }}
              customValue={{
                setValue: (newVal: string) => {
                  setUpdatedDynamicPage((prev) =>
                    prev
                      ? ({
                          ...prev,
                          seoMeta: {
                            ...prev.seoMeta,
                            title: newVal
                          } as SEOMetaDocument
                        } as DynamicPageDocument)
                      : ({
                          ...EMPTY_DYNAMIC_PAGE_DOCUMENT,
                          seoMeta: {
                            ...EMPTY_DYNAMIC_PAGE_DOCUMENT.seoMeta,
                            title: newVal
                          }
                        } as DynamicPageDocument)
                  );
                },
                value:
                  updatedDynamicPage && updatedDynamicPage.seoMeta.title
                    ? updatedDynamicPage.seoMeta.title || ""
                    : ""
              }}
            />
          </div>
          <div>
            <Input
              type="text"
              errorCheck={false}
              isRequired={false}
              name=""
              validCheck={false}
              labelConfig={{
                label: "Tags",
                layoutStyle: "grid grid-cols-[110px_1fr]"
              }}
              customValue={{
                setValue: (newVal: string) => {
                  setUpdatedDynamicPage((prev) =>
                    prev
                      ? ({
                          ...prev,
                          seoMeta: {
                            ...prev.seoMeta,
                            tags: newVal.split(",").map((x) => x.trim())
                          } as SEOMetaDocument
                        } as DynamicPageDocument)
                      : ({
                          ...EMPTY_DYNAMIC_PAGE_DOCUMENT,
                          seoMeta: {
                            ...EMPTY_DYNAMIC_PAGE_DOCUMENT.seoMeta,
                            tags: newVal.split(", ").map((x) => x.trim())
                          }
                        } as DynamicPageDocument)
                  );
                },
                value:
                  updatedDynamicPage &&
                  updatedDynamicPage.seoMeta.tags.length > 0
                    ? updatedDynamicPage.seoMeta.tags.join(", ") || ""
                    : ""
              }}
            />
          </div>
          <div>
            <Textarea
              errorLogic={() => false}
              validLogic={() => false}
              name=""
              className="h-24"
              customValue={{
                setValue: (newVal: string) => {
                  setUpdatedDynamicPage((prev) =>
                    prev
                      ? ({
                          ...prev,
                          seoMeta: {
                            ...prev.seoMeta,
                            description: newVal
                          } as SEOMetaDocument
                        } as DynamicPageDocument)
                      : ({
                          ...EMPTY_DYNAMIC_PAGE_DOCUMENT,
                          seoMeta: {
                            ...EMPTY_DYNAMIC_PAGE_DOCUMENT.seoMeta,
                            description: newVal
                          }
                        } as DynamicPageDocument)
                  );
                },
                value:
                  updatedDynamicPage && updatedDynamicPage.seoMeta.description
                    ? updatedDynamicPage.seoMeta.description || ""
                    : ""
              }}
              labelConfig={{
                label: "Description",
                labelStyle: "",
                layoutStyle: "grid grid-cols-[110px_1fr]"
              }}
            />
          </div>
          <div
            onClick={handleSaveDynamicPage}
            className="bg-teal-500 text-white w-fit px-4 py-2 mt-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-teal-600"
          >
            Save Changes
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
