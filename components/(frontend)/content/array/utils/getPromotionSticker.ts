// utils
import { getChromaticAberrationColor } from "./getChromaticAberrationColor";

// types
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";

export const getPromotionSticker = ({
  promotionTag
}: {
  promotionTag: PromotionTagDocument;
}) => ({
  label: promotionTag.name,
  bgColor: (promotionTag.color as ColorDocument).hexCode,
  textColor: getChromaticAberrationColor(
    (promotionTag.color as ColorDocument).hexCode
  )
});
