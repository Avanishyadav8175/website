// libraries
import moment from "moment";

// components
import OrderDetailsDialog from "../../components/OrderDetailsDialog";
import PaymentStatus from "../../components/PaymentStatus";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";

const getTableContentGenerator =
  ({
    permission,
    carts,
    customers,
    contents
  }: {
    permission?: PermissionDocument;
    carts: CartDocument[];
    customers: CustomerDocument[];
    contents: ContentDocument[];
  }) =>
    ({
      documents,
      state: {
        pagination: { offset },
        query: { sortBy, orderBy },
        trash: { showTrash }
      },
      method: { onUpdate, onUpdateDocument, onTrash, onRestore, onDelete, onSort }
    }: AdminTableData<OrderDocument>): TableContent => ({
      header: [
        {
          label: "Content\u00A0Name",
          span: 4,
          sortable: false
        },
        {
          label: "Customer\u00A0Name",
          span: 2,
          sortable: false
        },
        {
          label: "Placed\u00A0On",
          span: 2,
          sortable: false
        },
        {
          label: "Delivery/Event\u00A0On",
          span: 2,
          sortable: false
        },
        {
          label: "Amount",
          span: 1,
          sortable: false
        },
        {
          label: "Details",
          span: 1,
          sortable: false
        },
        {
          label: "Status",
          span: 2,
          sortable: false
        }
      ],

      data: documents.flatMap(
        ({
          _id,
          id: orderId,
          payment,
          cart: cartId,
          deliveries,
          createdBy,
          createdAt,
          updatedBy,
          updatedAt
        }) => {
          const cart = carts.find(({ _id }) => _id === cartId) as CartDocument;
          const cartItemsLength = cart?.items?.length || 0;
          const customer = customers.find(({ _id }) => _id === cart?.customer);

          return (
            cart?.items?.map(
              (
                {
                  _id: cartItemId,
                  status,
                  content: contentId,
                  customVariant,
                  delivery
                },
                i
              ) => {
                const contentName =
                  contents.find(({ _id }) => String(_id) === String(contentId))
                    ?.name || "";

                return {
                  cols: [
                    {
                      value: {
                        label: contentName,
                        // cartItemsLength > 1
                        //   ? `${orderId}\u2011${i + 1}`
                        //   : orderId,
                        type: "text"
                      },
                      action: { action: () => { }, type: "none" }
                    },
                    {
                      value: {
                        label: customer?.name?.replace(/\s/g, "\u00A0") || "-",
                        type: "text",
                        align: "left"
                      },
                      action: { action: () => { }, type: "none" }
                    },
                    {
                      value: {
                        label:
                          moment(createdAt)
                            .format("DD MMM YY, hh:mm A")
                            .replace(/\s/g, "\u00A0") || "-",
                        type: "text"
                      },
                      action: { action: () => { }, type: "none" }
                    },
                    {
                      value: {
                        label:
                          moment(delivery?.date)
                            .format("DD MMM YY")
                            .replace(/\s/g, "\u00A0") || "-",
                        type: "text"
                      },
                      action: { action: () => { }, type: "none" }
                    },
                    {
                      value: {
                        label:
                          `₹${cart.price.total || ""}\u00A0(${payment?.percentage || ""}%)` ||
                          "-",
                        type: "text"
                      },
                      action: { action: () => { }, type: "none" }
                    },
                    {
                      value: {
                        label: (
                          <OrderDetailsDialog
                            orderId={_id as string}
                            itemId={cartItemId as string}
                          />
                        ),
                        type: "svg"
                      },
                      action: { action: () => { }, type: "none" }
                    },
                    {
                      value: {
                        label: (
                          <PaymentStatus
                            orderId={_id as string}
                            payment={payment}
                            status={payment.status}
                            isDisabled={showTrash}
                          />
                        ),
                        type: "svg"
                      },
                      action: { action: () => { }, type: "none" }
                    }
                  ],
                  batchSelectData: _id as string,
                  hoverData: (<></>)
                };
              }
            ) || []
          );
        }
      ),
      offset
    });

export default getTableContentGenerator;
