// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { Catalogues, CatalogueCategories } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type CatalogueCategoryDocument } from "@/common/types/documentation/categories/catalogueCategory";
import { type CatalogueDocument } from "@/common/types/documentation/presets/catalogue";

export const getCatalogueCategories = async (): Promise<
  CatalogueCategoryDocument[] | null
> => {
  try {
    await connectDB();

    const catalogueCategories = await CatalogueCategories.find({
      isActive: true
    })
      .select(["name", "title", "icon"])
      .populate([
        {
          path: "icon",
          select: ["alt", "url"]
        }
      ]);

    if (!catalogueCategories) {
      return null;
    }

    const catalogues = await Catalogues.find({
      isActive: true
    })
      .select(["category", "name", "path"])
      .populate([
        {
          path: "icon",
          select: ["alt", "url"]
        }
      ]);

    if (!catalogues) {
      return null;
    }

    const catalogueCategoriesMap = new Map<string, CatalogueDocument[]>();

    for (let i = 0; i < catalogues.length; i++) {
      const catalogue = catalogues[i].toObject();

      catalogueCategoriesMap.set(catalogue.category.toString(), [
        ...(catalogueCategoriesMap.get(catalogue.category.toString()) || []),
        catalogue
      ]);
    }

    const catalogueCategoryResults = catalogueCategories.map(
      (catalogueCategory) => {
        const catalogueCategoryObject = catalogueCategory.toObject();

        const categoryCatalogues =
          catalogueCategoriesMap.get(String(catalogueCategoryObject._id)) || [];

        catalogueCategoryObject._catalogues = categoryCatalogues;

        return catalogueCategoryObject as CatalogueCategoryDocument;
      }
    );

    return catalogueCategoryResults;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
