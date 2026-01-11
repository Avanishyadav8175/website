import { ContentDocument } from "../types/documentation/contents/content";
import { ContentPriceDocument } from "../types/documentation/nestedDocuments/contentPrice";
import { CityDocument } from "../types/documentation/presets/city";

export const getCityWiseContentPrices = ({
  city,
  content
}: {
  content: ContentDocument;
  city: CityDocument | null;
}): { price: number; mrp: number } => {
  if (content.price === undefined) {
    return { mrp: 0, price: 0 };
  }

  // ALL INDIA CASE -----------------------------------------
  /* cases when its All India:
        - if CityDocument is null/undefined 
        - if CityDocument._id is null/undefined 
   */
  if (
    city === undefined ||
    city === null ||
    city._id === null ||
    city._id === undefined ||
    content.price.cities === undefined ||
    content.price.cities.length === 0
  )
    return { mrp: content.price.base.mrp, price: content.price.base.price };

  // CITY WISE CASE ----------------------------------------------
  const targetCityPrices = content.price.cities.find(({ city: cityId }) => {
    return cityId === (city._id as string);
  });

  if (!targetCityPrices)
    return { mrp: content.price.base.mrp, price: content.price.base.price };

  return { mrp: targetCityPrices.mrp, price: targetCityPrices.price };
};

export const getCityWisePrices = ({
  city,
  prices
}: {
  city: CityDocument | null;
  prices: ContentPriceDocument | null;
}): { price: number; mrp: number } => {
  if (prices === undefined || prices === null) return { mrp: 0, price: 0 };

  // ALL INDIA CASE -----------------------------------------
  /* cases when its All India:
        - if CityDocument is null/undefined 
        - if CityDocument._id is null/undefined 
   */
  if (
    city === undefined ||
    city === null ||
    city._id === null ||
    city._id === undefined ||
    prices.cities === undefined ||
    prices.cities.length === 0
  )
    return { mrp: prices.base.mrp, price: prices.base.price };

  // CITY WISE CASE ----------------------------------------------
  const targetCityPrices = prices.cities.find(
    ({ city: cityDoc }) =>
      ((cityDoc as CityDocument)._id as string) === (city._id as string)
  );

  if (!targetCityPrices)
    return { mrp: prices.base.mrp, price: prices.base.price };

  return { mrp: targetCityPrices.mrp, price: targetCityPrices.price };
};
