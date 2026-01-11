// utils
import { memo } from "react";

// components
import Image from "next/image";
import Catalogue from "./Catalogue";

// types
import { type CatalogueCategoryDocument } from "@/common/types/documentation/categories/catalogueCategory";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type CatalogueDocument } from "@/common/types/documentation/presets/catalogue";
import CustomFAQ from "../../header/page/components/MobileDrawer/components/CustomFAQ";

function CatalogueCategory({
  catalogueCategory: { _id, name, title, icon, _catalogues },
  onClose
}: {
  catalogueCategory: CatalogueCategoryDocument;
  onClose: () => void;
}) {
  const iconData = icon as ImageDocument | undefined;
  const catalogues = _catalogues as CatalogueDocument[];

  return (
    <CustomFAQ
      q={
        <div className="flex items-center justify-start gap-4">
          {iconData?.url && (
            <Image
              src={iconData.url}
              alt={iconData.alt || name}
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col items-start justify-center">
            <span className="text-lg line-clamp-1">{name}</span>
            <span className="line-clamp-1">{title}</span>
          </div>
        </div>
      }
      a={
        <section className="grid grid-cols-3 items-center justify-evenly gap-4">
          {catalogues.map((catalogue) => (
            <Catalogue
              key={catalogue._id as string}
              catalogue={catalogue}
              onClick={onClose}
            />
          ))}
        </section>
      }
      condensedH="h-24 min-h-24"
      aClassName="py-5 !px-0"
    />
  );
}

export default memo(CatalogueCategory);
