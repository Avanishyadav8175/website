// libraries
import moment from "moment";

// requests
import { revalidateSubTopicPage } from "../requests/revalidateSubTopicPage";

// components
import TupleActions from "@/components/(_common)/TableLayout/TupleActions";
import SubTopicPersonalizedReviewsForm from "../components/SubTopicPersonalizedReviewsForm";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";

const getTableContentGenerator =
  ({
    permission,
    contentCategories,
    topics,
    cities
  }: {
    permission?: PermissionDocument;
    contentCategories: ContentCategoryDocument[];
    topics: TopicDocument[];
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
  }: AdminTableData<SubTopicDocument>): TableContent => ({
    header: [
      {
        label: "Category 1",
        span: 3,
        align: "left",
        sortable: true,
        currSortValue: sortBy === "name" ? orderBy : "none",
        setSortValue: () => {
          onSort({ newSortBy: "name" });
        }
      },
      {
        label: "Category 2",
        span: 3,
        sortable: false,
        align: "left"
      },
      {
        label: "Category 3",
        span: 3,
        sortable: false,
        align: "left"
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
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label:
                topics.find(({ _id }) => _id === (topic as string))?.name || "",
              type: "text",
              align: "left"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: slug,
              type: "text",
              align: "left"
            },
            action: { action: () => {}, type: "none" }
          },
          {
            value: {
              label: (
                <SubTopicPersonalizedReviewsForm
                  initialReviews={personalizedReviews || []}
                  onUpdate={(updatedDocument: Partial<SubTopicDocument>) => {
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
            action: { action: () => {}, type: "component" }
          },
          {
            value: {
              label: (
                <TupleActions
                  showActiveInactive={!showTrash}
                  isActive={isActive}
                  showRevalidateCache={true}
                  onClickRevalidateCache={() => {
                    revalidateSubTopicPage({
                      categorySlug:
                        contentCategories.find(
                          ({ _id }) => _id === (category as string)
                        )?.slug || "",
                      topicSlug:
                        topics.find(({ _id }) => _id === (topic as string))
                          ?.slug || "",
                      subTopicSlug: slug
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
                  linkHref={`/${contentCategories.find(({ _id }) => _id === category)?.slug}/${topics.find(({ _id }) => _id === topic)?.slug}/${slug}`}
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
