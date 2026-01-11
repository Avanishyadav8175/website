// libraries
import moment from "moment";

// components
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// types
import { type AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
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
      onActivate,
      onDeactivate,
      onTrash,
      onRestore,
      onDelete,
      onSort
    }
  }: AdminTableData<AdvancePaymentDocument>): TableContent => ({
    header: [
      {
        label: "Label",
        span: 5,
        sortable: true,
        currSortValue: sortBy === "label" ? orderBy : "none",
        setSortValue: () => {
          onSort({ newSortBy: "label" });
        }
      },
      {
        label: "Percentage",
        span: 5,
        sortable: true,
        currSortValue: sortBy === "value" ? orderBy : "none",
        setSortValue: () => {
          onSort({ newSortBy: "value" });
        }
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
        label,
        value,
        isActive,
      }) => ({
        cols: [
          {
            value: {
              label: label || "",
              type: "text",
              align: "left"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: value?.toString() || "",
              type: "text",
              align: "center"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: (
                <TupleActions
                  showActiveInactive={!showTrash}
                  isActive={isActive}
                  showEdit={true}
                  showRestore={showTrash}
                  showDrop={true}
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
        batchSelectData: _id as string, // <---- object
        hoverData: (<></>)
      })
    ),
    offset
  });

export default getTableContentGenerator;
