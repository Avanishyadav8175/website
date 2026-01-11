// constants
import { QUICK_BUILD } from "@/config/quickBuild";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// vercel - Next.js requires literal string, not constant reference
export const dynamic = "auto";

// requests
import { fetchContentPageData } from "@/request/content/contentPageData";
import { fetchContentPageMeta } from "@/request/content/contentPageMeta";
import { fetchContents } from "@/request/content/contents";

// utils
import { createMetadata } from "@/common/utils/createMetadata";
import { notFound } from "next/navigation";

// components
import BreadcrumbsWrapper from "@/components/(_common)/Breadcrumbs/ContentCategoryBreadcrumbs";
import BodyWrapper from "@/components/(frontend)/components/wrapper/BodyWrapper";
import ContentPage from "@/components/pages/(frontend)/Content/ContentPage";

// types
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { type BreadcrumbsType } from "@/common/types/types";
import { type Metadata, type ResolvingMetadata } from "next";

export async function generateStaticParams() {
  if (RENDERING_STRATEGY === "ISR") {
    try {
      const response = await fetchContents(
        {
          active: true,
          select: ["slug"],
          filterBy: "type",
          keyword: "product",
          sortBy: "slug",
          orderBy: "asc"
        },
        RENDERING_STRATEGY
      );

      const products =
        response && response.data ? (response.data as ContentDocument[]) : [];

      const productSlugs: { productSlug: string }[] = products
        .slice(0, QUICK_BUILD ? 1 : products.length)
        .map(({ slug }) => ({
          productSlug: slug
        }));

      return productSlugs;
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
    params: Promise<{ productSlug: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = (await params).productSlug;

    const response = await fetchContentPageMeta(slug, RENDERING_STRATEGY);

    if (response.data) {
      const path = `${FRONTEND_LINKS.PRODUCT_PAGE.substring(1)}/${slug}`;
      const meta = response.data.seoMeta as SEOMetaDocument;
      const images = [
        (response.data.media?.primary as ImageDocument).url,
        ...(response.data.media?.gallery as ImageDocument[]).map(
          ({ url }) => url
        )
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

async function fetchProduct(slug: string) {
  try {
    const response = await fetchContentPageData(slug, RENDERING_STRATEGY);

    if (response.data) {
      return response.data as ContentDocument;
    }
  } catch (error) {
    return { error: "Not Found" };
  }

  return { error: "Not Found" };
}

export default async function ProductPageRoute({
  params
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await fetchProduct(productSlug);

  // @ts-ignore
  if (!product || product?.error) return notFound();

  const breadcrumbsData: BreadcrumbsType[] = [
    {
      label: (
        (product as ContentDocument).category.primary as ContentCategoryDocument
      ).name,
      link: `/${((product as ContentDocument).category.primary as ContentCategoryDocument).slug}`
    },
    { label: (product as ContentDocument).name, link: `${FRONTEND_LINKS.PRODUCT_PAGE}/${productSlug}` }
  ];

  return (
    <BodyWrapper>
      <BreadcrumbsWrapper
        breadcrumbs={breadcrumbsData}
        hideInMobile
        className={`relative grid grid-rows-[repeat(8,auto)] sm:grid-rows-[repeat(7,auto)] auto-rows-min grid-cols-1 sm:gap-x-5 gap-y-0`}
      >
        <ContentPage
          isProduct
          content={product as ContentDocument}
        />
      </BreadcrumbsWrapper>
    </BodyWrapper>
  );
}
