// components
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";
import SelectImage from "@/components/custom/inputs/image/SelectImage";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: BlogAuthorDocument;
}) {
  return (
    <section className="flex flex-col gap-3 w-[40dvw] p-1">
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Textarea
        name="bio"
        labelConfig={{
          label: "Bio",
          layoutStyle: "",
          labelStyle: ""
        }}
        defaultValue={initialDocument?.bio || ""}
        errorCheck={false}
        validCheck={false}
      />
      <SelectImage
        name="photo"
        label="Photo"
        isRequired={false}
        defaultValue={initialDocument?.photo as string}
      />
    </section>
  );
}
