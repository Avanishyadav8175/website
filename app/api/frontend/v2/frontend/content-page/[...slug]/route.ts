// next config
export const dynamic = "force-dynamic";

// libraries
import mongoose from "mongoose";
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";
import { NextRequest, NextResponse } from "next/server";

// models
import models from "@/db/mongoose/models";

const { ContentCategories, Topics } = models;

// constants
import { TOPIC_PAGE_CACHE_KEY } from "@/common/constants/cacheKeys";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const categorySlug = params.slug[0] || null;
  const topicSlug = params.slug[1] || null;
  const currCityId = request.nextUrl.searchParams.get("cityId");

  const cachedDocument = await getFromRedis<any>({
    key: `${TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}`
  });

  if (!cachedDocument) {
    const LIMIT = 32;

    if (
      !categorySlug ||
      categorySlug.length === 0 ||
      !topicSlug ||
      topicSlug.length === 0
    )
      return NextResponse.json(
        { error: "Invalid topic or category provided" },
        { status: 404 }
      );

    let categoryId = "";
    let cityId = "";
    let categoryName;

    // GET CATEGORY ID ================================
    const res = await ContentCategories.aggregate([
      {
        $match: {
          isActive: true,
          slug: categorySlug
        }
      },
      {
        $project: {
          _id: 1,
          name: 1
        }
      }
    ]);

    categoryId = res[0]?._id || null;
    categoryName = res[0]?.name || "";

    if (!categoryId)
      return NextResponse.json(
        {
          error: "Category is not a defined collection in database"
        },
        { status: 404 }
      );

    // GET CITY ID ================================
    const city =
      currCityId && currCityId.length === 24
        ? [{ city: currCityId }]
        : await Topics.aggregate([
            {
              $match: {
                isActive: true,
                slug: topicSlug,
                category: categoryId
              }
            },
            {
              $project: { city: 1 }
            }
          ]);

    cityId = city[0]?.city || null;

    const topicPageData = await Topics.aggregate([
      {
        $match: {
          isActive: true,
          slug: topicSlug,
          category: categoryId
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
          },
          contents: 1,
          totalCount: {
            $size: "$contents"
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
          pipeline: [{ $project: { alt: 1, defaultAlt: 1, url: 1, _id: 0 } }]
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

      // CONTENTS =============================================
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

      // RESULT ########################################
      {
        $project: {
          _id: 1,
          name: 1,
          categoryName,
          categoryId,
          info: 1,
          charges: 1,
          "seo.faqs": 1,
          personalizedReviews: 1,
          relatedCategories: 1,
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
          contents: {
            $slice: [
              {
                $sortArray: {
                  input: "$populatedContents",
                  sortBy: { "quality.rating.count": -1 }
                }
              },
              LIMIT
            ]
          },
          totalCount: 1,
          avgReviews: {
            totalRatingValue: {
              $sum: {
                $map: {
                  input: "$populatedContents",
                  as: "content",
                  in: { $ifNull: ["$$content.quality.rating.value", 0] }
                }
              }
            },
            totalRatingCount: {
              $sum: {
                $map: {
                  input: "$populatedContents",
                  as: "content",
                  in: { $ifNull: ["$$content.quality.rating.count", 0] }
                }
              }
            }
          }
        }
      }
    ]);

    await setToRedis({
      key: `${TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}`,
      value: Array.isArray(topicPageData) ? topicPageData[0] : topicPageData
    });

    return NextResponse.json(
      Array.isArray(topicPageData) ? topicPageData[0] : topicPageData,
      { status: 200 }
    );
  } else {
    return NextResponse.json(cachedDocument, { status: 200 });
  }
}
