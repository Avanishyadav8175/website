// next config
export const dynamic = "force-dynamic";

import { Response } from "@/common/utils/api/next";
import connectDB from "@/db/mongoose/connection";
import models from "@/db/mongoose/models";
import { NextRequest } from "next/server";

const { CatalogueCategories, Catalogues } = models;

// Mobile category data
const categoryData = {
  "Flowers": [
    { name: "All Flowers", path: "/flowers" },
    { name: "Red Rose", path: "/red-rose" },
    { name: "Pink Rose", path: "/pink-rose" },
    { name: "Yellow Rose", path: "/yellow-rose" },
    { name: "Carnations", path: "/carnations-flower" },
    { name: "Lily", path: "/lily-flower" },
    { name: "Gerberas", path: "/gerberas-flower" },
    { name: "Orchids", path: "/orchids-flower" },
    { name: "White Rose", path: "/white-rose" },
    { name: "Chocolate Bouquet", path: "/chocolate-bouquet" },
  ],
  "Cake": [
    { name: "All Cakes", path: "/cakes" },
  ],
  "Balloon Decor": [
    { name: "All Balloon Decoration", path: "/balloon-decoration" },
  ],
  "Wedding": [
    { name: "Jaimala, Varmala", path: "/wedding-varmala-jaimala" },
    { name: "Wedding Car Decor", path: "/wedding-car-decorations" },
    { name: "Haldi", path: "/haldi-decoration-service" },
    { name: "Mehndi", path: "/mehndi-decoration-service" },
  ],
  "Personalized Premium": [],
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const results = {
      categoriesCreated: 0,
      cataloguesCreated: 0,
      categoriesActivated: 0,
      errors: [] as string[],
    };

    // First, activate "Popular Categories" if it exists
    const popularCategory = await CatalogueCategories.findOne({ name: "Popular Categories" });
    if (popularCategory && !popularCategory.isActive) {
      await CatalogueCategories.updateOne(
        { _id: popularCategory._id },
        { $set: { isActive: false } }
      );
      results.categoriesActivated++;
    }

    // Create category groups and their items
    for (const [categoryName, items] of Object.entries(categoryData)) {
      try {
        // Check if category already exists
        let category = await CatalogueCategories.findOne({ name: categoryName });

        if (!category) {
          // Create new category (without icon for now - you'll need to add icons manually)
          category = await CatalogueCategories.create({
            name: categoryName,
            title: categoryName,
            icon: null, // You'll need to add icons manually through admin panel
            isActive: true,
            createdBy: "system",
            updatedBy: "system",
          });
          results.categoriesCreated++;
        } else {
          // Activate existing category
          await CatalogueCategories.updateOne(
            { _id: category._id },
            { $set: { isActive: true } }
          );
        }

        // Create catalogue items for this category
        for (const item of items) {
          try {
            // Check if catalogue already exists
            const existingCatalogue = await Catalogues.findOne({
              name: item.name,
              category: category._id,
            });

            if (!existingCatalogue) {
              await Catalogues.create({
                category: category._id,
                name: item.name,
                path: item.path,
                icon: null, // You'll need to add icons manually through admin panel
                isActive: true,
                createdBy: "system",
                updatedBy: "system",
              });
              results.cataloguesCreated++;
            } else {
              // Activate existing catalogue
              await Catalogues.updateOne(
                { _id: existingCatalogue._id },
                { $set: { isActive: true } }
              );
            }
          } catch (error: any) {
            results.errors.push(`Error creating catalogue "${item.name}": ${error.message}`);
          }
        }
      } catch (error: any) {
        results.errors.push(`Error creating category "${categoryName}": ${error.message}`);
      }
    }

    return Response({
      status: 200,
      data: {
        data: results,
        messages: [
          {
            type: "success",
            message: `Successfully activated ${results.categoriesActivated} existing categories, created ${results.categoriesCreated} new categories and ${results.cataloguesCreated} catalogue items`,
          },
        ],
      },
    });
  } catch (error: any) {
    return Response({
      status: 500,
      data: {
        data: null,
        messages: [
          {
            type: "error",
            message: error.message || "Failed to seed mobile categories",
          },
        ],
      },
    });
  }
}
