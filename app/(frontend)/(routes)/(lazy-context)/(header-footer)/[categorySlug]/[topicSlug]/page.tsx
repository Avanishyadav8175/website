// constants
import { QUICK_BUILD } from "@/config/quickBuild";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// vercel - Next.js requires literal string, not constant reference
export const dynamic = "auto";

// requests
import { fetchTopicPageData } from "@/request/page/topicPageData";
import { fetchTopicPageMeta } from "@/request/page/topicPageMeta";
import { fetchTopicPageSlugs } from "@/request/page/topicPageSlugs";

// utils
import { createMetadata } from "@/common/utils/createMetadata";
import { notFound } from "next/navigation";

// components
import BreadcrumbsWrapper from "@/components/(_common)/Breadcrumbs/ContentCategoryBreadcrumbs";
import BodyWrapper from "@/components/(frontend)/components/wrapper/BodyWrapper";
import TopicPage from "@/components/pages/(frontend)/topic/TopicPage";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type BannerImageDocument } from "@/common/types/documentation/nestedDocuments/bannerImage";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";
import { type BreadcrumbsType } from "@/common/types/types";
import { type Metadata, type ResolvingMetadata } from "next";

export async function generateStaticParams() {
  if (RENDERING_STRATEGY === "ISR") {
    try {
      let slugs: { categorySlug: string; pageSlug: string }[] = [];

      const response = await fetchTopicPageSlugs(RENDERING_STRATEGY);

      const topics =
        response && response?.data ? (response.data as TopicDocument[]) : [];

      slugs = topics
        .slice(0, QUICK_BUILD ? 1 : topics.length)
        .map(({ slug, category }) => ({
          categorySlug: (category as ContentCategoryDocument).slug,
          pageSlug: slug
        }));

      return slugs;
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
    params: Promise<{ categorySlug: string; topicSlug: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const categorySlug = (await params).categorySlug;
    const topicSlug = (await params).topicSlug;

    const response = await fetchTopicPageMeta(
      categorySlug,
      topicSlug,
      RENDERING_STRATEGY
    );

    if (response.data) {
      const path = `${categorySlug}/${topicSlug}`;
      const meta = response.data.seo?.meta as SEOMetaDocument;
      const images = [
        ...((
          response.data.media?.banner?.images as BannerImageDocument[]
        )?.flatMap(({ desktop, mobile }) => [
          (desktop as ImageDocument).url,
          (mobile as ImageDocument).url
        ]) || []),
        (
          (response.data.category as ContentCategoryDocument).media
            ?.icon as ImageDocument
        ).url
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

async function fetchTopic(categorySlug: string, topicSlug: string) {
  try {
    const response = await fetchTopicPageData(
      categorySlug,
      topicSlug,
      RENDERING_STRATEGY
    );

    if (response?.data) {
      return response.data as TopicDocument;
    }
  } catch (error) {
    return null;
  }

  return null;
}

export default async function TopicPages({
  params
}: {
  params: Promise<{ categorySlug: string; topicSlug: string }>;
}) {
  const { categorySlug, topicSlug } = await params;
  const topic = await fetchTopic(categorySlug, topicSlug);

  if (!topic) {
    return notFound();
  }

  const breadcrumbsData: BreadcrumbsType[] = [
    {
      label: (topic.category as ContentCategoryDocument).name,
      link: `/${categorySlug}`
    },
    {
      label: topic.name,
      link: `/${categorySlug}/${topicSlug}`
    }
  ];

  return (
    <BodyWrapper>
      <BreadcrumbsWrapper
        breadcrumbs={breadcrumbsData}
        className={`relative grid grid-rows-[repeat(8,auto)] sm:grid-rows-[repeat(7,auto)] auto-rows-min grid-cols-1 sm:gap-x-5 gap-y-0`}
      >
        <TopicPage
          breadcrumbs={breadcrumbsData}
          topic={topic}
        />
      </BreadcrumbsWrapper>
    </BodyWrapper>
  );
}
