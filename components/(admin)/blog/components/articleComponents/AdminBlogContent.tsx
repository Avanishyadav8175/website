import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";
import SelectContent from "@/components/custom/inputs/selectContent/SelectContent";

export default function AdminBlogContent({
  data,
  onEdits,
  allContents,
  allImages
}: {
  data: BlogLayoutDocument;
  onEdits: (selectedContents: string[]) => void;
  allContents: ContentDocument[];
  allImages: ImageDocument[];
}) {
  return (
    <div className="p-6 border bg-ivory-1">
      <SelectContent
        name=""
        type="both"
        isRequired={false}
        performReset
        label=""
        onChangeValue={(newValues: string[]) => {
          const selectedContents = allContents
            .filter(({ _id }) => newValues.includes(_id as string))
            ?.map(
              (content) =>
                ({
                  ...content,
                  media: {
                    ...content.media,
                    primary:
                      allImages.find(
                        ({ _id }) =>
                          (_id as string) === (content.media.primary as string)
                      ) || content.media.primary
                  }
                }) as ContentDocument
            );

          if (selectedContents !== undefined)
            onEdits(selectedContents.map(({ _id }) => _id as string));
        }}
        value={
          data && data.content && data.content.length > 0
            ? (data.content as string[])
            : []
        }
      />
    </div>
  );
}
