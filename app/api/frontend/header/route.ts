// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getNavLinks } from "./controllers";

// constants
import { HEADER_CACHE_KEY } from "@/common/constants/cacheKeys";
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<HeaderNavLinkDocument[]>> => {
  try {
    const cachedDocuments = await getFromRedis<HeaderNavLinkDocument[]>({
      key: HEADER_CACHE_KEY
    });

    if (!cachedDocuments || !cachedDocuments.length) {
      const documents = await getNavLinks();

      if (!documents) {
        return Response<HeaderNavLinkDocument[]>(notFoundErrorResponse);
      }

      await setToRedis({
        key: HEADER_CACHE_KEY,
        value: documents
      });

      return Response(successData(documents));
    } else {
      return Response(successData(cachedDocuments));
    }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
