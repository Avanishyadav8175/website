import Input from "@/lib/Forms/Input/Input";

export default function AdminBlogTitle({
  heading,
  setHeading
}: {
  heading: string;
  setHeading: (str: string) => void;
}) {
  return (
    <Input
      type="text"
      name="title"
      isRequired
      labelConfig={{
        label: "Title",
        layoutStyle: "flex-col space-y-1.5",
        labelStyle: "font-normal text-charcoal-3/70"
      }}
      customValue={{
        value: heading,
        setValue: setHeading
      }}
      errorCheck={false}
      validCheck={false}
      placeholder="Blog Title"
      customStyle="outline-none w-full bg-transparent text-3xl pb-7 text-teal-600 pr-14"
    />
  );
}
