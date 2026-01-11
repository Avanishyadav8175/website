export type SchemaOrgDefaultsType = {
  DOMAIN_URL: string;
  ORGANIZATION_NAME: string;
  ALTERNATE_NAME: string;
  ORGANIZATION_LOGO_URL: string;
  MOBILE: string;
  DEFAULT_ITEM_DESCRIPTION: string;
};

export type SchemaOrgGeneratorType = {
  currPath: string;
  currency: string;
  countryCode: string;
} & (
  | { showSearchAction: false }
  | { showSearchAction: true; queries: { key: string; val: string }[] }
) &
  // faq --------------------------------
  (| {
        isFAQ: false;
      }
    | {
        isFAQ: true;
        faqData: { q: string; a: string }[];
      }
  ) &
  // breadcrumbs --------------------------------
  (| {
        isBreadcrumbs: false;
      }
    | {
        isBreadcrumbs: true;
        breadcrumbsData: {
          label: string;
          link: string;
          others?: any;
        }[];
      }
  ) &
  // webpage -------------------------------------
  (| {
        isWebpage: false;
      }
    | {
        isWebpage: true;
        webpageData: {
          title: string;
          alternateName?: string;
          description?: string;
          image?: string;
          isService?: {
            name: string;
            price: {
              default: number;
              lowest: number;
              highest: number;
              currency: string;
            };
            rating: number;
            totalRatings: number;
            image: string;
            review: {
              review: string;
              rating: {
                value: number;
                bestRating: number;
                worstRating: number;
              };
              name: string;
            }[];
            returnPolicy?: {
              inStoreReturnsPossible: boolean;
              applicableCountry: string;
              returnLink: string;
              returnPolicyCountry: string;
            };
          };
        };
      }
  ) &
  // product -------------------------------------
  (| {
        isProduct: false;
      }
    | {
        isProduct: true;
        productData: {
          aggregateRating: {
            bestRating: number;
            ratingCount: number;
            ratingValue: number;
            reviewCount: number;
          };
          name: string;
        } & (
          | {
              productPage: false;
              offers: { url: string } & {
                offerType: "aggregateOffer";
                highPrice: number;
                lowPrice: number;
                offerCount: number;
              };
            }
          | {
              productPage: true;
              image: string;
              description: string;
              sku: string;
              offers: { url: string } & {
                offerType: "defaultOffer";
                price: number;
              };
              review: {
                reviewBody: string;
                name: string;
                reviewRating: {
                  bestRating: number;
                  ratingValue: number;
                  worstRating: number;
                };
              };
            }
        );
      }
  ) &
  // organization --------------------------------
  (| {
        isOrganization: false;
      }
    | {
        isOrganization: true;
        organizationData: {};
      }
  );
