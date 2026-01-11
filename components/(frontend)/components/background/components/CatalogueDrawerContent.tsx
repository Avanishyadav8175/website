// requests
import { fetchCatalogueCategories } from "@/request/catalogueCategories/catalogueCategories";

// utils
import { memo } from "react";

// hooks
import { useEffect, useState } from "react";

// components

// types
import { type CatalogueCategoryDocument } from "@/common/types/documentation/categories/catalogueCategory";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { CatalogueDocument } from "@/common/types/documentation/presets/catalogue";
import ShineAnimation from "@/components/(frontend)/global/_Templates/ShineAnimation/ShineAnimation";
import Image from "next/image";
import Link from "next/link";

function CatalogueDrawerContent({ onClose }: { onClose?: () => void }) {
  const [catalogueCategories, setCatalogueCategories] = useState<
    CatalogueCategoryDocument[]
  >([]);

  useEffect(() => {
    fetchCatalogueCategories()
      .then(({ data: catalogueCategories }) => {
        console.log('Fetched catalogue categories:', catalogueCategories);
        setCatalogueCategories(
          catalogueCategories as CatalogueCategoryDocument[]
        );
      })
      .catch((error) => {
        console.error('Error fetching catalogue categories:', error);
      });
  }, []);

  // Collect all catalogues from all categories
  const catalogues = catalogueCategories.reduce<CatalogueDocument[]>((acc, category) => {
    const categoryCatalogues = category._catalogues as CatalogueDocument[] || [];
    return [...acc, ...categoryCatalogues];
  }, []);

  return (
    <section className="overflow-y-scroll">
      {/* <h4 className="text-2xl font-medium py-4 text-center">Our Popular Categories</h4>
      <Accordion
        type="single"
        collapsible
      >
        {catalogueCategories.map((catalogueCategory) => (
          <CatalogueCategory
            key={catalogueCategory._id as string}
            catalogueCategory={catalogueCategory}
            onClose={onClose}
          />
        ))}
      </Accordion> */}

      {catalogues && catalogues.length > 0 ? (
        <section className="my-2 grid grid-cols-3 gap-5">
          {catalogues.map((catalogue) => (
            <Link
              key={String(catalogue._id)}
              href={catalogue.path || "#"}
              className="flex flex-col justify-start gap-2"
              onClick={() => onClose?.()}
            >
              <div className="rounded-full aspect-square overflow-hidden relative bg-sienna-3 p-2">
                <Image
                  alt={(catalogue.icon as ImageDocument)?.alt || "Category"}
                  src={(catalogue.icon as ImageDocument)?.url || "/placeholder.png"}
                  width={200}
                  height={200}
                  unoptimized
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.png";
                  }}
                  className="w-full h-full object-cover object-center rounded-full ring-4 ring-ivory-1"
                />
                <ShineAnimation />
              </div>
              <div className="text-center font-medium">{catalogue.name || "Category"}</div>
            </Link>
          ))}
        </section>
      ) : (
        <div className="flex items-center justify-center h-full text-charcoal-3/50">
          No categories available
        </div>
      )}
    </section>
  );
}

export default memo(CatalogueDrawerContent);
