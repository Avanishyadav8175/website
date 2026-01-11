import models from "@/db/mongoose/models";
import connectDB from "@/db/mongoose/connection";
import { handleError } from "@/common/utils/api/error";
import { MongooseErrorType } from "@/common/types/apiTypes";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import mongoose from "mongoose";

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
      .populate([
        {
          path: "media.primary",
          select: "url"
        }
      ])
      .exec(); */

    const id = cityId !== null ? new mongoose.Types.ObjectId(cityId) : null;

    const priceFilterQuery =
      id === null
        ? {
            basePrice: "$price.base.price"
          }
        : {
            basePrice: "$price.base.price",
            price: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$price.cities",
                    as: "cityObj",
                    cond: {
                      $eq: ["$$cityObj.city", id]
                    }
                  }
                },
                0
              ]
            }
          };

    const contents = await Contents.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: "images",
          localField: "media.primary",
          foreignField: "_id",
          as: "media.primary",
          pipeline: [
            {
              $project: {
                url: 1,
                _id: 0
              }
            }
          ]
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
          image: "$media.primary.url",
          rating: "$quality.rating.value",
          edible: 1,
          ...priceFilterQuery
        }
      }
    ]);

    if (!contents || contents.length === 0) {
      return null;
    }

    return contents.map(
      ({ type, name, slug, image, rating, edible, price, basePrice }) => ({
        name,
        slug: `${type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${slug}`,
        price: typeof price === "object" ? price.price : price,
        basePrice,
        // @ts-ignore
        image,
        rating,
        edible: edible
          ? [edible.isEdible, edible.type || "unspecified"]
          : undefined
      })
    );
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
