// libraries
import moment from "moment";

// components
import HeaderNavLinkReorder from "../components/HeaderNavLinkReorder";
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";

const getTableContentGenerator =
  ({ permission }: { permission?: PermissionDocument }) =>
  ({
    documents,
    state: {
      pagination: { offset },
      query: { sortBy, orderBy },
      trash: { showTrash }
    },
    method: {
      onUpdate,
      onUpdateDocument,
      onActivate,
      onDeactivate,
      onTrash,
      onRestore,
      onDelete,
      onSort
    }
  }: AdminTableData<HeaderNavLinkDocument>): TableContent => ({
    header: [
      {
        label: "Label",
        span: 3,
        sortable: true,
        currSortValue: sortBy === "label" ? orderBy : "none",
        setSortValue: () => {
          onSort({ newSortBy: "label" });
        }
      },
      {
        label: "Path",
        span: 5,
        sortable: false,
        align: "center"
      },
      {
        label: "Sections",
        span: 1,
        sortable: false,
        align: "center"
      },
      {
        label: "Order",
        span: 1,
        sortable: false,
        align: "center"
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
        order,
        label,
        path,
        sections,
        isActive,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt
      }) => ({
        cols: [
          {
            value: {
              label: label,
              type: "text",
              align: "left"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: path || "-",
              type: "text",
              align: "center"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: sections?.length?.toString() || "0",
              type: "text",
              align: "center"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: (
                <HeaderNavLinkReorder
                  currentId={_id as string}
                  showTrash={showTrash}
                  sortBy={sortBy}
                  orderBy={orderBy}
                />
              ),
              type: "svg"
            },
            action: { action: () => {}, type: "component" }
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
        batchSelectData: _id as string,
        hoverData: (<></>)
      })
    ),
    offset
  });

export default getTableContentGenerator;
