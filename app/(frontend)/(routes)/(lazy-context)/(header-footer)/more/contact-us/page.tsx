// components
import BodyWrapper from "@/components/(frontend)/components/wrapper/BodyWrapper";
import VendorBackground from "@/components/(frontend)/components/background/vendor/VendorBackground";

// types
import VendorRegistrationBanner from "@/components/(frontend)/vendor/components/VendorRegistrationBanner";
import { AppStatesProvider } from "@/hooks/useAppState/useAppState";
import { CANONICAL_LINK } from "@/common/constants/meta";
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_GOOGLE_MAPS, COMPANY_LOGO_URL, COMPANY_META_DESCRIPTION, COMPANY_NAME, COMPANY_NUMBER, COMPANY_URL } from "@/common/constants/companyDetails";
import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";
import { DOMAIN } from "@/common/constants/domain";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";
import { GoogleAnalytics } from "@next/third-parties/google";
import ContactUsForm from "@/components/(frontend)/vendor/ContactUsForm";

export const metadata = {
  title: COMPANY_NAME + ": Contact Us",
  description: COMPANY_META_DESCRIPTION,
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  keywords: [],
  alternates: {
    canonical: CANONICAL_LINK
  }
};


export default async function Page() {
  return (
    <AppStatesProvider>
      <VendorBackground>
        <BodyWrapper>
          <div className=" w-full grid grid-cols-1 gap-x-10 items-center sm:grid-cols-2 justify-start">
            <VendorRegistrationBanner asCustomerContactUs />

            <section>

              <div className="text-charcoal-3 font-medium text-2xl text-center mb-1 mt-20">
                Where we are located
              </div>
              <div className="text-center mb-5">
                {COMPANY_ADDRESS}
              </div>
              <section className="max-sm:px-3.5">
                <div className="rounded-2xl overflow-hidden shadow-md border border-charcoal-3/10 *:w-full *:h-full max-sm:aspect-square aspect-[2.5/1]">
                  <iframe
                    src={COMPANY_GOOGLE_MAPS}
                    width="900"
                    height="600"
                    style={{ border: "0px" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </section>

            </section>


            <section className="max-sm:px-3.5 sm:col-span-2 px-20">
              <div className="relative my-20">
                <section className="bg-ivory-1 rounded-2xl shadow-md grid grid-cols-1 p-5 sm:p-7">
                  <div className="flex flex-col text-center justify-start gap-y-1.5 sm:pr-6">
                    <span className="text-sienna font-medium text-lg max-sm:pt-2.5 max-sm:pb-1">
                      For any request
                    </span>
                    <span className="text-3xl font-medium">
                      Contact us
                    </span>

                  </div>
                  <div className="sm:pl-6 pt-8 max-sm:pt-4">
                    <ContactUsForm />
                  </div>
                </section>
              </div>
            </section>
          </div>

          <SchemaOrgScripts
            pageType="DynamicPage"
            data={{
              DynamicPage: {
                faqs: [],
                webpage: {
                  name: "Contact Us",
                  alternateName: COMPANY_NAME,
                  image: COMPANY_LOGO_URL,
                  url: DOMAIN + FRONTEND_LINKS.DYNAMIC_PAGE + "/contact-us"
                }
              }
            }}
            url={DOMAIN + FRONTEND_LINKS.DYNAMIC_PAGE + "/contact-us"}
          />
        </BodyWrapper>
      </VendorBackground>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </AppStatesProvider>
  );
}
