// requests
import { revalidateDynamicPage } from "../requests/revalidateDynamicPage";

// components
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

const getTableContentGenerator =
  ({
    permission,
    customEdit
  }: {
    permission?: PermissionDocument;
    customEdit?: (id: string, data?: DynamicPageDocument) => void;
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
      onSort,
      onShowToast
    }
  }: AdminTableData<DynamicPageDocument>): TableContent => ({
    header: [
      {
        label: "Name",
        span: 10,
        sortable: true,
        currSortValue: sortBy === "name" ? orderBy : "none",
        setSortValue: () => {
          onSort({ newSortBy: "name" });
        }
      },
      {
        label: "Actions",
        span: 2,
        sortable: false
      }
    ],
    data: documents.map(({ _id, name, slug, isActive }) => ({
      cols: [
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
                showRevalidateCache={true}
                onClickRevalidateCache={() => {
                  revalidateDynamicPage(slug)
                    .then(() => {
                      onShowToast({
                        variant: "success",
                        title: "Success",
                        description: `Successfully revalidated "${name}"`
                      });
                    })
                    .catch(() => {
                      onShowToast({
                        variant: "destructive",
                        title: "Failed",
                        description: `Couldn't revalidated "${name}"`
                      });
                    });
                }}
                showEdit={true}
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
                onClickEdit={
                  customEdit
                    ? () => {
                        const targetData = documents.find(
                          ({ _id: id }) => id === _id
                        );
                        customEdit(_id as string, targetData);
                      }
                    : () => {
                        onUpdate({ documentId: _id as string });
                      }
                }
                onClickRestore={() => onRestore({ documentId: _id as string })}
                onClickDrop={() => onTrash({ documentId: _id as string })}
                onClickDelete={() => onDelete({ documentId: _id as string })}
                showExternalLink
                linkHref={`${FRONTEND_LINKS.DYNAMIC_PAGE}/${slug}`}
              />
            ),
            type: "svg"
          },
          action: { action: () => {}, type: "component" }
        }
      ],
      batchSelectData: _id as string
    })),
    offset
  });

export default getTableContentGenerator;
