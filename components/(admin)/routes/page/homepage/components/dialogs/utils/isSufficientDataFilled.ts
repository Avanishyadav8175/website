import { QuickLinkDocument } from "@/common/types/documentation/presets/quickLink";
import { HomepageLayoutType } from "../../../HomepageManagement";

export const isSufficientDataFilled = (
  data: HomepageLayoutType | undefined
): boolean => {
  if (data === undefined) return false;

  const { _id, layout: layoutLayout, order, tag, type, isDisabled } = data;

  if (!tag || !type || order === undefined) return false;

  // type: title
  if (type === "title") {
    if (data.data && data.data.length) return true;
  } else {
    switch (tag) {
      case "banner":
        const banner = data.layout.banner;
        if (banner && banner.images && banner.images.length > 0) {
          const imgs = banner.images;
          const isValid = imgs
            .map(({ path, desktop, mobile }) => ({
              mobile:
                typeof mobile === "object" &&
                "_id" in mobile &&
                "url" in mobile &&
                "defaultAlt" in mobile &&
                mobile.url.length > 0,
              desktop:
                typeof desktop === "object" &&
                "_id" in desktop &&
                "url" in desktop &&
                "defaultAlt" in desktop &&
                desktop.url.length > 0,
              path: path ? (path.length > 0 ? true : false) : true
            }))
            .reduce(
              (acc, val) => (acc &&= val.desktop && val.path && val.mobile),
              true
            );

          return isValid;
        }
        break;
      case "category":
        const categories = data.layout.category;
        if (
          categories &&
          categories.shape &&
          categories.columns &&
          categories.columns > 0 &&
          categories.images &&
          categories.images.filter((x) => x !== undefined).length > 0
        ) {
          const images = categories.images.filter(
            (x) => x !== undefined
          ) as QuickLinkDocument[];

          const isValid = images
            .map(({ path, image }) =>
              path !== undefined &&
              path &&
              image !== undefined &&
              "url" in (image as object)
                ? true
                : false
            )
            .reduce((acc, val) => (acc &&= val), true);

          return isValid;
        }

        break;
      case "collage":
        const collage = data.layout.collage;
        if (
          collage &&
          collage.type &&
          collage.type.length > 0 &&
          collage.images &&
          collage.images.length
        ) {
          const collageImages = collage.images.filter(
            (x) => x !== undefined
          ) as QuickLinkDocument[];

          const isValid = collageImages
            .map(({ path, image }) =>
              path !== undefined &&
              path &&
              path.length > 0 &&
              image !== undefined &&
              // "alt" in (image as object) &&
              "url" in (image as object)
                ? true
                : false
            )
            .reduce((acc, val) => (acc &&= val), true);

          return isValid;
        }
        break;
      case "content":
        const contents = data.layout.content;
        if (contents && contents.filter((x) => x !== undefined).length > 0)
          return true;
        break;
      case "faq":
        const faqs = data.layout.faq;
        if (faqs && faqs.length) {
          const allFAQsValid = faqs
            .map(
              ({ question, answer }) =>
                question !== undefined &&
                question.length > 0 &&
                answer !== undefined &&
                answer.length > 0
            )
            .reduce((valid, val) => (valid &&= val), true);

          return allFAQsValid;
        }
        break;
      case "quick-link":
        const quickLinks = data.layout.quickLink;
        if (quickLinks && quickLinks.length) {
          const isValidQuickLinks: boolean = quickLinks
            .map(({ heading, links }) => ({
              heading:
                heading !== undefined && heading !== null && heading.length > 0,
              links:
                links &&
                links.length > 0 &&
                links
                  .map(
                    ({ label, path }) =>
                      label !== undefined &&
                      label !== null &&
                      label.length > 0 &&
                      path !== undefined &&
                      path !== null &&
                      path.length > 0
                  )
                  .reduce((acc, val) => (acc &&= val), true)
            }))
            .reduce(
              (isValid, val) => (isValid &&= val.heading && val.links),
              true
            );

          return isValidQuickLinks;
        }
        break;
      case "text":
        if (data.layout && data.layout.text && data.layout.text.length > 0)
          return true;
        break;
    }
  }

  return false;
};
