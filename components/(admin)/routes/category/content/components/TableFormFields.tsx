// utils
import { toKebabCase } from "@/common/utils/case";

// hooks
import { useSelector } from "@/store/withType";
import { useEffect, useState } from "react";

// redux
import { selectAdvancePayment } from "@/store/features/presets/advancePaymentSlice";
import { selectGST } from "@/store/features/presets/gstSlice";

// components
import Banner from "@/components/custom/inputs/banner/Banner";
import Input from "@/lib/Forms/Input/Input";
import QAs from "@/components/custom/inputs/qas/QAs";
import QuickLinks from "@/components/custom/inputs/quickLinks/QuickLinks";
import RedirectList from "@/components/custom/inputs/redirectList/RedirectList";
import RelatedContentCategories from "@/components/custom/inputs/relatedContentCategories/RelatedContentCategories";
import RichTextEditor from "@/lib/Forms/RichTextEditor/temp/RichTextEditor";
import SelectImage from "@/components/custom/inputs/image/SelectImage";
import SEOMeta from "@/components/custom/inputs/seoMeta/SEOMeta";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { FormSubTitle, LineSeperator } from "@/components/custom/inputs/title/Form";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: ContentCategoryDocument;
}) {
  // redux
  const { options: advancePaymentOptions } = useSelector((state) =>
    selectAdvancePayment.documentList(state, {
      active: true,
      sortBy: "value",
      orderBy: "asc"
    })
  );

  const { options: gstOptions } = useSelector((state) =>
    selectGST.documentList(state, {
      active: true,
      sortBy: "value",
      orderBy: "asc"
    })
  );

  // states
  const [name, setName] = useState<string>(initialDocument?.name || "");
  const [slugPlaceholder, setSlugPlaceholder] = useState<string>("");
  const [includeRelatedCategories, setIncludeRelatedCategories] =
    useState<boolean>(
      Boolean(initialDocument?.relatedCategories?.categories?.length) || false
    );
  const [includeBanner, setIncludeBanner] = useState<boolean>(
    Boolean(initialDocument?.media?.banner?.images?.length) || false
  );
  const [includeQuickLinks, setIncludeQuickLinks] = useState<boolean>(
    Boolean(initialDocument?.media?.quickLinks?.length) || false
  );

  // effects
  useEffect(() => {
    if (initialDocument) {
      setName(initialDocument?.name);
      setIncludeRelatedCategories(
        Boolean(initialDocument?.relatedCategories?.categories?.length) || false
      );
      setIncludeBanner(
        Boolean(initialDocument?.media?.banner?.images?.length) || false
      );
      setIncludeQuickLinks(
        Boolean(initialDocument?.media?.quickLinks?.length) || false
      );
    }
  }, [initialDocument]);

  useEffect(() => {
    setSlugPlaceholder(toKebabCase(name));
  }, [name]);

  return (
    <section className="grid grid-cols-1 gap-4 w-[70vw] max-h-[calc(100dvh_-_200px)] px-2 overflow-y-scroll scrollbar-hide pb-20">

      <FormSubTitle subtitle="Basic Data" />
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Category Name"
        }}
        customValue={{
          value: name,
          setValue: setName
        }}
        errorCheck={false}
        validCheck={false}
      />
      <input
        className="hidden"
        type="text"
        name="slugPlaceholder"
        value={slugPlaceholder}
        onChange={() => { }}
      />
      <Input
        type="text"
        name="slug"
        isRequired={false}
        labelConfig={{
          label: "URL"
        }}
        placeholder={slugPlaceholder}
        errorCheck={false}
        validCheck={false}
      />
      {/* <RedirectList
        name="redirectFrom"
        label="Old URL's"
        defaultValue={initialDocument?.redirectFrom}
      /> */}

      {/* <Input
        type="dropdown"
        name="openIn"
        labelConfig={{
          label: "Open In"
        }}
        isRequired
        nullOption
        customInitialValuePlaceholderLabel="Select OpenIn"
        options={[
          {
            label: "New Window",
            value: "_blank"
          },
          {
            label: "Same Window",
            value: "_self"
          }
        ]}
        defaultValue={initialDocument?.info?.openIn || ""}
        errorCheck={false}
        validCheck={false}
      /> */}
      <Input
        type="text"
        name="heading"
        isRequired
        labelConfig={{
          label: "Heading (H1)"
        }}
        defaultValue={initialDocument?.info?.heading || name || ""}
        errorCheck={false}
        validCheck={false}
      />
      {/* <Input
        type="dropdown"
        name="gst"
        labelConfig={{
          label: "GST"
        }}
        isRequired={false}
        nullOption
        customInitialValuePlaceholderLabel="Select GST"
        options={gstOptions}
        defaultValue={(initialDocument?.charges?.gst as string) || ""}
        errorCheck={false}
        validCheck={false}
      /> */}
      <SelectImage
        name="icon"
        label="Icon"
        isRequired
        defaultValue={initialDocument?.media?.icon as string}
      />
      <RichTextEditor
        width={70}
        height={"150px"}
        name={"topContent"}
        label="Top Description"
        layoutStyle="pt-3"
        defaultValue={initialDocument?.info?.topContent || ""}
      />
      <RichTextEditor
        width={70}
        height={"150px"}
        name={"bottomContent"}
        label="Bottom Description"
        layoutStyle="pt-3"
        defaultValue={initialDocument?.info?.bottomContent || ""}
      />

      <LineSeperator />

      <FormSubTitle subtitle="Links" />
      <Toggle
        name={"includeBanner"}
        label="Add Banner"
        isActive={includeBanner}
        onChangeIsActive={(newIncludeBanner) => {
          setIncludeBanner(newIncludeBanner);
        }}
      />
      {includeBanner && (
        <Banner
          name="banner"
          label="Banner"
          defaultValue={initialDocument?.media?.banner}
        />
      )}
      <Toggle
        name={"includeQuickLinks"}
        label="Add Quick Links"
        isActive={includeQuickLinks}
        onChangeIsActive={(newIncludeQuickLinks) => {
          setIncludeQuickLinks(newIncludeQuickLinks);
        }}
      />
      {includeQuickLinks && (
        <QuickLinks
          name="quickLinks"
          label={"Quick Links"}
          defaultValue={initialDocument?.media?.quickLinks}
        />
      )}
      {/* <Toggle
        name={"includeRelatedCategories"}
        label="Add Related Categories"
        isActive={includeRelatedCategories}
        onChangeIsActive={(newIncludeRelatedCategories) => {
          setIncludeRelatedCategories(newIncludeRelatedCategories);
        }}
        className="grid-cols-[220px_1fr]"
      /> */}
      {includeRelatedCategories && (
        <RelatedContentCategories
          name="relatedCategories"
          label="Related Categories"
          defaultValue={initialDocument?.relatedCategories}
        />
      )}


      <LineSeperator />


      <FormSubTitle subtitle="Pricings" />
      <Input
        type="dropdown"
        name="advancePayment"
        labelConfig={{
          label: "Advance Payment %"
        }}
        isRequired
        nullOption
        customInitialValuePlaceholderLabel="Select Advance Payment"
        options={advancePaymentOptions}
        defaultValue={
          (initialDocument?.charges?.advancePayment as string) ||
          advancePaymentOptions.find(({ label }) => label === "100%")?.value ||
          ""
        }
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="deliveryCharge"
        isRequired
        labelConfig={{
          label: "Platform Fees"
        }}
        defaultValue={
          initialDocument?.charges?.deliveryCharge?.toString() || ""
        }
        errorCheck={false}
        validCheck={false}
      />


      <LineSeperator />


      <SEOMeta
        name="meta"
        label="SEO Metadata"
        defaultValue={initialDocument?.seo?.meta}
      />


      <LineSeperator />


      <QAs
        name="faqs"
        label="Frequently Asked Questions"
        itemLabel="FAQ"
        defaultValue={initialDocument?.seo?.faqs}
      />
    </section>
  );
}
