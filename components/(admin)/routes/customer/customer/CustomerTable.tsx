"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCustomerAction,
  selectCustomer
} from "@/store/features/users/customerSlice";

// redux
import {
  createCartAction,
  selectCart
} from "@/store/features/dynamic/cartSlice";
import { createOrderAction } from "@/store/features/dynamic/orderSlice";

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
import { allPermissions } from "@/common/constants/values";

export default function CustomerTable({
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
  const cartStatus = useSelector(selectCart.status);

  const { documents: carts } = useSelector(selectCart.documentList);

  // states
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<VendorDocument>
  >({});

  // event handlers
  const handleRefresh = () => {
    dispatch(createCartAction.fetchDocumentList());
    dispatch(createOrderAction.fetchDocumentList());
  };

  // side effects
  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(createCartAction.fetchDocumentList());
    }
  }, [cartStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={allPermissions}
        collectionName="Customers"
        documentName="Customer"
        createAction={createCustomerAction}
        select={selectCustomer}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({
          permission: allPermissions,
          carts
        })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
        customRefresh={handleRefresh}
      />
    </>
  );
}
