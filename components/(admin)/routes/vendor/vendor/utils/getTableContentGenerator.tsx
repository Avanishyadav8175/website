// libraries
import moment from "moment";

// components
import SelectContent from "@/components/custom/inputs/selectContent/SelectContent";
// import SelectCity from "@/components/custom/inputs/selectCity/SelectCity";
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";
import VendorStatus from "../components/VendorStatus";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";
import { type VendorDocument } from "@/common/types/documentation/users/vendor";
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";

const getTableContentGenerator =
  ({
    permission,
    cities,
    vendorOfferCategories
  }: {
    permission?: PermissionDocument;
    cities: CityDocument[];
    vendorOfferCategories: VendorOfferCategoryDocument[];
  }) =>
  ({
    documents,
    state: {
      pagination: { offset },
      query: { sortBy, orderBy },
      trash: { showTrash }
    },
    method: { onUpdate, onUpdateDocument, onTrash, onRestore, onDelete, onSort }
  }: AdminTableData<VendorDocument>): TableContent => ({
    header: [
      {
        label: "Business Name",
        span: 3,
        sortable: true,
        currSortValue: sortBy === "businessName" ? orderBy : "none",
        setSortValue: () => {
          onSort({ newSortBy: "businessName" });
        }
      },
      {
        label: "Owner Name",
        span: 3,
        sortable: true,
        currSortValue: sortBy === "ownerName" ? orderBy : "none",
        setSortValue: () => {
          onSort({ newSortBy: "ownerName" });
        }
      },
      {
        label: "City",
        span: 3,
        sortable: false
      },
      {
        label: "Categories",
        span: 3,
        sortable: false
      },
      {
        label: "Allocations",
        span: 2,
        sortable: false
      },
      {
        label: "Status",
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
        status,
        businessName,
        ownerName,
        business,
        location,
        contents,
        cities: selectedCityIds,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt
      }) => ({
        cols: [
          {
            value: {
              label: businessName,
              type: "text"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: ownerName,
              type: "text"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label:
                cities.find(({ _id }) => _id === location.city)?.name || "",
              type: "text"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: business?.categories?.length
                ? business?.categories
                    ?.map(
                      (categoryId) =>
                        vendorOfferCategories.find(
                          ({ _id }) => _id === categoryId
                        )?.name
                    )
                    .join(", ")
                : "-",
              type: "text"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: (
                <section className="flex gap-3">
                  <SelectContent
                    type="both"
                    name="contents"
                    icon
                    defaultValue={(contents as string[]) || []}
                    onFinish={(contents: string[]) => {
                      onUpdateDocument({
                        documentId: _id as string,
                        updatedDocument: {
                          contents
                        }
                      });
                    }}
                  />
                  {/* <SelectCity
                    selectedCityIds={selectedCityIds as string[]}
                    onFinish={(cities: string[]) => {
                      onUpdateDocument({
                        documentId: _id as string,
                        updatedDocument: {
                          cities
                        }
                      });
                    }}
                  /> */}
                </section>
              ),
              type: "svg"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: (
                <VendorStatus
                  id={_id as string}
                  status={status}
                  isDisabled={showTrash}
                  onUpdateDocument={onUpdateDocument}
                />
              ),
              type: "svg"
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
