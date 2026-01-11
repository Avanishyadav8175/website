import { DOMAIN } from "@/common/constants/domain";
import { BasicImageType } from "@/common/types/types";
import { BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { BlogBannerCarousel } from "@/components/(frontend)/global/_Templates/BannerCarousel/BannerCarousel";
import { BlogLayoutImageDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutImage";
import { BlogLayoutItemDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutItem";
import { ImageDocument } from "@/common/types/documentation/media/image";

export const getBlogThumbnail = (
  layouts: BlogLayoutItemDocument[]
): BasicImageType => {
  const imageLayoutItem = layouts.find(({ type }) => type === "image");

  if (!imageLayoutItem) {
    return { alt: "", url: "" };
  }

  const blogLayoutImage = Array.isArray(imageLayoutItem.layout.image)
    ? (imageLayoutItem.layout.image as BlogLayoutImageDocument[])[0]
    : (imageLayoutItem.layout.image as BlogLayoutImageDocument);

  const image = (blogLayoutImage.images as ImageDocument[])[0];

  return {
    alt: image.alt || image.defaultAlt,
    url: image.url
  };
};

export function FeaturedBlogs({
  blogArticles
}: {
  blogArticles: BlogArticleDocument[];
}) {
  if (blogArticles.length === 0) {
    return <></>;
  }

  const banners: {
    image: BasicImageType;
    link: string;
    title: string;
  }[] = blogArticles.map(({ heading, slug, layouts }) => ({
    title: heading,
    link: `${DOMAIN}/blog/${slug}`,
    image: getBlogThumbnail(layouts)
  }));

  /* return (
    <section className="max-1200:px-3.5 max-1200:pt-3">
      <Banners showBubbles elements={[]} />
    </section>
  ); */

  return <></>;
}
