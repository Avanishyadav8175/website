import { PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";
import { HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { HomepageLayoutStructure } from "@/components/pages/(frontend)/Home/static/types";

function removeIdKeysWithSpecificLength(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeIdKeysWithSpecificLength);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(
          ([key, value]) =>
            !(key === "_id" && typeof value === "string" && value.length === 20)
        )
        .map(([key, value]) => [key, removeIdKeysWithSpecificLength(value)])
    );
  }
  return obj; // Return the value if it's neither an array nor an object
}

const generateDocs = (lt: HomepageLayoutStructure, ignoreIds: boolean) => {
  const { _id, layout, order, tag, type, isDisabled, customBG } = lt;

  if (type === "title") {
    const { leftAlign, subtitle } = lt;
    const data = {
      layout: {} as PageLayoutDocument,
      title: lt.data as string,
      subtitle,
      type: "text",
      order,
      leftAlign: leftAlign || false,
      isActive: isDisabled ? !isDisabled : true,
      customBG,
      updatedBy: "Someone",
      createdBy: "Someone"
    };

    if (ignoreIds) return data as HomepageLayoutDocument;
    else return { ...data, _id } as HomepageLayoutDocument;
  }

  const { extraSpacing } = lt;

  const updatedLayout = removeIdKeysWithSpecificLength(
    layout
  ) as PageLayoutDocument;

  const data = {
    layout: updatedLayout,
    order,
    type: tag,
    extraSpacing: extraSpacing || false,
    customBG,
    isActive: isDisabled ? !isDisabled : true,
    updatedBy: "Someone",
    createdBy: "Someone"
  };

  if (ignoreIds) return data as HomepageLayoutDocument;
  else return { ...data, _id } as HomepageLayoutDocument;
};

export const getHomepageLayoutDocumentDataToSave = (
  layouts: HomepageLayoutStructure[],
  deletedIds: string[]
): {
  new: HomepageLayoutDocument[];
  edit: HomepageLayoutDocument[];
  delete: string[];
} => {
  const newDocuments = layouts
    .filter(({ isNew }) => (isNew ? isNew : false))
    .map((lt) => generateDocs(lt, true));

  const modifiedDocuments = layouts
    .filter(
      ({ _id, isModified }) =>
        _id.length === 24 && (isModified ? isModified : false)
    )
    .map((lt) => generateDocs(lt, false))
    .filter((x) => x !== undefined);

  return {
    delete: deletedIds.filter((id) => id.length === 24),
    edit: modifiedDocuments,
    new: newDocuments
  };
};
