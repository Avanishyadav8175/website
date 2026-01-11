// hooks
import { useSelector } from "@/store/withType";
import { useEffect, useMemo, useState } from "react";

// redux
import { selectCatalogueCategory } from "@/store/features/categories/catalogueCategorySlice";

// components
import SelectImage from "@/components/custom/inputs/image/SelectImage";
import Input from "@/lib/Forms/Input/Input";

// types
import { type CatalogueDocument } from "@/common/types/documentation/presets/catalogue";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: CatalogueDocument;
}) {

  // redux
  const { options: catalogueCategoryOptions } = useSelector((state) =>
    selectCatalogueCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // Memoize initial category value
  const initialCategoryValue = useMemo(() => {
    if (initialDocument) {
      return typeof initialDocument.category === "string"
        ? initialDocument.category
        : String((initialDocument.category as any)?._id || "");
    }
    return catalogueCategoryOptions.length > 0 ? catalogueCategoryOptions[0].value : "";
  }, [initialDocument, catalogueCategoryOptions]);

  // states
  const [catalogueCategory, setCatalogueCategory] = useState<string>(initialCategoryValue);

  // Update when initial value changes
  useEffect(() => {
    if (initialCategoryValue && initialCategoryValue !== catalogueCategory) {
      setCatalogueCategory(initialCategoryValue);
    }
  }, [initialCategoryValue]);

  return (
    <section className="flex flex-col gap-3 w-[30vw]">

      {catalogueCategoryOptions.length === 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          <strong>Warning:</strong> No catalogue categories found. Please create a catalogue category first before adding mobile navbar items.
        </div>
      )}

      {/* Category Dropdown */}
      <Input
        type="dropdown"
        name="category"
        labelConfig={{ label: "Category" }}
        isRequired
        nullOption
        customInitialValuePlaceholderLabel="Select Category"
        options={catalogueCategoryOptions}
        customValue={{
          value: catalogueCategory,
          setValue: setCatalogueCategory
        }}
        errorCheck={false}
        validCheck={false}
      />

      {/* Name */}
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{ label: "Name", layoutStyle: "" }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />

      {/* URL Path */}
      <Input
        type="text"
        name="path"
        isRequired
        labelConfig={{ label: "URL", layoutStyle: "" }}
        defaultValue={initialDocument?.path || ""}
        errorCheck={false}
        validCheck={false}
      />

      {/* Icon */}
      <SelectImage
        name="icon"
        label="Icon"
        isRequired
        defaultValue={initialDocument?.icon as string}
      />

    </section>
  );
}
