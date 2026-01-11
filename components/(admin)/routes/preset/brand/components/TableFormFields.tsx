// components
import Banner from "@/components/custom/inputs/banner/Banner";
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type BrandDocument } from "@/common/types/documentation/presets/brand";
import SEOMeta from "@/components/custom/inputs/seoMeta/SEOMeta";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: BrandDocument;
}) {
  return (
    <section className="flex flex-col gap-4 w-full max-h-[calc(100dvh_-_200px)] py-5 pb-20 overflow-y-scroll overflow-x-visible scrollbar-hide">
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
      <Input
        type="email"
        name="mail"
        isRequired
        labelConfig={{
          label: "Mail",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.mail || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="contactNumber"
        isRequired
        labelConfig={{
          label: "Contact Number",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.contactNumber || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Textarea
        name="address"
        isRequired
        labelConfig={{
          label: "Address",
          labelStyle: "",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.address || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Banner
        name="banner"
        label="Banner"
        defaultValue={initialDocument?.banner}
      />
      <Input
        type="number"
        name="ratingValue"
        isRequired={false}
        labelConfig={{
          label: "Rating Value",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.rating?.value?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="ratingCount"
        isRequired={false}
        labelConfig={{
          label: "Rating Count",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.rating?.count?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
      <SEOMeta
        name="meta"
        label="SEO Meta"
        /* defaultValue={
          initialDocument?. ||
          ({
            title: name,
            tags: [] as string[],
            description: ""
          } as SEOMetaDocument)
        } */
      />
    </section>
  );
}
