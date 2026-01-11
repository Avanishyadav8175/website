"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createVendorAction,
  selectVendor
} from "@/store/features/users/vendorSlice";
import {
  createCityAction,
  selectCity
} from "@/store/features/presets/citySlice";
import {
  createVendorOfferCategoryAction,
  selectVendorOfferCategory
} from "@/store/features/presets/vendorOfferCategorySlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type VendorDocument } from "@/common/types/documentation/users/vendor";

export default function VendorTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const cityStatus = useSelector(selectCity.status);

  const { documents: cities } = useSelector((state) =>
    selectCity.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const vendorOfferCategoryStatus = useSelector(
    selectVendorOfferCategory.status
  );

  const { documents: vendorOfferCategories } = useSelector((state) =>
    selectVendorOfferCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<VendorDocument>
  >({});

  // side effects
  useEffect(() => {
    if (cityStatus === "idle") {
      dispatch(createCityAction.fetchDocumentList());
    }
  }, [cityStatus, dispatch]);

  useEffect(() => {
    if (vendorOfferCategoryStatus === "idle") {
      dispatch(createVendorOfferCategoryAction.fetchDocumentList());
    }
  }, [vendorOfferCategoryStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Vendors"
        documentName="Vendor"
        createAction={createVendorAction}
        select={selectVendor}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({
          permission,
          cities,
          vendorOfferCategories
        })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
