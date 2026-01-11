import {
  Product,
  WithContext,
  Corporation,
  WebSite,
  Organization,
  BreadcrumbList,
  FAQPage,
  WebPage,
  Offer
} from "schema-dts";
import { SchemaOrgDefaultsType, SchemaOrgGeneratorType } from "../static/types";
import moment from "moment";

export default function generateSchemaOrg({
  props,
  DEFAULTS
}: {
  props: SchemaOrgGeneratorType;
  DEFAULTS: SchemaOrgDefaultsType;
}) {
  const {
    isBreadcrumbs,
    isFAQ,
    isOrganization,
    isProduct,
    isWebpage,
    showSearchAction,
    currPath
  } = props;

  const { ALTERNATE_NAME, DOMAIN_URL, ORGANIZATION_NAME } = DEFAULTS;

  // =========== WEBSITE =====================================================
  const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORGANIZATION_NAME,
    alternateName: ALTERNATE_NAME,
    url: `${DOMAIN_URL}`,
    copyrightHolder: ORGANIZATION_NAME,
    copyrightYear: new Date().getFullYear()
  };

  if (showSearchAction)
    websiteSchema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${DOMAIN_URL}?${encodeURIComponent(props.queries.map(({ key, val }) => `${key}=${val}`).join("&"))}`
      },
      query: props.queries.map(({ key, val }) => `${key}=${val}`)
    };

  let jsonLD: WithContext<
    | Corporation
    | Product
    | WebSite
    | Organization
    | BreadcrumbList
    | FAQPage
    | WebPage
  >[] = [websiteSchema];

  // =========== FAQs =====================================================
  if (isFAQ) {
    const faqSchema: WithContext<FAQPage> = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: "Frequently asked questions",
      url: props.currPath || DOMAIN_URL,
      mainEntity: props.faqData.map(({ q: question, a: answer }) => {
        return {
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer
          }
        };
      }),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": props.currPath
      },
      author: {
        "@type": "Organization",
        name: ORGANIZATION_NAME
      }
    };
    jsonLD.push(faqSchema);
  }

  // =========== BREADCRUMBS =====================================================
  if (isBreadcrumbs) {
    const breadcrumbsSchema: WithContext<BreadcrumbList> = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      name: "Frequently asked questions",
      url: props.currPath || DOMAIN_URL,
      itemListElement: props.breadcrumbsData.map(({ label, link }, index) => {
        return {
          "@type": "ListItem",
          position: index + 1,
          name: label,
          item: link
        };
      }),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": props.currPath
      }
    };
    jsonLD.push(breadcrumbsSchema);
  }

  // =========== WEBPAGE =====================================================
  if (isWebpage) {
    let webPageSchema: WithContext<WebPage> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: props.webpageData.title,
      alternateName: props.webpageData.alternateName
        ? props.webpageData.alternateName
        : ALTERNATE_NAME,
      url: props.currPath
    };

    if (props.webpageData.description)
      webPageSchema.description = props.webpageData.description;

    if (props.webpageData.image) {
      webPageSchema.image = props.webpageData.image;
      webPageSchema.primaryImageOfPage = {
        "@type": "ImageObject",
        url: props.webpageData.image
      };
    }

    if (props.webpageData.isService) {
      const service = props.webpageData.isService;

      webPageSchema.name = service.name;
      webPageSchema.mainEntity = {
        "@type": "Product",
        name: service.name,
        image: service.image,
        description:
          props.webpageData.description || DEFAULTS.DEFAULT_ITEM_DESCRIPTION,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(service.rating),
          reviewCount: service.totalRatings
        },
        offers: {
          "@type": "Offer",
          price: String(service.price.default),
          priceCurrency: service.price.currency,
          availability: "https://schema.org/InStock",
          shippingDetails: {
            "@type": "OfferShippingDetails"
          }
        },
        review: service.review.map(({ review, rating, name }) => {
          return {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: name
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(rating.value),
              bestRating: String(rating.bestRating),
              worstRating: String(rating.worstRating)
            },
            description: review
          };
        })
      };

      if (
        props.webpageData.isService.returnPolicy &&
        webPageSchema.mainEntity.offers
      ) {
        const returnPolicy = props.webpageData.isService.returnPolicy;
        // @ts-ignore
        webPageSchema.mainEntity.offers.hasMerchantReturnPolicy = {
          "@type": "MerchantReturnPolicy",
          inStoreReturnsOffered: returnPolicy.inStoreReturnsPossible,
          applicableCountry: returnPolicy.applicableCountry,
          merchantReturnLink: returnPolicy.returnLink || DOMAIN_URL,
          returnPolicyCountry: returnPolicy.returnPolicyCountry
        };
      }
    }

    jsonLD.push(webPageSchema);
  }

  // =========== PRODUCT =====================================================
  if (isProduct) {
    const data = props.productData;

    const productSchema: WithContext<Product> =
      data.productPage === false
        ? {
            "@type": "Product",
            "@context": "https://schema.org",
            name: data.name,
            offers: {
              "@type": "AggregateOffer",
              highPrice: data.offers.highPrice,
              lowPrice: data.offers.lowPrice,
              priceValidUntil: moment(
                new Date(new Date()).setFullYear(new Date().getFullYear() + 50)
              ).format("yyyy-MMM-DD"),
              priceCurrency: props.currency,
              url: data.offers.url
            },
            aggregateRating: {
              "@type": "AggregateRating",
              bestRating: data.aggregateRating.bestRating,
              ratingCount: data.aggregateRating.ratingCount,
              ratingValue: data.aggregateRating.ratingValue,
              reviewCount: data.aggregateRating.reviewCount
            }
          }
        : {
            "@type": "Product",
            name: data.name,
            image: data.image,
            description: data.description,
            sku: data.sku,
            gtin8: data.sku,
            brand: {
              "@type": "Brand",
              name: DEFAULTS.ORGANIZATION_NAME
            },
            offers: {
              "@type": "Offer",
              price: data.offers.price,
              priceValidUntil: moment(
                new Date(new Date()).setFullYear(new Date().getFullYear() + 50)
              ).format("yyyy-MMM-DD"),
              priceCurrency: props.currency,
              url: data.offers.url
            },
            aggregateRating: {
              "@type": "AggregateRating",
              bestRating: data.aggregateRating.bestRating,
              ratingCount: data.aggregateRating.ratingCount,
              ratingValue: data.aggregateRating.ratingValue,
              reviewCount: data.aggregateRating.reviewCount
            },
            review: {
              "@type": "Review",
              datePublished: moment(new Date()).format("yyyy-MMM-DD"),
              reviewBody: data.review.reviewBody,
              name: data.review.name,
              author: {
                "@type": "Person",
                name: "Customer"
              },
              reviewRating: {
                "@type": "Rating",
                bestRating: data.review.reviewRating.bestRating,
                ratingValue: data.review.reviewRating.ratingValue,
                worstRating: data.review.reviewRating.worstRating
              }
            },
            "@context": "https://schema.org"
          };
    jsonLD.push(productSchema);
  }

  // =========== ORGANIZATION =================================================
  if (isOrganization) {
    const organizationSchema: WithContext<Organization> = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: DEFAULTS.DOMAIN_URL,
      logo: DEFAULTS.ORGANIZATION_LOGO_URL,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: DEFAULTS.MOBILE,
        contactType: "customer service",
        contactOption: "TollFree",
        areaServed: props.countryCode
      }
    };
    jsonLD.push(organizationSchema);
  }

  return jsonLD;
}
