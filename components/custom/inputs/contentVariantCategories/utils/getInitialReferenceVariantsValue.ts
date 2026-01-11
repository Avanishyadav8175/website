// utils
import { getInitialReferenceVariantValue } from "./getInitialReferenceVariantValue";

export const getInitialReferenceVariantsValue = (contentId?: string) => [
  getInitialReferenceVariantValue(contentId),
  getInitialReferenceVariantValue()
];
