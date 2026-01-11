// next config
export const dynamic = "force-dynamic";

// app/api/v2/frontend/content-category-page/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import models from "@/db/mongoose/models";
import mongoose from "mongoose";

const { SubTopics } = models;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const categoryId = params.slug[0] || "";
  const pageId = params.slug[1] || "";
  const subpageId = params.slug[2] || "";
  const offset = request.nextUrl.searchParams.get("offset");
  const sortType = request.nextUrl.searchParams.get("sort");
  const cityId = request.nextUrl.searchParams.get("cityId");
  const hasCity = cityId && cityId.length === 24 ? true : false;

  const LIMIT = 32;

  if (
    offset === null ||
    pageId.length !== 24 ||
    subpageId.length !== 24 ||
    categoryId.length !== 24 ||
    Number.isNaN(parseInt(offset))
  )
    return NextResponse.json([]);

  // await connectRedis();

  const sortQuery: Record<string, 1 | -1> =
    sortType === "low-to-high"
      ? {
          "price.price": 1
        }
      : sortType === "high-to-low"
        ? {
            "price.price": -1
          }
        : sortType === "latest"
          ? {
              updatedAt: -1
            }
          : {
              "quality.rating.count": -1
            };

  let data;

  data = await SubTopics.aggregate([
    {
      $match: {
        isActive: true,
        _id: new mongoose.Types.ObjectId(subpageId || 0)
      }
    },
    {
      $project: {
        contents: 1
      }
    },
    {
      $lookup: {
        from: "contents",
        localField: "contents",
        foreignField: "_id",
        as: "populatedContents",
        pipeline: [
          {
            $match: {
              price: { $exists: true }
            }
          },
          {
            $addFields: {
              cityWise: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$price.cities",
                      as: "cityItem",
                      cond: {
                        $eq: [
                          "$$cityItem.city",
                          new mongoose.Types.ObjectId(cityId || 0)
                        ]
                      }
                    }
                  },
                  0
                ]
              }
            }
          },
          {
            $project: {
              _id: 1,
              type: 1,
              name: 1,
              sku: 1,
              slug: 1,
              "media.primary": 1,
              isBestSeller: 1,
              "tag.promotionTag": 1,
              "quality.rating.value": 1,
              "quality.rating.count": 1,
              "delivery.processingTime": 1,
              "delivery.slots": 1,
              price: {
                price: {
                  $ifNull: ["$cityWise.price", "$price.base.price"]
                },
                mrp: {
                  $ifNull: ["$cityWise.mrp", "$price.base.mrp"]
                }
              },
              "edible.isEdible": 1,
              "edible.type": 1,
              updatedAt: 1
            }
          },
          {
            $lookup: {
              from: "images",
              localField: "media.primary",
              foreignField: "_id",
              as: "media.primary",
              pipeline: [
                { $project: { alt: 1, defaultAlt: 1, url: 1, _id: 0 } }
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
            $lookup: {
              from: "promotiontags",
              localField: "tag.promotionTag",
              foreignField: "_id",
              as: "tag.promotionTag",
              pipeline: [
                { $project: { name: 1, color: 1, _id: 0 } },
                {
                  $lookup: {
                    from: "colors",
                    localField: "color",
                    foreignField: "_id",
                    as: "color",
                    pipeline: [{ $project: { hexCode: 1, _id: 0 } }]
                  }
                },
                {
                  $unwind: {
                    path: "$color",
                    preserveNullAndEmptyArrays: true
                  }
                }
              ]
            }
          },
          {
            $unwind: {
              path: "$tag.promotionTag",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: "processingtimes",
              localField: "delivery.processingTime",
              foreignField: "_id",
              as: "delivery.processingTime",
              pipeline: [{ $project: { hours: 1, _id: 0 } }]
            }
          },
          {
            $unwind: {
              path: "$delivery.processingTime",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: "deliverytypes",
              localField: "delivery.slots.type",
              foreignField: "_id",
              as: "slotTypes",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    timeSlots: {
                      $map: {
                        input: "$timeSlots",
                        as: "slot",
                        in: {
                          label: "$$slot.label"
                        }
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            $addFields: {
              "delivery.slots": {
                $map: {
                  input: "$delivery.slots",
                  as: "slot",
                  in: {
                    $mergeObjects: [
                      { type: "$$slot.type" },
                      { otherFields: "$$slot.otherFields" }
                    ]
                  }
                }
              }
            }
          }
        ]
      }
    },
    {
      $project: {
        contents: {
          $slice: [
            {
              $sortArray: {
                input: "$populatedContents",
                sortBy: sortQuery
              }
            },
            offset !== null ? Math.max(parseInt(offset), 0) * LIMIT : LIMIT,
            LIMIT
          ]
        }
      }
    }
  ]);

  data = data[0]?.contents || [];

  return NextResponse.json(data);
}
