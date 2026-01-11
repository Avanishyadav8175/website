// libraries
import { v4 as uuid } from "uuid";

// utils
import { getInitialContentPrice } from "../../contentPrice/utils/getInitialContentPrice";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

export const getInitialCustomVariantValue = ({
  content,
  image
}: {
  content?: ContentDocument;
  image?: string | ObjectId | ImageDocument;
}) =>
  ({
    _id: uuid(),
    label: (content && "Basic") || "",
    price: content?.price || getInitialContentPrice(),
    image: image || content?.media.primary || "",
    value: NaN
  }) as ContentCustomVariantDocument;
