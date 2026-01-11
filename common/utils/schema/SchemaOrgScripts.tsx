import { COMPANY_LOGO_URL, COMPANY_NUMBER } from "@/common/constants/companyDetails";
import { DOMAIN, WEBSITE_NAME } from "@/common/constants/environmentVariables";
import {
  BlogPostingSchemaType,
  BlogPostingType,
  BlogSchemaType,
  BreadcrumbsType,
  ContentSchemaType,
  FAQType,
  SchemaDataType,
  SchemaOrgSections,
  SchemaOrgType,
  WebpageSchemaType
} from "@/common/types/seoTypes";
import * as Schema from "schema-dts";

const DEFAULT_URL = `https://${WEBSITE_NAME.toLowerCase()}.com`;
export const ORGANIZATION_NAME = WEBSITE_NAME;
const ALTERNATE_NAME = "";
const ORGANIZATION_LOGO = COMPANY_LOGO_URL;
const MOBILE_NO = COMPANY_NUMBER;

export function generateRandomGTIN14() {
  function checkDigit14(gtinArray: any) {
    var sum = 0;
    for (var index = 0; index < gtinArray.length; index++) {
      if (index % 2 !== 0) {
        sum += gtinArray[index];
      } else {
        sum += gtinArray[index] * 3;
      }
    }

    var checkDigit = 0;
    var remainder = sum % 10;

    if (remainder !== 0) {
      checkDigit = 10 - remainder;
    }

    return checkDigit;
  }

  var packageLevel = 0;
  var gs1Prefix = [0, 3];
  var labelerCode = [];
  for (var index = 0; index < 10; index++) {
    labelerCode[index] = Math.floor(Math.random() * 10);
  }
  var gtinArray = [];
  gtinArray.push(packageLevel);
  gtinArray.push(gs1Prefix[0]);
  gtinArray.push(gs1Prefix[1]);
  for (index = 0; index < 10; index++) {
    gtinArray.push(labelerCode[index]);
  }
  gtinArray.push(checkDigit14(gtinArray));
  var gtinString = "";
  for (index = 0; index < gtinArray.length; index++) {
    gtinString += "" + gtinArray[index];
  }
  return gtinString;
}

