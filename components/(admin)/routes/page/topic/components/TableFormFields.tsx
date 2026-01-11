// utils
import { toKebabCase } from "@/common/utils/case";

// hooks
import { useDispatch, useSelector } from "@/store/withType";
import { useEffect, useState } from "react";

// redux
import {
  createContentCategoryAction,
  selectContentCategory
} from "@/store/features/categories/contentCategorySlice";
import {
  createCityAction,
  selectCity
} from "@/store/features/presets/citySlice";

// components
import Banner from "@/components/custom/inputs/banner/Banner";
import Input from "@/lib/Forms/Input/Input";
import QAs from "@/components/custom/inputs/qas/QAs";
import QuickLinks from "@/components/custom/inputs/quickLinks/QuickLinks";
import RedirectList from "@/components/custom/inputs/redirectList/RedirectList";
import RelatedContentCategories from "@/components/custom/inputs/relatedContentCategories/RelatedContentCategories";
import RichTextEditor from "@/lib/Forms/RichTextEditor/temp/RichTextEditor";
import SelectContent from "@/components/custom/inputs/selectContent/SelectContent";
import SEOMeta from "@/components/custom/inputs/seoMeta/SEOMeta";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type TopicDocument } from "@/common/types/documentation/pages/topic";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: TopicDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const contentCategoryStatus = useSelector(selectContentCategory.status);

  const { options: contentCategoryOptions } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const cityStatus = useSelector(selectCity.status);

  const { options: cityOptions } = useSelector((state) =>
    selectCity.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [name, setName] = useState<string>(initialDocument?.name || "");
  const [slugPlaceholder, setSlugPlaceholder] = useState<string>("");
  const [includeRelatedCategories, setIncludeRelatedCategories] =
    useState<boolean>(
      // Boolean(initialDocument?.relatedCategories?.categories?.length) || false
      false
    );
  const [includeBanner, setIncludeBanner] = useState<boolean>(
    Boolean(initialDocument?.media?.banner?.images?.length) || false
  );
  const [includeQuickLinks, setIncludeQuickLinks] = useState<boolean>(
    Boolean(initialDocument?.media?.quickLinks?.length) || false
  );

  // effects
  useEffect(() => {
    if (contentCategoryStatus === "idle") {
      dispatch(createContentCategoryAction.fetchDocumentList());
    }
  }, [contentCategoryStatus, dispatch]);

  useEffect(() => {
    if (cityStatus === "idle") {
      dispatch(createCityAction.fetchDocumentList());
    }
  }, [cityStatus, dispatch]);

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
      <Input
        type="dropdown"
        name="category"
        labelConfig={{
          label: "Category 1"
        }}
        isRequired
        nullOption
        customInitialValuePlaceholderLabel="Select Category"
        options={contentCategoryOptions}
        defaultValue={initialDocument?.category as string}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Category 2"
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
        onChange={() => {}}
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
      <Input
        type="dropdown"
        name="city"
        labelConfig={{
          label: "City"
        }}
        isRequired={false}
        nullOption
        customInitialValuePlaceholderLabel="Select City"
        options={cityOptions}
        defaultValue={initialDocument?.city as string}
        errorCheck={false}
        validCheck={false}
      />
      {/* <Toggle
        name={"includeRelatedCategories"}
        label="Include Related Categories"
        isActive={includeRelatedCategories}
        onChangeIsActive={(newIncludeRelatedCategories) => {
          setIncludeRelatedCategories(newIncludeRelatedCategories);
        }}
        className="grid-cols-[220px_1fr]"
      />
      {includeRelatedCategories && (
        <RelatedContentCategories
          name="relatedCategories"
          label="Related Categories"
          defaultValue={initialDocument?.relatedCategories}
        />
      )} */}
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
      <RichTextEditor
        width={70}
        height={"300px"}
        name={"topContent"}
        label="Top Content"
        layoutStyle="pt-3"
        defaultValue={initialDocument?.info?.topContent || ""}
      />
      <RichTextEditor
        width={70}
        height={"300px"}
        name={"bottomContent"}
        label="Bottom Content"
        layoutStyle="pt-3"
        defaultValue={initialDocument?.info?.bottomContent || ""}
      />
      <Toggle
        name={"includeBanner"}
        label="Include Banner"
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
        label="Include Quick Links"
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
      <SEOMeta
        name="meta"
        label="SEO Meta"
        defaultValue={initialDocument?.seo?.meta}
      />
      <span className="h-px w-full bg-charcoal-3/30 mt-5 mb-2" />
      <QAs
        name="faqs"
        label="FAQs"
        itemLabel="FAQ"
        defaultValue={initialDocument?.seo?.faqs}
      />
      <SelectContent
        type="both"
        name="contents"
        label="Contents"
        isRequired
        defaultValue={initialDocument?.contents as string[]}
      />
    </section>
  );
}
