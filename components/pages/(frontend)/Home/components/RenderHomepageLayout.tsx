
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import { LayoutCategoryDocument } from "@/common/types/documentation/nestedDocuments/layoutCategory";
import { LayoutCollageDocument } from "@/common/types/documentation/nestedDocuments/layoutCollage";
import { LayoutQuickLinkDocument } from "@/common/types/documentation/nestedDocuments/layoutQuickLink";
import { PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";
import { QADocument } from "@/common/types/documentation/nestedDocuments/qa";
import { HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { QuickLinkDocument } from "@/common/types/documentation/presets/quickLink";
import { Banners } from "@/components/(frontend)/global/_Templates/BannerCarousel/BannerCarouselNew";
import { BannerCarouselElementsType } from "@/components/(frontend)/global/_Templates/BannerCarousel/static/types";
import CustomTypedContent from "@/components/(frontend)/global/_Templates/CustomTypedContent/CustomTypedContent";
import FAQs from "@/components/(frontend)/global/_Templates/FAQs/FAQs";
import QuickLinks from "@/components/(frontend)/global/_Templates/QuickLinks/QuickLinks";
import UpdatedCategoryTiles from "@/components/(frontend)/global/_Templates/Tiles/CategoryTiles/UpdatedCategoryTiles";
import CollageTiles from "@/components/(frontend)/global/_Templates/Tiles/CollageTiles/CollageTiles";
import FrontendProductTiles from "@/components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTiles";

export const RenderHomepageLayout = ({
  layout,
  type,
  inAdmin
}: {
  layout: PageLayoutDocument;
  type: HomepageLayoutDocument["type"];
  inAdmin?: boolean;
}) => {
  switch (type) {
    // ===[ BANNER ]===================================================
    case "banner":
      const banner = layout.banner as BannerDocument;
      if (banner) {
        const showBubbles = banner.showIndicators || true;
        const scrollAfter = banner.scrollInterval || 7000;
        const autoScroll = banner.autoScroll;
        const type = banner.type || "default";

        const bannerElements: BannerCarouselElementsType[] = banner.images
          .filter((x) => x !== undefined)
          .map(({ desktop, mobile, path }) => ({
            image: {
              mobile: {
                alt: (mobile as ImageDocument)?.alt || "",
                url: (mobile as ImageDocument)?.url || ""
              },
              desktop: {
                alt: (desktop as ImageDocument)?.alt || "",
                url: (desktop as ImageDocument)?.url || ""
              }
            },
            isLink: path === undefined || path.length === 0 ? false : true,
            link: path as string
          }));

        return (
          <Banners
            scrollAfter={scrollAfter}
            elements={bannerElements}
            showBubbles={showBubbles}
            autoScroll={autoScroll}
            ratioType={type}
          />
        );
      } else break;

    // ===[ CATEGORY ]===================================================
    case "category":
      const categories = layout.category as LayoutCategoryDocument;
      if (categories) {
        const list =
          categories.images && categories.images.length
            ? (categories.images as QuickLinkDocument[])
              .filter((x) => x !== undefined)
              .map(({ _id, label, path, image }) => ({
                _id: _id as string,
                label,
                link: path,
                image: {
                  url: (image as ImageDocument)?.url || "",
                  alt: (image as ImageDocument)?.alt || ""
                }
              }))
            : [];

        return (
          <UpdatedCategoryTiles
            categoryList={list}
            columns={categories.columns || 2}
            shape={categories.shape}
            scrollable={categories.scrollable || false}
          />
        );
      } else break;

    // ===[ COLLAGE ]===================================================
    case "collage":
      const collage = layout.collage as LayoutCollageDocument;
      if (collage) {
        const layoutType = collage.type;
        const contents = (collage.images as QuickLinkDocument[]).map(
          ({ label, path, image }) => ({
            title: label,
            link: path,
            image: {
              url: (image as ImageDocument)?.url || "",
              alt: (image as ImageDocument)?.alt || ""
            }
          })
        );
        return (
          <CollageTiles
            tiles={{
              _id: collage._id as string,
              layoutType,
              contents
            }}
          />
        );
      } else break;

    // ===[ ProductS ]===================================================
    case "content":
      const contents = (layout.content as ContentDocument[])?.filter(
        (x) => x !== undefined
      );
      if (contents) {
        return (
          <FrontendProductTiles
            productList={contents}
            inHomePage
            currSort={"popularity"}
            inAdmin={inAdmin}
            extraCurved={true}
          />
        );
      } else break;

    // ===[ FAQs ]===================================================
    case "faq":
      const faqs = (layout.faq as QADocument[])?.filter((x) => x !== undefined);
      if (faqs) {
        const faqData = faqs.map(({ _id, question, answer }) => ({
          _id: _id as string,
          question,
          answer
        }));
        return (
          <FAQs
            faqData={faqData}
            questionClassName="sm:text-lg"
            answerClassName="sm:text-lg"
          />
        );
      } else break;

    // ===[ QUICK LINKS ]===================================================
    case "quick-link":
      const quickLinks = (
        layout.quickLink as LayoutQuickLinkDocument[]
      )?.filter((x) => x !== undefined);
      if (quickLinks) {
        const links: Array<{
          _id: string;
          heading: string;
          content: Array<{ _id: string; label: string; url: string }>;
        }> = quickLinks.map(({ heading, links, _id }) => ({
          _id: _id as string,
          heading,
          content: links.map(({ _id, label, path }) => ({
            _id: _id as string,
            label,
            url: path
          }))
        }));
        return <QuickLinks quickLinks={links} />;
      } else break;

    // ===[ CUSTOM TEXT ]===================================================
    case "text":
      const textContent = layout.text as string;
      if (textContent && textContent.length > 0)
        return <CustomTypedContent content={textContent} />;
      else break;
  }

  return <></>;
};