export const SchemaOrgScripts = ({
  pageType,
  url,
  data: { Home, BlogArticle, BlogsPage, Category, Content, DynamicPage }
}: {
  pageType: keyof SchemaOrgSections;
  url: string;
  data: SchemaDataType;
}) => {
  const WEBSITE_SCHEMA: Schema.WebSite = {
    "@type": "WebSite",
    name: ORGANIZATION_NAME,
    alternateName: ALTERNATE_NAME,
    url: DEFAULT_URL,
    image: ORGANIZATION_LOGO,
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: { "@type": "Organization", name: ORGANIZATION_NAME }
  };

  const ORGANIZATION_SCHEMA: Schema.Organization = {
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    alternateName: ALTERNATE_NAME,
    url: DEFAULT_URL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: MOBILE_NO,
      contactType: "customer service",
      contactOption: "TollFree",
      areaServed: "IN"
    }
  };

  const CORPORATION_SCHEMA: Schema.Corporation = {
    "@type": "Corporation",
    name: ORGANIZATION_NAME,
    alternateName: ALTERNATE_NAME,
    url: DEFAULT_URL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: MOBILE_NO,
      contactType: "customer service",
      contactOption: "TollFree",
      areaServed: "IN"
    }
  };

  // HOMEPAGE ############################################
  if (pageType === "Home") {
    const schema: SchemaOrgType<"Home"> = [
      faqSchema({ faqs: Home?.faqs || [], url }),
      WEBSITE_SCHEMA,
      CORPORATION_SCHEMA
    ];

    return jsonLDScripts(schema as object[]);
  }

  // CATEGORY ############################################
  if (pageType === "Category") {
    const schema: SchemaOrgType<"Category"> = [
      faqSchema({ faqs: Category?.faqs || [], url }),
      WEBSITE_SCHEMA,
      breadcrumbsSchema({ breadcrumbs: Category?.breadcrumbs || [], url }),
      productSchemaNew({
        name: Category?.product?.name || "Category",
        description: Category?.product?.description || "",
        url,
        highPrice: Category?.product?.highPrice || 8999,
        lowPrice: Category?.product?.lowPrice || 799,
        ratingCount: Category?.product?.ratingCount || 2075,
        ratingValue: Category?.product?.ratingValue || 4.5,
        reviewCount: Category?.product?.reviewCount || 648,
        offerCount: Category?.product?.offerCount || 57
      })
      // itemListSchema({
      //   name: Category?.name || "",
      //   contents: Category?.contents || [],
      //   url,
      //   description: Category?.description
      // })
    ];

    return jsonLDScripts(schema as object[]);
  }

  // CONTENT ############################################
  if (pageType === "Content") {
    const productSchemaData = {
      currency: Content?.content.currency || "INR",
      price: Content?.content.price || "",
      rating: Content?.content.rating || { avgRating: 4.8, count: 467 },
      reviews: Content?.content.reviews || [],
      sku: Content?.content.sku || "",
      url: Content?.content.url || "",
      validUntil: Content?.content.validUntil || "",
      description: Content?.content.description || ""
    };

    const schema: SchemaOrgType<"Content"> = [
      WEBSITE_SCHEMA,
      webpageSchema({
        alternateName: ORGANIZATION_NAME,
        image: Content?.webpage.image || "",
        name: Content?.webpage.name || "",
        url: Content?.webpage.url || "",
        description: Content?.webpage.description,
        productDetails: productSchemaData
      }),
      breadcrumbsSchema({ url, breadcrumbs: Content?.breadcrumbs || [] }),
      productSchema({
        ...productSchemaData,
        image: Content?.content.image || "",
        name: Content?.content.name || ""
      })
    ];

    return jsonLDScripts(schema as object[]);
  }

  // DYNAMIC PAGE ############################################
  if (pageType === "DynamicPage") {
    const schema: SchemaOrgType<"DynamicPage"> = [
      faqSchema({ faqs: DynamicPage?.faqs || [], url }),
      webpageSchema({
        alternateName: DynamicPage?.webpage.alternateName || ORGANIZATION_NAME,
        image: DynamicPage?.webpage.image || "",
        name: DynamicPage?.webpage.name || "",
        url: DynamicPage?.webpage.url || "",
        description: DynamicPage?.webpage.description
      }),
      WEBSITE_SCHEMA
    ];

    return jsonLDScripts(schema as object[]);
  }

  // BLOG ARTICLE ############################################
  if (pageType === "BlogArticle") {
    const schema: SchemaOrgType<"BlogArticle"> = [
      webpageSchema({
        alternateName: BlogArticle?.webpage.alternateName || ORGANIZATION_NAME,
        image: BlogArticle?.webpage.image || "",
        name: BlogArticle?.webpage.name || "",
        url: BlogArticle?.webpage.url || "",
        description: BlogArticle?.webpage.description
      }),
      WEBSITE_SCHEMA,
      ORGANIZATION_SCHEMA,
      blogPostingSchema(BlogArticle?.blogPosting)
    ];

    return jsonLDScripts(schema as object[]);
  }

  // BLOGS ############################################
  if (pageType === "BlogsPage") {
    const schema: SchemaOrgType<"BlogsPage"> = [
      webpageSchema({
        alternateName: BlogsPage?.webpage.alternateName || ORGANIZATION_NAME,
        image: BlogsPage?.webpage.image || "",
        name: BlogsPage?.webpage.name || "",
        url: BlogsPage?.webpage.url || "",
        description: BlogsPage?.webpage.description
      }),
      WEBSITE_SCHEMA,
      ORGANIZATION_SCHEMA,
      BlogsPage ? blogSchema(BlogsPage?.blog) : { "@type": "Blog" }
    ];

    return jsonLDScripts(schema as object[]);
  }
};

const isBlogPostingType = (
  props: BlogPostingType | BlogPostingSchemaType
): props is BlogPostingSchemaType =>
  (props as BlogPostingSchemaType).keywords !== undefined;

const faqSchema = ({
  faqs,
  url
}: {
  url: string;
  faqs: FAQType;
}): Schema.FAQPage => ({
  "@type": "FAQPage",
  name: "Frequently Asked Questions",
  url,
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    // text: q,
    acceptedAnswer: {
      "@type": "Answer",
      // name: a,
      text: a
    }
  })),
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
    url
  },
  author: {
    "@type": "Organization",
    name: ORGANIZATION_NAME
  }
});

const breadcrumbsSchema = ({
  url,
  breadcrumbs
}: {
  url: string;
  breadcrumbs: BreadcrumbsType;
}): Schema.BreadcrumbList => ({
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map(({ label, url }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: label,
    item: `${DOMAIN}${url}`
  })),
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
    url
  }
});

