// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { HeaderNavLinks } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import { type MongooseErrorType } from "@/common/types/apiTypes";

// controllers
export const getNavLinks = async (): Promise<
  HeaderNavLinkDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await HeaderNavLinks.find({
      isActive: true
    })
      .select(["label", "path", "sections", "quickLinks"])
      .populate([
        {
          path: "quickLinks.image",
          select: ["alt", "defaultAlt", "url"],
          strictPopulate: false
        },
        {
          path: "sections.links.tag",
          select: ["name"],
          populate: [
            {
              path: "color",
              select: ["hexCode"]
            }
          ],
          strictPopulate: false
        }
      ])
      .sort({
        order: 1
      });

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
