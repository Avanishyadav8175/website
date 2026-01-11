// config
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// requests
import { fetchFooter } from "@/request/page/footer";

// components
import FrontendFooterLayout from "./components/_FooterLayout";

// types
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";

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

export default async function FrontendFooter() {
  const footerSections = await getFooterSections();

  return <FrontendFooterLayout footerSections={footerSections} />;
}
