"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createSubTopicAction,
  selectSubTopic
} from "@/store/features/pages/subTopicSlice";
import {
  createCityAction,
  selectCity
} from "@/store/features/presets/citySlice";
import {
  createContentCategoryAction,
  selectContentCategory
} from "@/store/features/categories/contentCategorySlice";
import {
  createTopicAction,
  selectTopic
} from "@/store/features/pages/topicSlice";

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
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";
import { allPermissions } from "@/common/constants/values";

export default function SubTopicTable({
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

  // redux
  const contentCategoryStatus = useSelector(selectContentCategory.status);

  const { documents: contentCategories } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const topicStatus = useSelector(selectTopic.status);

  const { documents: topics } = useSelector((state) =>
    selectTopic.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const cityStatus = useSelector(selectCity.status);

  const { documents: cities } = useSelector((state) =>
    selectCity.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<SubTopicDocument>
  >({});

  // side effects
  useEffect(() => {
    if (contentCategoryStatus === "idle") {
      dispatch(createContentCategoryAction.fetchDocumentList());
    }
  }, [contentCategoryStatus, dispatch]);

  useEffect(() => {
    if (topicStatus === "idle") {
      dispatch(createTopicAction.fetchDocumentList());
    }
  }, [topicStatus, dispatch]);

  useEffect(() => {
    if (cityStatus === "idle") {
      dispatch(createCityAction.fetchDocumentList());
    }
  }, [cityStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={allPermissions}
        collectionName="Categories 3"
        documentName="Categories 3"
        createAction={createSubTopicAction}
        select={selectSubTopic}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({
          permission: allPermissions,
          contentCategories,
          topics,
          cities
        })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
