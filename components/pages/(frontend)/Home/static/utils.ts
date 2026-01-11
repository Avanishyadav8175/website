import { HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { HomepageLayoutStructure } from "./types";
import { PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import { LayoutCollageDocument } from "@/common/types/documentation/nestedDocuments/layoutCollage";
import { LayoutCategoryDocument } from "@/common/types/documentation/nestedDocuments/layoutCategory";

// from redux to local document ---------------
export const getHomepageStructure = (
  data: HomepageLayoutDocument[]
): HomepageLayoutStructure[] => {
  const structuredLayouts: HomepageLayoutStructure[] = data
    .filter((x) => x !== undefined)
    .slice()
    .sort(
      (a: HomepageLayoutDocument, b: HomepageLayoutDocument) =>
        (a.order || 0) - (b.order || 0)
    )
    .map(
      ({ type, title, layout, order, _id, isActive, customBG, subtitle }) => {
        if (title !== undefined) {
          return {
            type: "title",
            data: title as string,
            subtitle,
            order,
            tag: "title",
            _id: _id as string,
            layout,
            customBG,
            isDisabled:
              isActive === undefined || isActive === null ? false : !isActive
          } as HomepageLayoutStructure;
        }

        return {
          type: "component",
          order,
          tag: type,
          _id: _id as string,
          layout,
          customBG,
          isDisabled:
            isActive === undefined || isActive === null ? false : !isActive
        } as HomepageLayoutStructure;
      }
    );

  return structuredLayouts;
};

// from local document to redux ---------------
export const getHomepageDocuments = (
  homepage: HomepageLayoutStructure[]
): HomepageLayoutDocument[] => {
  const homepageDocuments = homepage
    .slice()
    .sort(
      (a: HomepageLayoutStructure, b: HomepageLayoutStructure) =>
        a.order - b.order
    )
    .slice()
    .map((doc) => {
      const { _id, order, tag, isDisabled, layout, isNew, isModified, type } =
        doc;

      if (type === "title") {
        const homepageDoc: HomepageLayoutDocument = {
          order,
          title: "...",
          type: "text",
          layout: {} as PageLayoutDocument,
          leftAlign: doc.leftAlign || false,
          isActive: isDisabled || false
        } as HomepageLayoutDocument;

        return _id.length === 20
          ? homepageDoc
          : ({ ...homepageDoc, _id } as HomepageLayoutDocument);
      }

      const homepageDoc: HomepageLayoutDocument = {
        order,
        type: tag,
        layout,
        extraSpacing: doc.extraSpacing || false,
        isActive: isDisabled || false
      } as HomepageLayoutDocument;

      return _id.length === 20
        ? homepageDoc
        : ({ ...homepageDoc, _id } as HomepageLayoutDocument);
    });

  return homepageDocuments;
};

// homepage images population (FOR ADMIN) ========================================
export const populateHomepageImages = (
  layouts: HomepageLayoutStructure[],
  images: ImageDocument[]
): HomepageLayoutStructure[] => {
  let imgMap = new Map<string, ImageDocument>();
  images.forEach((img) => {
    imgMap.set(img._id as string, img);
  });

  console.log({ layouts });
  const populatedLayouts = layouts
    .map((layout) => {
      // ignore non-image layouts ---------------
      if (
        layout.type === "title" ||
        layout.tag === "text" ||
        layout.tag === "quick-link" ||
        layout.tag === "title" ||
        layout.tag === "faq"
      )
        return layout;

      // banner images -----------------------------
      if (layout.tag === "banner") {
        return {
          ...layout,
          layout: {
            banner: {
              ...layout.layout.banner,
              images: layout.layout.banner
                ? layout.layout.banner.images.map((img) => ({
                    ...img,
                    desktop:
                      typeof img.desktop === "string" &&
                      imgMap.has(img.desktop as string)
                        ? imgMap.get(img.desktop)
                        : img.desktop,
                    mobile:
                      typeof img.mobile === "string" &&
                      imgMap.has(img.mobile as string)
                        ? imgMap.get(img.mobile)
                        : img.mobile
                  }))
                : undefined
            } as BannerDocument
          }
        } as HomepageLayoutStructure;
      }

      // collage or category images -----------------------------
      if (layout.tag === "collage") {
        return {
          ...layout,
          layout: {
            collage: {
              ...layout.layout.collage,
              images: layout.layout.collage
                ? layout.layout.collage.images.map((img) => ({
                    ...img,
                    image:
                      typeof img.image === "string" &&
                      imgMap.has(img.image as string)
                        ? imgMap.get(img.image)
                        : img.image
                  }))
                : undefined
            } as LayoutCollageDocument
          }
        } as HomepageLayoutStructure;
      }

      // collage or category images -----------------------------
      if (layout.tag === "category") {
        return {
          ...layout,
          layout: {
            category: {
              ...layout.layout.category,
              images: layout.layout.category
                ? layout.layout.category.images.map((img) => ({
                    ...img,
                    image:
                      typeof img.image === "string" &&
                      imgMap.has(img.image as string)
                        ? imgMap.get(img.image)
                        : img.image
                  }))
                : undefined
            } as LayoutCategoryDocument
          }
        } as HomepageLayoutStructure;
      }

      // collage or category images -----------------------------
      if (layout.tag === "content") {
        return layout;
      }
    })
    .filter((x) => x !== undefined);

  return populatedLayouts;
};
