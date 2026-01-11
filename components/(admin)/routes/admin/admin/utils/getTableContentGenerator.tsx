// libraries
import moment from "moment";

// components
import AdminStatus from "../components/AdminStatus";
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// icons
import { ShieldPlus } from "lucide-react";

// types
import { type AdminDocument } from "@/common/types/documentation/users/admin";
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
      method: { onUpdate, onUpdateDocument, onTrash, onRestore, onDelete, onSort }
    }: AdminTableData<AdminDocument>): TableContent => ({
      header: [
        {
          label: "Username",
          span: 10,
          sortable: true,
          currSortValue: sortBy === "userName" ? orderBy : "none",
          setSortValue: () => {
            onSort({ newSortBy: "userName" });
          }
        },
        {
          label: "Status",
          span: 1,
          sortable: false
        },
        {
          label: "Actions",
          span: 1,
          sortable: false
        }
      ],

      data: documents
        .filter(({ userName }) => userName !== "kushal")
        .map(
          ({
            _id,
            status,
            userName,
            isSuperAdmin,
            createdBy,
            createdAt,
            updatedBy,
            updatedAt
          }) => ({
            cols: [
              {
                value: {
                  label: (
                    <span className="flex items-center justify-center gap-2">
                      <span>{userName}</span>
                      {isSuperAdmin && (
                        <ShieldPlus
                          strokeWidth={2}
                          width={15}
                          height={15}
                        />
                      )}
                    </span>
                  ),
                  type: "svg"
                },
                action: { action: () => { }, type: "none" }
              },
              {
                value: {
                  label: (
                    <AdminStatus
                      id={_id as string}
                      status={status}
                      isDisabled={showTrash}
                      onUpdateDocument={onUpdateDocument}
                    />
                  ),
                  type: "svg"
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
                      showEdit={Boolean(permission?.update) && !showTrash}
                      showRestore={showTrash}
                      showDrop={Boolean(permission?.delete) && !showTrash}
                      dropConfirmationDialogTitle="Move to Trash?"
                      showDelete={showTrash}
                      deleteConfirmationDialogTitle="Delete?"
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
                action: { action: () => { }, type: "component" }
              }
            ],
            batchSelectData: _id as string,
            hoverData: (<></>)
          })
        ),
      offset
    });

export default getTableContentGenerator;
