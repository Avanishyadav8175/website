import { ContentSchemaType } from "@/common/types/seoTypes";
import * as Schema from "schema-dts";
import { generateRandomGTIN14, ORGANIZATION_NAME } from "./SchemaOrgScripts";

export const productSchema = ({
  url,
  currency,
  image,
  name,
  price,
  rating,
  reviews,
  description,
  sku,
  validUntil
}: ContentSchemaType): Schema.Product => ({
  "@type": "Product",
  name,
  image,
  sku,
  gtin14: generateRandomGTIN14(),
  description,
  brand: {
    "@type": "Brand",
    name: ORGANIZATION_NAME
  },
  offers: {
    "@type": "Offer",
    url,
    price: price,
    priceCurrency: currency,
    priceValidUntil: validUntil,
    itemCondition: "https://schema.org/NewCondition",
    availability: "https://schema.org/InStock",
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 3,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
      applicableCountry: {
        "@type": "Country",
        name: "IN"
      }
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: 0,
        currency: "INR"
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: {
          "@type": "Country",
          name: "IN"
        }
      }
    },
    deliveryLeadTime: {
      "@type": "QuantitativeValue",
      minValue: 0,
      maxValue: 1,
      unitCode: "DAY"
    }
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: rating.avgRating,
    reviewCount: rating.count
  },
  review: reviews.map(({ name, saidReview, date, rated, maxRate }) => ({
    "@type": "UserReview",
    author: {
      "@type": "Person",
      name
    },
    datePublished: date,
    reviewBody: saidReview,
    reviewRating: {
      "@type": "Rating",
      bestRating: rated,
      worstRating: rated,
      ratingValue: maxRate
    }
  }))
});
