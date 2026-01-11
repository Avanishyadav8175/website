// app/page.tsx

export const dynamic = "force-static";
export const revalidate = 300;

// requests
import { fetchHomepage } from "@/request/page/homepage";

// constants
import { CANONICAL_LINK } from "@/common/constants/meta";
import {
  COMPANY_META_DESCRIPTION,
  COMPANY_NAME,
  COMPANY_PRIMARY_BANNER,
  COMPANY_URL
} from "@/common/constants/companyDetails";

// components
import HomepageClient from "@/components/pages/(frontend)/Home/HomepageClient";

// types
import { HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";

/* ---------------- META ---------------- */
export const metadata = {
  title: COMPANY_NAME,
  description: COMPANY_META_DESCRIPTION,
  alternates: { canonical: CANONICAL_LINK },
  openGraph: {
    title: COMPANY_NAME,
    description: COMPANY_META_DESCRIPTION,
    url: COMPANY_URL,
    images: [COMPANY_PRIMARY_BANNER]
  }
};

/* ---------------- DATA ---------------- */
async function getHomepageLayouts(): Promise<HomepageLayoutDocument[]> {
  try {
    const response = await fetchHomepage("ISR");

    return (response?.data ?? []).filter(
      (item): item is HomepageLayoutDocument => Boolean(item)
    );
  } catch {
    return [];
  }
}

/* ---------------- PAGE ---------------- */
export default async function Home() {
  const homepageLayouts = await getHomepageLayouts();

  return <HomepageClient homepageLayouts={homepageLayouts} />;
}

