// library
import moment from "moment";

// components
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";

const getTableContentGenerator =
  ({
    permission
  }: {
    permission?: PermissionDocument;
    contentCategories: ContentCategoryDocument[];
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
  }: AdminTableData<CouponDocument>): TableContent => ({
    header: [
      {
        label: "Code",
        span: 2,
        sortable: false
      },
      {
        label: "Type",
        span: 2,
        sortable: false
      },
      {
        label: "Validity",
        span: 2,
        sortable: false
      },
      {
        label: "Applicable On",
        span: 2,
        sortable: false
      },
      {
        label: "Discount",
        span: 2,
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
        type,
        code,
        minimumOrderAmount,
        valid,
        discount,
        isActive,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt
      }) => ({
        cols: [
          {
            value: {
              label: code,
              type: "text",
              align: "left"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: type,
              type: "text",
              align: "center"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: `${moment(valid.from).format("DD/MM/YY")} to ${moment(valid.till).format("DD/MM/YY")}`,
              type: "text",
              align: "center"
            },
            action: {
              action: () => {},
              type: "component"
            }
          },
          {
            value: {
              label: `₹${minimumOrderAmount}`,
              type: "text",
              align: "center"
            },
            action: {
              action: () => {},
              type: "component"
            }
          },
          {
            value: {
              label: `${discount && discount.type === "percentage" ? `${discount.percentage}% upto` : "Flat"} ₹${minimumOrderAmount}`,
              type: "text",
              align: "center"
            },
            action: {
              action: () => {},
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
