// config
import { QUICK_BUILD } from "@/config/quickBuild";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// vercel - Next.js requires literal string, not constant reference
export const dynamic = "auto";

// requests
import { fetchContentCategoryPageData } from "@/request/categories/contentCategoryPageData";
import { fetchContentCategoryPageMeta } from "@/request/categories/contentCategoryPageMeta";
import { fetchContentCategoryPageSlugs } from "@/request/categories/contentCategoryPageSlugs";

// utils
import { createMetadata } from "@/common/utils/createMetadata";
import { notFound } from "next/navigation";

// components
import BreadcrumbsWrapper from "@/components/(_common)/Breadcrumbs/ContentCategoryBreadcrumbs";
import BodyWrapper from "@/components/(frontend)/components/wrapper/BodyWrapper";
import CategoryPage from "@/components/pages/(frontend)/category/CategoryPage";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type BannerImageDocument } from "@/common/types/documentation/nestedDocuments/bannerImage";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { type BreadcrumbsType } from "@/common/types/types";
import { type Metadata, type ResolvingMetadata } from "next";

export async function generateStaticParams() {
  if (RENDERING_STRATEGY === "ISR") {
    try {
      const response = await fetchContentCategoryPageSlugs(RENDERING_STRATEGY);

      const contentCategories =
        response && response?.data
          ? (response.data as ContentCategoryDocument[])
          : [];

      const contentCategorySlugs: { categorySlug: string }[] = contentCategories
        .slice(0, QUICK_BUILD ? 1 : contentCategories.length)
        .map(({ slug }) => ({
          categorySlug: slug
        }));
      return contentCategorySlugs;
    } catch (error) {
      return [];
    }
  }

  return [];
}

export async function generateMetadata(
  {
    params
  }: {
    params: Promise<{ categorySlug: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = (await params).categorySlug;

    const response = await fetchContentCategoryPageMeta(
      slug,
      RENDERING_STRATEGY
    );

    if (response?.data) {
      const path = slug;
      const meta = response.data.seo?.meta as SEOMetaDocument;
      const images = [
        ...((
          response.data.media?.banner?.images as BannerImageDocument[]
        )?.flatMap(({ desktop, mobile }) => [
          (desktop as ImageDocument).url,
          (mobile as ImageDocument).url
        ]) || []),
        (response.data.media?.icon as ImageDocument).url
      ];

      return await createMetadata({
        path,
        meta,
        images,
        parent
      });
    }
  } catch (error) {
    return {} as Metadata;
  }

  return {} as Metadata;
}

async function fetchContentCategory(slug: string) {
  try {
    const response = await fetchContentCategoryPageData(
      slug,
      RENDERING_STRATEGY
    );

    if (response?.data) {
      return response.data as ContentCategoryDocument;
    }
  } catch (error) {
    return null;
  }

  return null;
}

export default async function page({
  params
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  let contentCategory = await fetchContentCategory(categorySlug);

  if (!contentCategory) {
    return notFound();
  }

  const breadcrumbsData: BreadcrumbsType[] = [
    {
      label: (contentCategory as ContentCategoryDocument)?.name || "",
      link: `/${categorySlug}`
    }
  ];

  return (
    <BodyWrapper>
      <BreadcrumbsWrapper
        breadcrumbs={breadcrumbsData}
        className={`relative grid grid-rows-[repeat(8,auto)] sm:grid-rows-[repeat(7,auto)] auto-rows-min grid-cols-1 sm:gap-x-5 gap-y-0`}
      >
        <CategoryPage
          breadcrumbs={breadcrumbsData}
          category={contentCategory}
        />
      </BreadcrumbsWrapper>
    </BodyWrapper>
  );
}
