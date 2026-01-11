// utils
import { memo } from "react";

// hooks
import { useMemo } from "react";

// components
import ContentsSection from "../ContentsSection";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentSuggestionDocument } from "@/common/types/documentation/nestedDocuments/contentSuggestion";

function ContentSuggestion({
  aiTagSuggestionId,
  suggestion
}: {
  aiTagSuggestionId?: string;
  suggestion: ContentSuggestionDocument;
}) {
  const aiTagSuggestion = useMemo(
    () => (suggestion?.aiTag as ContentDocument[]) || [],
    [suggestion]
  );
  const relatedAITagSuggestion = useMemo(
    () => (suggestion?.relatedAITag as ContentDocument[]) || [],
    [suggestion]
  );
  const categorySuggestion = useMemo(
    () => (suggestion?.category as ContentDocument[]) || [],
    [suggestion]
  );

  return (
    <>
      {Boolean(aiTagSuggestion?.length) && (
        <ContentsSection
          title="Similar Products"
          titleId={aiTagSuggestionId}
          contents={aiTagSuggestion}
          applyBoxTheme
          isScrollable
        />
      )}
      {Boolean(relatedAITagSuggestion?.length) && (
        <ContentsSection
          title="Related Products"
          contents={relatedAITagSuggestion}
          applyBoxTheme
          isScrollable
        />
      )}
      {Boolean(categorySuggestion?.length > 0) && (
        <ContentsSection
          title="Handpicked For You"
          contents={categorySuggestion.slice(0, 8)}
          applyBoxTheme
          isScrollable
        />
      )}
      {Boolean(categorySuggestion?.length > 8) && (
        <ContentsSection
          title="More In This Category"
          contents={categorySuggestion.slice(8)}
          applyBoxTheme
          isScrollable
        />
      )}
    </>
  );
}

export default memo(ContentSuggestion);
