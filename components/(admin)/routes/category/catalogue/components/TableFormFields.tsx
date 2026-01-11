// components
import Input from "@/lib/Forms/Input/Input";
import SelectImage from "@/components/custom/inputs/image/SelectImage";

// types
import { type CatalogueCategoryDocument } from "@/common/types/documentation/categories/catalogueCategory";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: CatalogueCategoryDocument;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 w-[30vw] max-h-[calc(100dvh_-_200px)] px-2 overflow-y-scroll scrollbar-hide pb-20">
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Name"
        }}
        defaultValue={initialDocument?.name}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="title"
        isRequired
        labelConfig={{
          label: "Title"
        }}
        defaultValue={initialDocument?.title}
        errorCheck={false}
        validCheck={false}
      />
      <SelectImage
        name="icon"
        label="Icon"
        isRequired
        defaultValue={initialDocument?.icon as string}
      />
    </section>
  );
}