const productSchemaNew = ({
  name,
  description,
  url,
  highPrice,
  lowPrice,
  ratingCount,
  ratingValue,
  reviewCount,
  offerCount
}: {
  name: string;
  description: string;
  url: string;
  highPrice: number;
  lowPrice: number;
  ratingCount: number;
  ratingValue: number;
  reviewCount: number;
  offerCount: number;
}): Schema.Product => ({
  "@type": "Product",
  name,
  description,
  offers: {
    "@type": "AggregateOffer",
    highPrice,
    lowPrice,
    priceValidUntil: "31 Dec 2500",
    priceCurrency: "INR",
    url,
    offerCount
  },
  aggregateRating: {
    "@type": "AggregateRating",
    bestRating: 5.0,
    ratingCount,
    ratingValue,
    reviewCount
  }
});

const itemListSchema = ({
  name,
  description,
  url,
  contents
}: {
  name: string;
  description?: string;
  url: string;
  contents: ContentSchemaType[];
}): Schema.ItemList => ({
  "@type": "ItemList",
  name,
  description,
  url,
  itemListElement: contents.map((contentData) => productSchema(contentData))
});

const webpageSchema = ({
  name,
  alternateName,
  image,
  url,
  description,
  productDetails
}: WebpageSchemaType): Schema.WebPage => ({
  "@type": "WebPage",
  name,
  alternateName,
  url,
  image,
  description,
  primaryImageOfPage: {
    "@type": "ImageObject",
    url
  },
  mainEntity: productDetails
    ? {
      "@type": "Product",
      name,
      description,
      image,
      offers: {
        "@type": "Offer",
        url,
        price: productDetails.price,
        priceCurrency: productDetails.currency,
        priceValidUntil: productDetails.validUntil,
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
        ratingValue: productDetails.rating.avgRating,
        reviewCount: productDetails.rating.count
      },
      review: productDetails.reviews.map(
        ({ name, saidReview, date, rated, maxRate }) => ({
          "@type": "UserReview",
          author: {
            "@type": "Person",
            name
          },
          datePublished: date,
          reviewBody: saidReview,
          reviewRating: {
            "@type": "Rating",
            bestRating: 5,
            worstRating: 1,
            ratingValue: rated
          }
        })
      )
    }
    : undefined
});

const productSchema = ({
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
  description,
  image,
  sku,
  gtin14: generateRandomGTIN14(),
  brand: {
    "@type": "Brand",
    name: ORGANIZATION_NAME
  },
  offers: {
    "@type": "Offer",
    url,
    price,
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
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 1,
          unitCode: "DAY"
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 1,
          unitCode: "DAY"
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
    ratingValue: rating.avgRating || 5,
    reviewCount: rating.count || 1
  },
  review: reviews.map(({ name, saidReview, date, rated, maxRate }) => ({
    "@type": "UserReview",
    datePublished: date,
    reviewBody: saidReview,
    author: {
      "@type": "Person",
      name
    },
    reviewRating: {
      "@type": "Rating",
      bestRating: 5,
      worstRating: 1,
      ratingValue: rated
    }
  }))
});

const blogSchema = ({
  url,
  description,
  name,
  posts,
  publisherName
}: BlogSchemaType): Schema.Blog => ({
  "@type": "Blog",
  name,
  description,
  url,
  publisher: {
    "@type": "Organization",
    name: publisherName
  },
  author: {
    "@type": "Organization",
    name: ORGANIZATION_NAME
  },
  blogPost: posts.map((post) => blogPostingSchema(post))
});

const blogPostingSchema = (
  props: BlogPostingType | BlogPostingSchemaType | undefined
): Schema.BlogPosting => {
  if (props === undefined)
    return {
      "@type": "BlogPosting"
    };

  const { authorName, description, headline, publishedOn, url } = props;

  const blogSchema: Schema.BlogPosting = {
    "@type": "BlogPosting",
    headline,
    description,
    author: {
      "@type": "Person",
      name: authorName
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME
    },
    datePublished: publishedOn,
    url
  };

  if (!isBlogPostingType(props)) return blogSchema;

  const { keywords, image, body, wordCount } = props;

  return {
    ...blogSchema,
    keywords: keywords.join(", "),
    image: {
      "@type": "ImageObject",
      url: image
    },
    wordCount,
    articleBody: body
  } as Schema.BlogPosting;
};

const jsonLDScripts = (schema: object[]) =>
  schema.map((jsonLd, index) => (
    <script
      type="application/ld+json"
      key={index}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...jsonLd })
      }}
    />
  ));
