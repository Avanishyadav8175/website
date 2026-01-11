import models from "@/db/mongoose/models";
import connectDB from "@/db/mongoose/connection";
import { handleError } from "@/common/utils/api/error";
import { MongooseErrorType } from "@/common/types/apiTypes";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

const { Contents } = models;

export const getContents = async ({
  cityId
}: {
  cityId: string | null;
}): Promise<object[] | null> => {
  try {
    await connectDB();

    /* const contents = await Contents.find({ isActive: true })
      .lean()
      .select([
        "type",
        "name",
        "slug",
        "media.primary",
        "quality.rating.value",
        "edible"
      ])
      .limit(500)
      .populate([
        {
          path: "media.primary",
          select: "url"
        }
      ])
      .exec(); */

    const contents = await Contents.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: "images",
          localField: "media.primary",
          foreignField: "_id",
          as: "media.primary"
        }
      },
      {
        $unwind: {
          path: "$media.primary",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          type: 1,
          name: 1,
          slug: 1,
          "media.primary.url": 1,
          rating: 1,
          edible: 1
        }
      },
      { $limit: 500 }
    ]);

    if (!contents || contents.length === 0) {
      return null;
    }

    return contents.map(({ type, name, slug, media, quality, edible }) => ({
      name,
      slug: `${type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${slug}`,
      // @ts-ignore
      image: media.primary.url,
      rating: quality?.rating?.value || 0,
      edible: edible
        ? [edible.isEdible, edible.type || "unspecified"]
        : undefined
    }));
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
