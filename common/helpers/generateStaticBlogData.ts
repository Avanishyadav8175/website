// libraries
import { decode } from "he";

// utils
import { embeddableYoutubeURL } from "@/common/helpers/embeddableYoutubeURL";

// types
import { type BlogLayoutItemDocument } from "../types/documentation/nestedDocuments/blogLayoutItem";
import { type ImageDocument } from "../types/documentation/media/image";
import { ContentDocument } from "../types/documentation/contents/content";

// export function decodeHtmlEntities(str: string): string {
//   var textarea = document.createElement("textarea");
//   textarea.innerHTML = str;

//   return textarea.value;
// }

export const decodeHtmlEntities = (str: string): string => decode(str);

export const getBlogArticleSections = (
  images: ImageDocument[],
  contents: ContentDocument[],
  data?: BlogLayoutItemDocument[],
  isFrontend?: boolean
) => {
  const articleData = data?.filter(
    ({ type }) =>
      type === "text" ||
      type === "video" ||
      type === "image" ||
      type === "content"
  );

  const sections: (string | ContentDocument[])[] =
    articleData?.map((article) => {
      // ==[ TEXT ]========================================
      if (article.type === "text") {
        const text = decodeHtmlEntities(article.layout.text || "");
        return text;
      }
      // ==[ IMAGE ]========================================
      if (article.type === "image") {
        const imgTag = (src: string, alt: string) =>
          `<div><img width="100%" src="${src}" alt="${alt}" draggable="false" loading="eager" defer="async"/></div>`;
        const imgHTMLWrapper = (style: string, shape: string, images: string) =>
          `<div class="blog-img ${shape} ${style || ""}"> ${images} </div>`;

        if (isFrontend) {
          console.log({ article: article.layout.image });
          const images =
            (article.layout.image?.images as ImageDocument[])
              ?.map(({ url, defaultAlt }) => imgTag(url, defaultAlt))
              .reduce((acc, val) => (acc += val), "") || "";

          return imgHTMLWrapper(
            article.layout.image?.style || "",
            article.layout.image?.shape || "",
            images
          );
        }

        const imgs = images
          ? Array.isArray(article.layout.image)
            ? (article.layout.image[0]?.images as string[])
            : (article.layout.image?.images as string[])
          : Array.isArray(article.layout.image)
            ? (article.layout.image[0]?.images as ImageDocument[])
            : (article.layout.image?.images as ImageDocument[]);

        if (imgs && imgs.length) {
          const imagesHTML = images
            ? (imgs as string[])
                .map((id) => {
                  const targetImg = images.find(
                    ({ _id }) => (_id as string) === id
                  );
                  return imgTag(targetImg?.url || "#", targetImg?.alt || "");
                })
                .reduce((acc, el) => (acc += el), "")
            : (imgs as ImageDocument[])
                .map(({ url, alt, defaultAlt }) =>
                  imgTag(url || "#", alt || defaultAlt || "")
                )
                .reduce((acc, el) => (acc += el), "");

          const imageSectionHTML = imgHTMLWrapper(
            Array.isArray(article.layout.image)
              ? article.layout.image[0]?.style
              : article.layout.image?.style || "",
            Array.isArray(article.layout.image)
              ? article.layout.image[0]?.shape
              : article.layout.image?.shape || "",
            imagesHTML
          );

          return imageSectionHTML;
        }
      }
      // ==[ VIDEO ]========================================
      if (article.type === "video") {
        const video = article.layout.video;
        if (video && video.length) {
          const videoHTML = `<div class="blog-vid"><iframe src="${embeddableYoutubeURL(video)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
          return videoHTML;
        }
      }

      // ==[ CONTENT ]========================================
      if (article.type === "content") {
        const contentList = article.layout.content;

        const contentDocs = contentList
          ? contentList
              .map((ct) =>
                typeof ct === "string"
                  ? contents.find(({ _id }) => (_id as string) === ct)
                  : (ct as ContentDocument)
              )
              .filter((x) => x !== undefined)
          : [];

        return contentDocs;
      }

      return "";
    }) || [];

  return sections;
};

export const getFrontendBlogArticleSections = (
  data?: BlogLayoutItemDocument[],
  images?: ImageDocument[]
) => {
  const articleData = data?.filter(
    ({ type }) => type === "text" || type === "video" || type === "image"
  );

  const sections: (
    | { className: string; images: { url: string; alt: string }[] }
    | string
  )[] =
    articleData?.map((article) => {
      // ==[ TEXT ]========================================
      if (article.type === "text") {
        const text = decodeHtmlEntities(article.layout.text || "");
        return text;
      }
      // ==[ IMAGE ]========================================
      if (article.type === "image") {
        const imgs = images
          ? Array.isArray(article.layout.image)
            ? (article.layout.image[0]?.images as string[])
            : (article.layout.image?.images as string[])
          : Array.isArray(article.layout.image)
            ? (article.layout.image[0]?.images as ImageDocument[])
            : (article.layout.image?.images as ImageDocument[]);

        if (imgs && imgs.length) {
          const imgData = images
            ? (imgs as string[]).map((id) => {
                const targetImg = images.find(
                  ({ _id }) => (_id as string) === id
                );
                return {
                  url: targetImg?.url || "#",
                  alt: targetImg?.alt || ""
                };
              })
            : (imgs as ImageDocument[]).map(({ url, alt, defaultAlt }) => ({
                url: url || "#",
                alt: alt || defaultAlt || ""
              }));

          return {
            className: `blog-img ${
              Array.isArray(article.layout.image)
                ? article.layout.image[0]?.shape
                : article.layout.image?.shape || ""
            } ${
              (Array.isArray(article.layout.image)
                ? article.layout.image[0]?.style
                : article.layout.image?.style || "") || ""
            }`,
            images: imgData
          };
        }
      }
      // ==[ VIDEO ]========================================
      if (article.type === "video") {
        const video = article.layout.video;
        if (video && video.length) {
          const videoHTML = `<div class="blog-vid"><iframe src="${embeddableYoutubeURL(video)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
          return videoHTML;
        }
      }
      return "";
    }) || [];

  return sections;
};
