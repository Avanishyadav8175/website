// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// models
import models from "@/db/mongoose/models";

const { ContentCategories, Contents } = models;

// constants
import { CONTENT_CATEGORY_PAGE_CACHE_KEY } from "@/common/constants/cacheKeys";

export async function GET(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  const cachedDocument = await getFromRedis<any>({
    key: `${CONTENT_CATEGORY_PAGE_CACHE_KEY}_${slug}`
  });

  if (!cachedDocument) {
    const LIMIT = 32;

    const res: any = await ContentCategories.aggregate([
      {
        $match: {
          isActive: true,
          slug: slug
        }
      },

      // SELECTIONS ###############################################
      {
        $project: {
          _id: 1,
          name: 1,
          media: {
            icon: 1,
            banner: {
              images: 1
            },
            quickLinks: {
              $map: {
                input: "$media.quickLinks",
                as: "quickLink",
                in: {
                  label: "$$quickLink.label",
                  path: "$$quickLink.path",
                  image: "$$quickLink.image"
                }
              }
            }
          },
          info: {
            openIn: "$info.openIn",
            heading: "$info.heading",
            topContent: "$info.topContent",
            bottomContent: "$info.bottomContent"
          },
          charges: {
            deliveryCharge: "$charges.deliveryCharge"
          },
          "seo.faqs": {
            $map: {
              input: "$seo.faqs",
              as: "faq",
              in: {
                question: "$$faq.question",
                answer: "$$faq.answer"
              }
            }
          },
          personalizedReviews: {
            $map: {
              input: "$personalizedReviews",
              as: "rvw",
              in: {
                area: "$$rvw.area",
                review: "$$rvw.review"
              }
            }
          },
          relatedCategories: {
            show: "$relatedCategories.show",
            categories: "$relatedCategories.categories"
          }
        }
      },

      // MEDIA ICONS ============================================
      {
        $lookup: {
          from: "images",
          localField: "media.icon",
          foreignField: "_id",
          as: "media.icon",

          pipeline: [{ $project: { alt: 1, defaultAlt: 1, url: 1, _id: 0 } }]
        }
      },
      {
        $unwind: {
          path: "$media.icon",
          preserveNullAndEmptyArrays: true
        }
      },
      // MEDIA QUICK LINKS =======================================
      {
        $lookup: {
          from: "images",
          localField: "media.quickLinks.image",
          foreignField: "_id",
          as: "media.quickLinksImages",
          pipeline: [{ $project: { alt: 1, defaultAlt: 1, url: 1, _id: 1 } }]
        }
      },
      // MEDIA BANNERS ============================================
      {
        $unwind: {
          path: "$media.banner.images",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "images",
          localField: "media.banner.images.desktop",
          foreignField: "_id",
          as: "media.banner.images.desktop",

          pipeline: [{ $project: { alt: 1, defaultAlt: 1, url: 1, _id: 0 } }]
        }
      },
      {
        $lookup: {
          from: "images",
          localField: "media.banner.images.mobile",
          foreignField: "_id",
          as: "media.banner.images.mobile",

          pipeline: [{ $project: { alt: 1, defaultAlt: 1, url: 1, _id: 0 } }]
        }
      },

      // RELATED CATEGORIES =============================================
      {
        $lookup: {
          from: "contentcategories",
          localField: "relatedCategories.categories",
          foreignField: "_id",
          as: "relatedCategories.categories",

          pipeline: [
            {
              $project: { slug: 1, _id: 1, name: 1, "media.icon": 1 }
            },
            {
              $lookup: {
                from: "images",
                localField: "media.icon",
                foreignField: "_id",
                as: "media.icon",
                pipeline: [
                  {
                    $project: { alt: 1, defaultAlt: 1, url: 1, _id: 0 }
                  }
                ]
              }
            },
            {
              $unwind: {
                path: "$media.icon",
                preserveNullAndEmptyArrays: true
              }
            }
          ]
        }
      },

      // RESULT ########################################
      {
        $project: {
          "media.banner.images.desktop": {
            $arrayElemAt: ["$media.banner.images.desktop", 0]
          },
          "media.banner.images.mobile": {
            $arrayElemAt: ["$media.banner.images.mobile", 0]
          },
          "media.banner.images.path": 1,
          "media.icon": 1,
          "media.quickLinks": 1,
          "media.quickLinksImages": 1,
          _id: 1,
          name: 1,
          info: 1,
          charges: 1,
          "seo.faqs": 1,
          personalizedReviews: 1,
          relatedCategories: 1
        }
      }
    ]);

    const categoryId = res.length > 0 ? res[0]._id.toString() || "" : "";

    if (!categoryId || categoryId.length !== 24)
      return NextResponse.json(
        { error: "Category doesn't exist" },
        { status: 404 }
      );

    const data = await Contents.aggregate([
      {
        $match: {
          $or: [
            {
              "category.primary": new mongoose.Types.ObjectId(categoryId)
            },
            {
              "category.related": new mongoose.Types.ObjectId(categoryId)
            }
          ]
        }
      },
      {
        $match: {
          price: { $exists: true }
        }
      },
      {
        $facet: {
          totalCount: [{ $count: "total" }],
          avgReviews: [
            {
              $project: {
                "quality.rating.value": 1,
                "quality.rating.count": 1
              }
            },
            {
              $group: {
                _id: null,
                totalRatingValue: { $sum: "$quality.rating.value" },
                totalRatingCount: { $sum: "$quality.rating.count" }
              }
            }
          ],
          contents: [
            {
              $sort: {
                "quality.rating.count": -1
              }
            },
            {
              $limit: LIMIT
            },
            {
              $project: {
                _id: 1,
                type: 1,
                name: 1,
                slug: 1,
                sku: 1,
                "media.primary": 1,
                isBestSeller: 1,
                "tag.promotionTag": 1,
                "quality.rating.value": 1,
                "quality.rating.count": 1,
                "delivery.processingTime": 1,
                "delivery.slots": 1,
                price: {
                  mrp: "$price.base.mrp",
                  price: "$price.base.price"
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
          totalCount: { $arrayElemAt: ["$totalCount.total", 0] },
          avgReviews: { $arrayElemAt: ["$avgReviews", 0] },
          contents: 1
        }
      }
    ]);

    res[0] = { ...res[0], ...data[0] };

    await setToRedis({
      key: `${CONTENT_CATEGORY_PAGE_CACHE_KEY}_${slug}`,
      value: res[0]
    });

    return NextResponse.json(res[0], { status: 200 });
  } else {
    return NextResponse.json(cachedDocument, { status: 200 });
  }
}
