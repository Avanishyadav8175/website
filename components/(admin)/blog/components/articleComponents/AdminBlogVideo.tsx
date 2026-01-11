import { BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";
import Input from "@/lib/Forms/Input/Input";

export default function AdminBlogVideo({
  data,
  onEdits
}: {
  data: BlogLayoutDocument;
  onEdits: (updatedURL: string) => void;
}) {
  return (
    <div className="p-6 flex items-center *:w-full border bg-ivory-1 border-ash">
      <Input
        type="text"
        errorCheck={false}
        validCheck={false}
        isRequired={false}
        labelConfig={{
          label: "Video URL:",
          layoutStyle: "flex-col space-y-2",
          labelStyle: "font-normal space-x-1"
        }}
        customValue={{
          value: data.video || "",
          setValue: onEdits
        }}
        name="video"
        customStyle="bg-transparent border-b border-black/30 transition-all duration-300 hover:border-black/70 w-full outline-none py-2"
      />
    </div>
  );
}
