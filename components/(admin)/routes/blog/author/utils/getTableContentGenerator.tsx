// components
import Image from "next/image";
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";
import { OPTIMIZE_IMAGE } from "@/config/image";

const getTableContentGenerator =
  ({
    permission,
    images
  }: {
    permission?: PermissionDocument;
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
  }: AdminTableData<BlogAuthorDocument>): TableContent => ({
    header: [
      {
        label: "Photo",
        span: 1,
        sortable: false
      },
      {
        label: "Name",
        span: 10,
        align: "left",
        sortable: true,
        currSortValue: sortBy === "name" ? orderBy : "none",
        setSortValue: () => {
          onSort({ newSortBy: "name" });
        }
      },
      {
        label: "Actions",
        span: 1,
        sortable: false
      }
    ],
    data: documents.map(({ _id, name, photo, isActive }) => {
      const photoDocument = images.find(({ _id }) => _id === photo);

      return {
        cols: [
          {
            value: {
              label: photoDocument ? (
                <Image
                  className="w-[40px] aspect-square rounded-full object-cover"
                  width={40}
                  height={40}
                  src={photoDocument.url}
                  alt={photoDocument.alt || photoDocument.defaultAlt || "Image"}
                  unoptimized={!OPTIMIZE_IMAGE}
                  decoding="async"
                />
              ) : (
                <div className="w-[40px] h-[40px] bg-gray-700 rounded-full"></div>
              ),
              type: "svg",
              align: "left"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: name,
              type: "text",
              align: "left"
            },
            action: { action: () => {}, type: "none" }
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
                  onClickDelete={() => onDelete({ documentId: _id as string })}
                />
              ),
              type: "svg"
            },
            action: { action: () => {}, type: "component" }
          }
        ],
        batchSelectData: _id as string
      };
    }),
    offset
  });

export default getTableContentGenerator;
