// config
import { QUICK_BUILD } from "@/config/quickBuild";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// vercel - Next.js requires literal string, not constant reference
export const dynamic = "auto";

// requests
import { fetchDynamicPageData } from "@/request/page/dynamic";
import { fetchDynamicPageMeta } from "@/request/page/dynamicPageMeta";

// constants
import { DOMAIN } from "@/common/constants/domain";

// utils
import { createMetadata } from "@/common/utils/createMetadata";
import { notFound } from "next/navigation";

// components
import BodyWrapper from "@/components/(frontend)/components/wrapper/BodyWrapper";
import BentoHomepage from "@/components/pages/(frontend)/Home/BentoHomepage";

// types
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { type DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";
import { type HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { type Metadata, type ResolvingMetadata } from "next";

export async function generateStaticParams() {
  if (RENDERING_STRATEGY === "ISR") {
    try {
      const response = await fetch(`${DOMAIN}/api/frontend/dynamic-page`);

      if (response.status !== 200 || !response.ok) return [];

      const dynamicPages = await response.json();

      const slugs: { slug: string }[] = dynamicPages.slice(
        0,
        QUICK_BUILD ? 1 : dynamicPages.length
      );

      return slugs.map(({ slug }) => ({ dynamicSlug: slug }));
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
    params: Promise<{ dynamicSlug: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = (await params).dynamicSlug;

    const response = await fetchDynamicPageMeta(slug, RENDERING_STRATEGY);

    if (response?.data) {
      const path = `${FRONTEND_LINKS.DYNAMIC_PAGE.substring(1)}/${slug}`;
      const meta = response.data.seoMeta as SEOMetaDocument;
      const images = [] as string[];

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

async function fetchDynamicPage(slug: string) {
  try {
    const response = await fetchDynamicPageData(slug, RENDERING_STRATEGY);

    if (response.data) {
      return response.data as DynamicPageDocument;
    }
  } catch (error) { }

  return { error: "Not found" };
}

export default async function Home({
  params
}: {
  params: Promise<{ dynamicSlug: string }>;
}) {
  const { dynamicSlug } = await params;
  const res = await fetchDynamicPage(dynamicSlug);

  // @ts-ignore
  if (!res || res?.error) return notFound();

  return (
    <BodyWrapper>
      <BentoHomepage
        data={
          (res as DynamicPageDocument).layouts.map((lt) => ({
            ...lt,
            createdBy: "",
            updatedBy: ""
          })) as HomepageLayoutDocument[]
        }
        inFrontend
      />
    </BodyWrapper>
  );
}
