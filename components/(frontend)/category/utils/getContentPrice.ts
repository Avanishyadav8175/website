// types
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";

export const getContentPrice = ({
  price,
  city
}: {
  price: ContentPriceDocument;
  city: CityDocument | null;
}): { price: number; mrp: number } => {
  if (city?._id && price?.cities?.length) {
    const cityPrice = price.cities.find(({ city: cityId }) => {
      return String(cityId) === String(city._id);
    });

    if (cityPrice) {
      return { mrp: cityPrice.mrp, price: cityPrice.price };
    }
  }

  return { mrp: price?.base?.mrp || 0, price: price?.base?.price || 0 };
};
