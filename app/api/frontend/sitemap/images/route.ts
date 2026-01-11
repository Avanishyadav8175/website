// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import {
  getBlogImagesSitemapData,
  getCategoryImagesSitemapData,
  getHomepageImagesSitemapData,
  getProductImagesSitemapData,
  getServiceImagesSitemapData,
  getSubTopicImagesSitemapData,
  getTopicImagesSitemapData
} from "./controllers";

// constants
import { SITEMAP_IMAGES_CACHE_KEY } from "@/common/constants/cacheKeys";

// utils
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type ImageSitemapData } from "@/common/types/sitemap";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<ImageSitemapData[]>> => {
  try {
    const cachedSitemapData = await getFromRedis<ImageSitemapData[]>({
      key: SITEMAP_IMAGES_CACHE_KEY
    });

    if (!cachedSitemapData) {
      const [
        homepageImagesSitemapData,
        categoryImageSitemapData,
        productImagesSitemapData,
        serviceImagesSitemapData,
        topicImagesSitemapData,
        subTopicImagesSitemapData,
        blogImagesSitemapData
      ] = await Promise.all([
        getHomepageImagesSitemapData(),
        getCategoryImagesSitemapData(),
        getProductImagesSitemapData(),
        getServiceImagesSitemapData(),
        getTopicImagesSitemapData(),
        getSubTopicImagesSitemapData(),
        getBlogImagesSitemapData()
      ]);

      if (
        !homepageImagesSitemapData ||
        !categoryImageSitemapData ||
        !productImagesSitemapData ||
        !serviceImagesSitemapData ||
        !topicImagesSitemapData ||
        !subTopicImagesSitemapData ||
        !blogImagesSitemapData
      ) {
        return Response<ImageSitemapData[]>(notFoundErrorResponse);
      }

      const sitemapData = [
        ...homepageImagesSitemapData,
        ...categoryImageSitemapData,
        ...productImagesSitemapData,
        ...serviceImagesSitemapData,
        ...topicImagesSitemapData,
        ...subTopicImagesSitemapData,
        ...blogImagesSitemapData
      ];

      await setToRedis({
        key: SITEMAP_IMAGES_CACHE_KEY,
        value: sitemapData
      });

      return Response(successData(sitemapData));
    } else {
      return Response(successData(cachedSitemapData));
    }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
