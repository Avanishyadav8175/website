// libraries
import moment from "moment";

// components
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";
import VendorRequestStatus from "../components/VendorRequestStatus";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";
import { type VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";

const getTableContentGenerator =
  ({
    userName,
    permission,
    foundUsSources
  }: {
    userName?: string;
    permission?: PermissionDocument;
    foundUsSources: FoundUsSourceDocument[];
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
        onUpdateDocument,
        onActivate,
        onDeactivate,
        onTrash,
        onRestore,
        onDelete,
        onSort
      }
    }: AdminTableData<VendorRequestDocument>): TableContent => ({
      header: [
        {
          label: "Name",
          span: 5,
          sortable: false
        },
        {
          label: "Email",
          span: 5,
          sortable: false,
          align: "left"
        },
        {
          label: "Mobile",
          span: 5,
          sortable: false,
          align: "left"
        },
        {
          label: "Company Name",
          span: 5,
          sortable: false,
          align: "left"
        },
        {
          label: "Actions",
          span: 2,
          sortable: false,
        }
      ],
      data: documents.map(
        ({
          _id,
          status,
          businessName,
          ownerName,
          mobile,
          city,
          mail,
          address,
          foundUs,
          createdBy,
          createdAt,
          updatedBy,
          updatedAt
        }) => ({
          cols: [
            {
              value: {
                label: ownerName,
                type: "text",
                align: "left"
              },
              action: { action: () => { }, type: "none" }
            },
            {
              value: {
                label: city,
                type: "text",
                align: "left"
              },
              action: { action: () => { }, type: "none" }
            },
            {
              value: {
                label: mobile,
                type: "text",
                align: "left"
              },
              action: { action: () => { }, type: "none" }
            },
            {
              value: {
                label: businessName,
                type: "text",
                align: "left"
              },
              action: { action: () => { }, type: "none" }
            },
            // {
            //   value: {
            //     label: (
            //       <VendorRequestStatus
            //         userName={userName}
            //         id={_id as string}
            //         status={status}
            //         isDisabled={showTrash}
            //         onUpdateDocument={onUpdateDocument}
            //       />
            //     ),
            //     type: "svg"
            //   },
            //   action: { action: () => {}, type: "component" }
            // },
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
