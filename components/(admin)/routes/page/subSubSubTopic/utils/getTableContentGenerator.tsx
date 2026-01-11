// libraries
import moment from "moment";

// requests
import { revalidateSubSubSubTopicPage } from "../requests/revalidateSubTopicPage";

// components
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";
import { type SubSubTopicDocument } from "@/common/types/documentation/pages/subSubTopic";
import { SubSubSubTopicDocument } from "@/common/types/documentation/pages/subSubSubTopic";
import SubSubSubTopicPersonalizedReviewsForm from "../components/SubSubTopicPersonalizedReviewsForm";

const getTableContentGenerator =
  ({
    permission,
    contentCategories,
    topics,
    subTopics,
    subSubTopics,
    cities
  }: {
    permission?: PermissionDocument;
    contentCategories: ContentCategoryDocument[];
    topics: TopicDocument[];
    subTopics: SubTopicDocument[];
    subSubTopics: SubSubTopicDocument[];
    cities: CityDocument[];
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
        onSort,
        onShowToast
      }
    }: AdminTableData<SubSubSubTopicDocument>): TableContent => ({
      header: [
        {
          label: "Category 1",
          span: 3,
          sortable: true,
          align: "left",
          currSortValue: sortBy === "name" ? orderBy : "none",
          setSortValue: () => {
            onSort({ newSortBy: "name" });
          }
        },
        {
          label: "Category 2",
          span: 3,
          sortable: false,
          align: "left",
        },
        {
          label: "Category 3",
          span: 3,
          sortable: false,
          align: "left",
        },
        {
          label: "Category 4",
          span: 3,
          sortable: false,
          align: "left",
        },
        {
          label: "Category 5",
          span: 3,
          sortable: false,
          align: "left",
        },
        {
          label: "Reviews",
          span: 2,
          sortable: false
        },
        {
          label: "Actions",
          span: 3,
          sortable: false
        }
      ],
      data: documents.map(
        ({
          _id,
          category,
          topic,
          subTopic,
          subSubTopic,
          name,
          slug,
          city,
          personalizedReviews,
          isActive,
          createdBy,
          createdAt,
          updatedBy,
          updatedAt
        }) => ({
          cols: [
            {
              value: {
                label:
                  contentCategories.find(
                    ({ _id }) => _id === (category as string)
                  )?.name || "",
                type: "text",
                align: "left"
              },
              action: { action: () => { }, type: "none" }
            },
            {
              value: {
                label:
                  topics.find(({ _id }) => _id === (topic as string))?.name || "",
                type: "text",
                align: "left"
              },
              action: { action: () => { }, type: "none" }
            },
            {
              value: {
                label:
                  subTopics.find(({ _id }) => _id === (subTopic as string))?.name || "",
                type: "text",
                align: "left"
              },
              action: { action: () => { }, type: "none" }
            },
            {
              value: {
                label:
                  subSubTopics.find(({ _id }) => _id === (subSubTopic as string))?.name || "",
                type: "text",
                align: "left"
              },
              action: { action: () => { }, type: "none" }
            },
            {
              value: {
                label: slug,
                type: "text",
                align: "left"
              },
              action: { action: () => { }, type: "none" }
            },
            {
              value: {
                label: (
                  <SubSubSubTopicPersonalizedReviewsForm
                    initialReviews={personalizedReviews || []}
                    onUpdate={(updatedDocument: Partial<SubSubSubTopicDocument>) => {
                      onUpdateDocument({
                        documentId: _id as string,
                        updatedDocument
                      });
                    }}
                  />
                ),
                type: "svg",
                align: "center"
              },
              action: { action: () => { }, type: "component" }
            },
            {
              value: {
                label: (
                  <TupleActions
                    showActiveInactive={!showTrash}
                    isActive={isActive}
                    showRevalidateCache={true}
                    onClickRevalidateCache={() => {
                      revalidateSubSubSubTopicPage({
                        categorySlug:
                          contentCategories.find(
                            ({ _id }) => _id === (category as string)
                          )?.slug || "",
                        topicSlug:
                          topics.find(({ _id }) => _id === (topic as string))
                            ?.slug || "",
                        subTopicSlug:
                          subTopics.find(({ _id }) => _id === (subTopic as string))
                            ?.slug || "",
                        subSubTopicSlug:
                          subSubTopics.find(({ _id }) => _id === (subSubTopic as string))
                            ?.slug || "",
                        subSubSubTopicSlug: slug
                      })
                        .then(() => {
                          onShowToast({
                            variant: "success",
                            title: "Success",
                            description: `Successfully revalidated "${name}"`
                          });
                        })
                        .catch(() => {
                          onShowToast({
                            variant: "destructive",
                            title: "Failed",
                            description: `Couldn't revalidated "${name}"`
                          });
                        });
                    }}
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
                    showExternalLink
                    linkHref={`/${contentCategories.find(({ _id }) => _id === category)?.slug}/${topics.find(({ _id }) => _id === topic)?.slug}/${subTopics.find(({ _id }) => _id === subTopic)?.slug}/${subSubTopics.find(({ _id }) => _id === subSubTopic)?.slug}/${slug}`}
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
