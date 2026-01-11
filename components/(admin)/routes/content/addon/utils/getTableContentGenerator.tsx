// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// libraries
import moment from "moment";

// icons
import { EdibleSVG, NonVegSVG, VegSVG } from "@/common/svgs/svg";

// components
import Image from "next/image";
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type AddonCategoryDocument } from "@/common/types/documentation/categories/addonCategory";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";

const getTableContentGenerator =
  ({
    permission,
    addonCategories,
    images
  }: {
    permission?: PermissionDocument;
    addonCategories: AddonCategoryDocument[];
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
    }: AdminTableData<AddonDocument>): TableContent => ({
      header: [
        {
          label: "Image",
          span: 1,
          sortable: false
        },
        {
          label: "Name",
          span: 5,
          sortable: true,
          currSortValue: sortBy === "name" ? orderBy : "none",
          setSortValue: () => {
            onSort({ newSortBy: "name" });
          }
        },
        {
          label: "Category",
          span: 4,
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
          image,
          edible: { isEdible, type: edibleType },
          isActive,
          createdBy,
          createdAt,
          updatedBy,
          updatedAt
        }) => {
          const imageDocument = images.find(({ _id }) => _id === image);

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
                  label: (
                    <div className="flex items-center justify-start gap-5">
                      {!isEdible && <div className="w-[16px] h-[16px]"></div>}
                      {isEdible && edibleType === "unspecified" && <EdibleSVG />}
                      {isEdible && edibleType === "veg" && <VegSVG />}
                      {isEdible && edibleType === "non-veg" && <NonVegSVG />}
                      <span>{name}</span>
                    </div>
                  ),
                  type: "svg",
                  align: "left"
                },
                action: { action: () => { }, type: "none" }
              },
              {
                value: {
                  label:
                    addonCategories.find(({ _id }) => _id === category)?.name ||
                    "",
                  type: "text",
                  align: "center"
                },
                action: {
                  action: () => { },
                  type: "component"
                }
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
