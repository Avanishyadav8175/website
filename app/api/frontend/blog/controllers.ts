// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { BlogCategories, BlogArticles } = models;

// constants
import { BLOG_ARTICLE_PER_PAGE } from "@/common/constants/limits";

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type BlogArticleSuggestionDocument } from "@/common/types/documentation/nestedDocuments/blogArticleSuggestion";
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type SortOrder } from "mongoose";

// constants
const SELECT = {
  article: [
    "author",
    "categories",
    "slug",
    "heading",
    "layouts",
    "createdAt",
    "meta"
  ],
  content: [
    "type",
    "name",
    "slug",
    "media.primary",
    "delivery.slots.timeSlots",
    "quality.rating.value",
    "price",
    "edible"
  ],
  image: ["alt", "defaultAlt", "url"]
};

const POPULATE = {
  article: [
    {
      path: "author",
      select: ["name", "photo"]
    },
    {
      path: "categories",
      select: ["name"]
    },
    {
      path: "layouts.layout.image.images",
      select: ["url", "alt", "defaultAlt"],
      strictPopulate: false
    }
  ],
  content: [
    {
      path: "media.primary",
      select: SELECT.image
    },
    {
      path: "tag.promotionTag",
      select: ["name"],
      populate: [
        {
          path: "color",
          select: ["hexCode"]
        }
      ],
      strictPopulate: false
    },
    {
      path: "delivery.processingTime",
      select: ["hours"]
    },
    {
      path: "delivery.slots.type",
      select: ["name", "price", "timeSlots"]
    }
  ]
};

const SORT: { [key: string]: { [key: string]: SortOrder } } = {
  article: {
    createdAt: -1
  },
  category: {
    name: 1
  }
};

// controllers
export const getMeta = async ({
  slug
}: {
  slug: string;
}): Promise<BlogArticleDocument | null> => {
  try {
    await connectDB();

    const document = await BlogArticles.findOne({
      isActive: true,
      slug
    })
      .select(["layouts", "meta"])
      .populate([
        {
          path: "layouts.layout.image.images",
          select: ["url", "alt", "defaultAlt"],
          strictPopulate: false
        }
      ]);

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getBlogCategories = async (): Promise<
  BlogCategoryDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await BlogCategories.find({
      isActive: true
    })
      .select(["name"])
      .sort(SORT.category);

    if (!documents) {
      return documents;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getBlogArticlesCount = async (): Promise<number | null> => {
  try {
    await connectDB();

    const count = await BlogArticles.countDocuments({
      isActive: true
    });

    if (!count) {
      return 0;
    }

    return count;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getBlogArticles = async (): Promise<
  BlogArticleDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await BlogArticles.find({
      isActive: true
    }).select(["slug"]);

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getBlogArticleDataI = async ({
  slug
}: {
  slug: string;
}): Promise<BlogArticleDocument | null> => {
  try {
    await connectDB();

    const document = await BlogArticles.findOne({
      isActive: true,
      slug
    })
      .select(SELECT.article)
      .populate([
        ...POPULATE.article,
        {
          path: "tags",
          select: ["name"]
        },
        {
          path: "layouts.layout.content",
          select: SELECT.content,
          populate: POPULATE.content,
          strictPopulate: false
        }
      ]);

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getBlogArticleDataII = async ({
  slug
}: {
  slug: string;
}): Promise<BlogArticleDocument | null> => {
  try {
    await connectDB();

    const document = await BlogArticles.findOne({
      isActive: true,
      slug
    }).select(["tags"]);

    if (!document) {
      return null;
    }

    const [relatedArticles, latestArticles] = await Promise.all([
      BlogArticles.find({
        slug: { $ne: slug },
        isActive: true,
        tags: { $in: document.tags }
      })
        .skip(0)
        .limit(5)
        .select(SELECT.article)
        .populate(POPULATE.article)
        .sort(SORT.article),
      BlogArticles.find({
        slug: { $ne: slug },
        isActive: true
      })
        .skip(0)
        .limit(10)
        .select(SELECT.article)
        .populate(POPULATE.article)
        .sort(SORT.article)
    ]);

    const documentObj = document.toObject();

    const filteredLatestArticles = latestArticles
      .filter(
        ({ _id: latestArticleId }) =>
          !relatedArticles.find(
            ({ _id: relatedArticleId }) =>
              String(relatedArticleId) === String(latestArticleId)
          )
      )
      .slice(0, 5);

    documentObj._suggestions = {
      latest: filteredLatestArticles,
      related: relatedArticles
    } as BlogArticleSuggestionDocument;

    return documentObj;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getBlogPageArticles = async ({
  page
}: {
  page: number;
}): Promise<{ count: number; articles: BlogArticleDocument[] } | null> => {
  try {
    await connectDB();

    const [count, documents] = await Promise.all([
      BlogArticles.countDocuments({ isActive: true }),
      BlogArticles.find({
        isActive: true
      })
        .skip((page - 1) * BLOG_ARTICLE_PER_PAGE)
        .limit(BLOG_ARTICLE_PER_PAGE)
        .select(SELECT.article)
        .populate(POPULATE.article)
        .sort(SORT.article)
    ]);

    if (!documents) {
      return null;
    }

    return { count, articles: documents };
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getBlogCategoryArticles = async ({
  id
}: {
  id: string;
}): Promise<{
  category: BlogCategoryDocument;
  articles: BlogArticleDocument[];
} | null> => {
  try {
    await connectDB();

    const [category, documents] = await Promise.all([
      BlogCategories.findById(id).select(["name"]),
      BlogArticles.find({
        isActive: true,
        categories: id
      })
        .select(SELECT.article)
        .populate(POPULATE.article)
        .sort(SORT.article)
    ]);

    if (!category || !documents) {
      return null;
    }

    return { category, articles: documents };
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
