// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// libraries

// components
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";
import Image from "next/image";

// types
import { type CatalogueCategoryDocument } from "@/common/types/documentation/categories/catalogueCategory";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type CatalogueDocument } from "@/common/types/documentation/presets/catalogue";
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";

const getTableContentGenerator =
  ({
    permission,
    catalogueCategories,
    images
  }: {
    permission?: PermissionDocument;
    catalogueCategories: CatalogueCategoryDocument[];
    images: ImageDocument[];
  }) =>
    ({
      documents,
      state: {
        pagination: { offset },
        query: { sortBy, orderBy },
        trash: { showTrash }
      },
      method: {
        onUpdate,
        onActivate,
        onDeactivate,
        onTrash,
        onRestore,
        onDelete,
        onSort
      }
    }: AdminTableData<CatalogueDocument>): TableContent => ({
      header: [
        {
          label: "Image",
          span: 1,
          sortable: false
        },
        {
          label: "Name",
          span: 3,
          align: "left",
          sortable: true,
          currSortValue: sortBy === "name" ? orderBy : "none",
          setSortValue: () => {
            onSort({ newSortBy: "name" });
          }
        },
        {
          label: "URL",
          span: 3,
          align: "left",
          sortable: false
        },
        {
          label: "Category",
          span: 2,
          align: "left",
          sortable: false
        },
        {
          label: "Actions",
          span: 1,
          sortable: false
        }
      ],
      data: documents.map(
        ({
          _id,
          category,
          name,
          path,
          icon,
          isActive,
          createdBy,
          createdAt,
          updatedBy,
          updatedAt
        }) => {
          const imageDocument = images.find(({ _id }) => _id === icon);

          return {
            cols: [
              {
                value: {
                  label: imageDocument ? (
                    <Image
                      className="w-[30px] h-[30px] rounded-md object-cover object-center"
                      src={imageDocument?.url || ""}
                      alt={
                        imageDocument?.alt || imageDocument?.defaultAlt || "Image"
                      }
                      width={30}
                      height={30}
                      unoptimized={!OPTIMIZE_IMAGE}
                      decoding="async"
                    />
                  ) : (
                    <div className="w-[30px] h-[30px] bg-neutral-700 rounded-md"></div>
                  ),
                  type: "svg",
                  align: "left"
                },
                action: { action: () => { }, type: "none" }
              },
              {
                value: {
                  label: name,
                  type: "text",
                  align: "left"
                },
                action: { action: () => { }, type: "none" }
              },
              {
                value: {
                  label: path,
                  type: "text",
                  align: "left"
                },
                action: { action: () => { }, type: "none" }
              },
              {
                value: {
                  label:
                    catalogueCategories.find(({ _id }) => _id === category)
                      ?.name || "",
                  type: "text",
                  align: "left"
                },
                action: { action: () => { }, type: "none" }
              },
              {
                value: {
                  label: (
                    <TupleActions
                      showActiveInactive={!showTrash}
                      isActive={isActive}
                      showEdit={Boolean(permission?.update) && !showTrash}
                      showRestore={showTrash}
                      showDrop={Boolean(permission?.delete) && !showTrash}
                      dropConfirmationDialogTitle="Move to Trash?"
                      showDelete={showTrash}
                      deleteConfirmationDialogTitle="Delete?"
                      onToggleActiveInactive={
                        isActive
                          ? () => {
                            onDeactivate({ documentId: _id as string });
                          }
                          : () => {
                            onActivate({ documentId: _id as string });
                          }
                      }
                      onClickEdit={() => {
                        onUpdate({ documentId: _id as string });
                      }}
                      onClickRestore={() =>
                        onRestore({ documentId: _id as string })
                      }
                      onClickDrop={() => onTrash({ documentId: _id as string })}
                      onClickDelete={() =>
                        onDelete({ documentId: _id as string })
                      }
                    />
                  ),
                  type: "svg"
                },
                action: { action: () => { }, type: "component" }
              }
            ],
            batchSelectData: _id as string,
            hoverData: (<></>)
          };
        }
      ),
      offset
    });

export default getTableContentGenerator;
