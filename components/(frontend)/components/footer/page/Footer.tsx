// config
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// requests
import { fetchFooter } from "@/request/page/footer";

// utils
import { memo } from "react";

// components
import FooterClient from "./components/FooterClient";

// types
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";
import { FooterSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/footerSectionLink";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

async function getFooterSections() {
  try {
    const response = await fetchFooter(RENDERING_STRATEGY);

    if (response.data) {
      return response.data as FooterSectionDocument[];
    }
  } catch (error) {
    return [];
  }

  return [];
}

async function Footer() {
  // const footerSections = await getFooterSections();
  const footerSections: FooterSectionDocument[] = [
    {
      heading: "Company",
      order: 1,
      links: [
        { label: "About Us", path: FRONTEND_LINKS.DYNAMIC_PAGE + "/about-us" },
        { label: "Contact Us", path: FRONTEND_LINKS.DYNAMIC_PAGE + "/contact-us" },
        { label: "Blogs", path: FRONTEND_LINKS.BLOGS + "/page/1" },
        { label: "Sitemap", path: "/sitemap.xml" },
      ] as FooterSectionLinkDocument[]
    },
    {
      heading: "Terms & Policy",
      order: 1,
      links: [
        { label: "Privacy Policy", path: FRONTEND_LINKS.DYNAMIC_PAGE + "/privacy-policy" },
        { label: "Refund Policy", path: FRONTEND_LINKS.DYNAMIC_PAGE + "/refund-policy" },
        { label: "Shipping Policy", path: FRONTEND_LINKS.DYNAMIC_PAGE + "/shipping-policy" },
        { label: "Cancellation Policy", path: FRONTEND_LINKS.DYNAMIC_PAGE + "/cancellation-policy" },
        { label: "Terms & Conditions", path: FRONTEND_LINKS.DYNAMIC_PAGE + "/term-condition" },
      ] as FooterSectionLinkDocument[]
    },
     {
      heading: "Top Categories",
      order: 1,
      links: [
        { label: "Wedding", path: "https://floriwish.com/wedding-decoration-services/india" },
        { label: "Flowers", path: "https://floriwish.com/flowers" },
        { label: "Cakes", path: "https://floriwish.com/cakes" },
        { label: "Balloons", path: "https://floriwish.com/balloon-decoration" },
      ] as FooterSectionLinkDocument[]
    }, 
  ] as FooterSectionDocument[];

  return <FooterClient footerSections={footerSections} />;
}

export default memo(Footer);
