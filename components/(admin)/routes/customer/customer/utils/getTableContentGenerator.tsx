// libraries
import moment from "moment";

// components
import CartDetails from "../components/CartDetails";
import CustomerConversionStatus from "../components/CustomerConversionStatus";
import CustomerStatus from "../components/CustomerStatus";
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";

const getTableContentGenerator =
  ({
    permission,
    carts
  }: {
    permission?: PermissionDocument;
    carts: CartDocument[];
  }) =>
  ({
    documents,
    state: {
      pagination: { offset },
      query: { sortBy, orderBy },
      trash: { showTrash }
    },
    method: { onUpdate, onUpdateDocument, onTrash, onRestore, onDelete, onSort }
  }: AdminTableData<CustomerDocument>): TableContent => ({
    header: [
      {
        label: "Name",
        span: 3,
        sortable: false
      },
      {
        label: "Mobile\u00A0Number",
        span: 3,
        sortable: false
      },
      {
        label: "Joined\u00A0On",
        span: 2,
        sortable: false
      },
      // {
      //   label: "History",
      //   span: 1,
      //   sortable: false
      // },
      {
        label: "Curr. Cart",
        span: 1,
        sortable: false
      },
      {
        label: "Orders",
        span: 1,
        sortable: false
      },
      // {
      //   label: "Points",
      //   span: 1,
      //   sortable: false
      // },
      // {
      //   label: "Conversion",
      //   span: 1.5,
      //   sortable: false
      // },
      // {
      //   label: "Status",
      //   span: 1,
      //   sortable: false
      // },
      {
        label: "Actions",
        span: 1,
        sortable: false
      }
    ],

    data: documents.map(
      ({
        _id,
        status,
        conversionStatus,
        name,
        mobileNumber,
        mail,
        lastVisitedContents,
        cart,
        orders,
        points,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt
      }) => ({
        cols: [
          {
            value: {
              label: name?.replace(/\s/g, "\u00A0") || "-",
              type: "text"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: mobileNumber?.replace(/-/g, "\u2011") || "-",
              type: "text"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: moment(createdAt)
                .format("Do MMM YY [at] HH:mm")
                ?.replace(/\s/g, "\u00A0"),
              type: "text"
            },
            action: { action: () => {}, type: "none" }
          },
          // {
          //   value: {
          //     label: lastVisitedContents?.length?.toString() || "0",
          //     type: "text"
          //   },
          //   action: { action: () => {}, type: "none" }
          // },
          {
            value: {
              label:
                cart && carts.find(({ _id }) => _id === cart)?.items?.length ? (
                  <CartDetails cartId={cart as string} />
                ) : (
                  <span>{"-"}</span>
                ),
              type: "svg"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: orders?.length?.toString() || "0",
              type: "text"
            },
            action: { action: () => {}, type: "none" }
          },
          // {
          //   value: {
          //     label: points?.available?.toString() || "0",
          //     type: "text"
          //   },
          //   action: { action: () => {}, type: "none" }
          // },
          // {
          //   value: {
          //     label: (
          //       <CustomerConversionStatus
          //         id={_id as string}
          //         conversionStatus={conversionStatus}
          //         updatedAt={updatedAt}
          //         isDisabled={showTrash}
          //         onUpdateDocument={onUpdateDocument}
          //       />
          //     ),
          //     type: "svg"
          //   },
          //   action: {
          //     action: () => {},
          //     type: "component"
          //   }
          // },
          // {
          //   value: {
          //     label: (
          //       <CustomerStatus
          //         id={_id as string}
          //         status={status}
          //         isDisabled={showTrash}
          //         onUpdateDocument={onUpdateDocument}
          //       />
          //     ),
          //     type: "svg"
          //   },
          //   action: {
          //     action: () => {},
          //     type: "component"
          //   }
          // },
          {
            value: {
              label: (
                <TupleActions
                  showEdit={Boolean(permission?.update) && !showTrash}
                  showRestore={false}
                  showDrop={false}
                  dropConfirmationDialogTitle="Move to Trash?"
                  showDelete={false}
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
