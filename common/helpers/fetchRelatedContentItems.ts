// constants
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// requests
import { fetchContents } from "@/request/content/contents";

// types
import { type AITagDocument } from "../types/documentation/presets/aiTag";
import { type ContentDocument } from "../types/documentation/contents/content";
import { type ContentTagDocument } from "../types/documentation/nestedDocuments/contentTag";

export async function fetchRelatedContentItems(
  aiTagIds: string[],
  relatedAITagIds: string[],
  primaryCategoryId: string,
  contentId: string
): Promise<{
  aiTagCategories: ContentDocument[];
  relatedAITagCategories: ContentDocument[];
  primaryCategoryRelatedContents: ContentDocument[];
}> {
  const response = await fetchContents(
    {
      active: true,
      deleted: false,
      sortBy: "slug",
      orderBy: "asc",
      select: [
        "tag",
        "slug",
        "media",
        "edible",
        "quality",
        "price",
        "name",
        "detail",
        "category"
      ],
      populate: [
        { path: "media.primary", select: ["alt", "defaultAlt", "url"] }
      ]
    },
    RENDERING_STRATEGY
  );

  if (
    response.data &&
    response.data.length > 0 &&
    response.data[0] !== undefined
  ) {
    const contents = response.data as ContentDocument[];
    const aiTagCategories = contents
      .filter(({ tag }) =>
        tag
          ? ((tag as ContentTagDocument).aiTags as string[]).filter((aiTagId) =>
              aiTagIds.includes(aiTagId)
            ).length > 0
            ? true
            : false
          : false
      )
      .slice(0, 8);

    const relatedAITagCategories = contents
      .filter(
        ({ _id }) =>
          !aiTagCategories.find(
            ({ _id: aiTagContentId }) => aiTagContentId === _id
          )
      )
      .filter(({ tag }) =>
        tag
          ? ((tag as ContentTagDocument).aiTags as string[]).filter((aiTagId) =>
              relatedAITagIds.includes(aiTagId)
            ).length > 0
            ? true
            : false
          : false
      )
      .slice(0, 8);

    const primaryCategoryRelatedContents = contents
      .filter(
        ({ _id }) =>
          !aiTagCategories.find(
            ({ _id: aiTagContentId }) => aiTagContentId === _id
          ) &&
          !relatedAITagCategories.find(
            ({ _id: relatedAITagContentId }) => relatedAITagContentId === _id
          )
      )
      .filter(({ category, _id }) =>
        category && category.primary
          ? (category.primary as string) === primaryCategoryId &&
            _id !== contentId
          : false
      )
      .slice(0, 8);

    return {
      aiTagCategories,
      relatedAITagCategories,
      primaryCategoryRelatedContents
    };
  }

  return {
    aiTagCategories: [],
    relatedAITagCategories: [],
    primaryCategoryRelatedContents: []
  };
}
