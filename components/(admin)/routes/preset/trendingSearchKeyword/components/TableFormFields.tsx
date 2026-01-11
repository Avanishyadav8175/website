// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: TrendingSearchKeywordDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="label"
        isRequired
        labelConfig={{
          label: "Keyword",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.label || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="path"
        isRequired
        labelConfig={{
          label: "Path",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.path || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
