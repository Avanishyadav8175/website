// config
import { QUICK_BUILD } from "@/config/quickBuild";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// vercel - Next.js requires literal string, not constant reference
export const dynamic = "auto";

// requests
import { fetchSubTopicPageData } from "@/request/page/subTopicPageData";
import { fetchSubTopicPageMeta } from "@/request/page/subTopicPageMeta";
import { fetchSubTopicPageSlugs } from "@/request/page/subTopicPageSlugs";

// utils
import { createMetadata } from "@/common/utils/createMetadata";
import { notFound } from "next/navigation";

// components
import BreadcrumbsWrapper from "@/components/(_common)/Breadcrumbs/ContentCategoryBreadcrumbs";
import BodyWrapper from "@/components/(frontend)/components/wrapper/BodyWrapper";
import SubTopicPage from "@/components/pages/(frontend)/subTopic/SubTopicPage";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type BannerImageDocument } from "@/common/types/documentation/nestedDocuments/bannerImage";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";
import { type BreadcrumbsType } from "@/common/types/types";
import { type Metadata, type ResolvingMetadata } from "next";

export async function generateStaticParams() {
  if (RENDERING_STRATEGY === "ISR") {
    try {
      let slugs: {
        categorySlug: string;
        pageSlug: string;
        subPageSlug: string;
      }[] = [];

      const response = await fetchSubTopicPageSlugs(RENDERING_STRATEGY);

      const subTopics =
        response && response?.data ? (response.data as SubTopicDocument[]) : [];

      slugs = subTopics
        .slice(0, QUICK_BUILD ? 1 : subTopics.length)
        .map(({ slug, category, topic }) => ({
          categorySlug: (category as ContentCategoryDocument).slug,
          pageSlug: (topic as TopicDocument).slug,
          subPageSlug: slug
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
    params: Promise<{
      categorySlug: string;
      topicSlug: string;
      subTopicSlug: string;
    }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const categorySlug = (await params).categorySlug;
    const topicSlug = (await params).topicSlug;
    const subTopicSlug = (await params).subTopicSlug;

    const response = await fetchSubTopicPageMeta(
      categorySlug,
      topicSlug,
      subTopicSlug,
      RENDERING_STRATEGY
    );

    if (response.data) {
      const path = `${categorySlug}/${topicSlug}/${subTopicSlug}`;
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

async function fetchSubTopic(
  categorySlug: string,
  topicSlug: string,
  subTopicSlug: string
) {
  try {
    const response = await fetchSubTopicPageData(
      categorySlug,
      topicSlug,
      subTopicSlug,
      RENDERING_STRATEGY
    );

    if (response?.data) {
      return response.data as SubTopicDocument;
    }
  } catch (error) {
    return null;
  }

  return null;
}

export default async function SubTopicPages({
  params: { categorySlug, topicSlug, subTopicSlug }
}: {
  params: { categorySlug: string; topicSlug: string; subTopicSlug: string };
}) {
  const subtopic = await fetchSubTopic(categorySlug, topicSlug, subTopicSlug);

  if (!subtopic) {
    return notFound();
  }

  const breadcrumbsData: BreadcrumbsType[] = [
    {
      label: (subtopic.category as ContentCategoryDocument).name,
      link: `/${categorySlug}`
    },
    {
      label: (subtopic.topic as TopicDocument).name,
      link: `/${categorySlug}/${topicSlug}`
    },
    {
      label: subtopic.name,
      link: `/${categorySlug}/${topicSlug}/${subTopicSlug}`
    }
  ];

  return (
    <BodyWrapper>
      <BreadcrumbsWrapper
        breadcrumbs={breadcrumbsData}
        className={`relative grid grid-rows-[repeat(8,auto)] sm:grid-rows-[repeat(7,auto)] auto-rows-min grid-cols-1 sm:gap-x-5 gap-y-0`}
      >
        <SubTopicPage
          breadcrumbs={breadcrumbsData}
          subTopic={subtopic}
        />
      </BreadcrumbsWrapper>
    </BodyWrapper>
  );
}
