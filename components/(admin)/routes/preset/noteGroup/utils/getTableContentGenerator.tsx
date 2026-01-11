// libraries
import moment from "moment";

// components
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type NoteGroupDocument } from "@/common/types/documentation/presets/noteGroup";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";

const getTableContentGenerator =
  ({
    permission,
    occasions
  }: {
    permission?: PermissionDocument;
    occasions: OccasionDocument[];
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
  }: AdminTableData<NoteGroupDocument>): TableContent => ({
    header: [
      {
        label: "Name",
        span: 6,
        sortable: true,
        currSortValue: sortBy === "name" ? orderBy : "none",
        setSortValue: () => {
          onSort({ newSortBy: "name" });
        }
      },
      {
        label: "Occasion",
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
        occasion,
        name,
        isActive,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt
      }) => ({
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
              label:
                occasions.find(({ _id }) => _id === (occasion as string))
                  ?.name || "",
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
