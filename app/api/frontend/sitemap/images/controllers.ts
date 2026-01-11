// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const {
  HomepageLayouts,
  ContentCategories,
  Contents,
  Topics,
  SubTopics,
  BlogArticles
} = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ImageSitemapData } from "@/common/types/sitemap";
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";
import { WEBSITE_NAME } from "@/common/constants/environmentVariables";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

// controllers
export const getHomepageImagesSitemapData = async (): Promise<
  ImageSitemapData[] | null
> => {
  try {
    await connectDB();

    const homepageLayouts = await HomepageLayouts.find({
      isActive: true,
      type: "banner"
    })
      .sort({ updatedAt: -1 })
      .populate([
        {
          path: "layout.banner.images.desktop",
          select: ["url"],
          strictPopulate: false
        },
        {
          path: "layout.banner.images.mobile",
          select: ["url"],
          strictPopulate: false
        }
      ]);

    if (!homepageLayouts) {
      return null;
    }

    const imageSitemapData: ImageSitemapData[] = homepageLayouts.map(
      ({ layout: { banner } }) => {
        const images: string[] = [];

        if (banner && banner?.images?.length) {
          banner.images.forEach(({ desktop, mobile }) => {
            images.push(
              (desktop as ImageDocument).url,
              (mobile as ImageDocument).url
            );
          });
        }

        return {
          name: `${WEBSITE_NAME} Banner`,
          slug: "/",
          images
        };
      }
    );

    return imageSitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getCategoryImagesSitemapData = async (): Promise<
  ImageSitemapData[] | null
> => {
  try {
    await connectDB();

    const contentCategories = await ContentCategories.find({
      isActive: true
    })
      .select(["name", "slug"])
      .sort({ updatedAt: -1 })
      .populate([
        {
          path: "media.icon",
          select: ["url"]
        },
        {
          path: "media.banner.images.desktop",
          select: ["url"],
          strictPopulate: false
        },
        {
          path: "media.banner.images.mobile",
          select: ["url"],
          strictPopulate: false
        },
        {
          path: "media.quickLinks.image",
          select: ["url"],
          strictPopulate: false
        }
      ]);

    if (!contentCategories) {
      return null;
    }

    const imageSitemapData: ImageSitemapData[] = contentCategories.map(
      ({ name, slug, media: { icon, banner, quickLinks } }) => {
        const images = [(icon as ImageDocument).url];

        if (banner && banner?.images?.length) {
          banner.images.forEach(({ desktop, mobile }) => {
            images.push(
              (desktop as ImageDocument).url,
              (mobile as ImageDocument).url
            );
          });
        }

        if (quickLinks && quickLinks?.length) {
          quickLinks.forEach(({ image }) => {
            if (image) {
              images.push((image as ImageDocument).url);
            }
          });
        }

        return {
          name,
          slug,
          images
        };
      }
    );

    return imageSitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getProductImagesSitemapData = async (): Promise<
  ImageSitemapData[] | null
> => {
  try {
    await connectDB();

    const products = await Contents.find({
      isActive: true,
      type: "product"
    })
      .select(["name", "slug"])
      .sort({ updatedAt: -1 })
      .populate([
        {
          path: "media.primary",
          select: ["url"]
        },
        {
          path: "media.gallery",
          select: ["url"],
          strictPopulate: false
        }
      ]);

    if (!products) {
      return null;
    }

    const imageSitemapData: ImageSitemapData[] = products.map(
      ({ name, slug, media: { primary, gallery } }) => {
        const images = [];

        images.push((primary as ImageDocument).url);

        if (gallery && gallery?.length) {
          (gallery as ImageDocument[]).forEach((galleryImage) => {
            images.push(galleryImage.url);
          });
        }

        return {
          name,
          slug: `${FRONTEND_LINKS.PRODUCT_PAGE.substring(1)}/${slug}`,
          images
        };
      }
    );

    return imageSitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getServiceImagesSitemapData = async (): Promise<
  ImageSitemapData[] | null
> => {
  try {
    await connectDB();

    const products = await Contents.find({
      isActive: true,
      type: "service"
    })
      .select(["name", "slug"])
      .sort({ updatedAt: -1 })
      .populate([
        {
          path: "media.primary",
          select: ["url"]
        },
        {
          path: "media.gallery",
          select: ["url"],
          strictPopulate: false
        }
      ]);

    if (!products) {
      return null;
    }

    const imageSitemapData: ImageSitemapData[] = products.map(
      ({ name, slug, media: { primary, gallery } }) => {
        const images = [];

        images.push((primary as ImageDocument).url);

        if (gallery && gallery?.length) {
          (gallery as ImageDocument[]).forEach((galleryImage) => {
            images.push(galleryImage.url);
          });
        }

        return {
          name,
          slug: `s/${slug}`,
          images
        };
      }
    );

    return imageSitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getTopicImagesSitemapData = async (): Promise<
  ImageSitemapData[] | null
> => {
  try {
    await connectDB();

    const topics = await Topics.find({
      isActive: true
    })
      .select(["name", "slug"])
      .sort({ updatedAt: -1 })
      .populate([
        {
          path: "category",
          select: ["name", "slug"]
        },
        {
          path: "media.banner.images.desktop",
          select: ["url"],
          strictPopulate: false
        },
        {
          path: "media.banner.images.mobile",
          select: ["url"],
          strictPopulate: false
        },
        {
          path: "media.quickLinks.image",
          select: ["url"],
          strictPopulate: false
        }
      ]);

    if (!topics) {
      return null;
    }

    const imageSitemapData: ImageSitemapData[] = topics
      .filter(
        ({ media }) =>
          media?.banner?.images?.length ||
          media?.quickLinks?.filter(({ image }) => image)?.length
      )
      .map(({ name, category, slug, media: { banner, quickLinks } }) => {
        const images: string[] = [];

        if (banner && banner?.images?.length) {
          banner.images.forEach(({ desktop, mobile }) => {
            images.push(
              (desktop as ImageDocument).url,
              (mobile as ImageDocument).url
            );
          });
        }

        if (quickLinks && quickLinks?.length) {
          quickLinks.forEach(({ image }) => {
            if (image) {
              images.push((image as ImageDocument).url);
            }
          });
        }

        return {
          name: `${(category as ContentCategoryDocument).name} ${name}`,
          slug: `${(category as ContentCategoryDocument).slug}/${slug}`,
          images
        };
      });

    return imageSitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getSubTopicImagesSitemapData = async (): Promise<
  ImageSitemapData[] | null
> => {
  try {
    await connectDB();

    const subTopics = await SubTopics.find({
      isActive: true
    })
      .select(["name", "slug"])
      .sort({ updatedAt: -1 })
      .populate([
        {
          path: "category",
          select: ["name", "slug"]
        },
        {
          path: "topic",
          select: ["name", "slug"]
        },
        {
          path: "media.banner.images.desktop",
          select: ["url"],
          strictPopulate: false
        },
        {
          path: "media.banner.images.mobile",
          select: ["url"],
          strictPopulate: false
        },
        {
          path: "media.quickLinks.image",
          select: ["url"],
          strictPopulate: false
        }
      ]);

    if (!subTopics) {
      return null;
    }

    const imageSitemapData: ImageSitemapData[] = subTopics
      .filter(
        ({ media }) =>
          media?.banner?.images?.length ||
          media?.quickLinks?.filter(({ image }) => image)?.length
      )
      .map(({ name, category, topic, slug, media: { banner, quickLinks } }) => {
        const images: string[] = [];

        if (banner && banner?.images?.length) {
          banner.images.forEach(({ desktop, mobile }) => {
            images.push(
              (desktop as ImageDocument).url,
              (mobile as ImageDocument).url
            );
          });
        }

        if (quickLinks && quickLinks?.length) {
          quickLinks.forEach(({ image }) => {
            if (image) {
              images.push((image as ImageDocument).url);
            }
          });
        }

        return {
          name: `${(category as ContentCategoryDocument).name} ${(topic as TopicDocument).name} ${name}`,
          slug: `${(category as ContentCategoryDocument).slug}/${(topic as TopicDocument).slug}/${slug}`,
          images
        };
      });

    return imageSitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getBlogImagesSitemapData = async (): Promise<
  ImageSitemapData[] | null
> => {
  try {
    await connectDB();

    const blogArticles = await BlogArticles.find({
      isActive: true
    })
      .select(["name", "slug", "layouts.type"])
      .sort({ updatedAt: -1 })
      .populate([
        {
          path: "layouts.layout.image.images",
          select: ["url"],
          strictPopulate: false
        }
      ]);

    if (!blogArticles) {
      return null;
    }

    const imageSitemapData: ImageSitemapData[] = blogArticles
      .filter(
        ({ layouts }) =>
          layouts.filter(
            ({ type, layout }) =>
              type === "image" && layout?.image?.images?.length
          ).length
      )
      .map(({ name, slug, layouts }) => {
        const images: string[] = [];

        layouts.forEach(({ layout: { image } }) => {
          if (image?.images?.length) {
            image.images.forEach((image) => {
              images.push((image as ImageDocument).url);
            });
          }
        });

        return {
          name,
          slug: `blog/${slug}`,
          images
        };
      });

    return imageSitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
