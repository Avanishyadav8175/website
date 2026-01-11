// constants
import { COMPANY_NAME } from "@/common/constants/companyDetails";
import { CANONICAL_LINK } from "@/common/constants/meta";

// components
import CartPage from "@/components/pages/(frontend)/cart/CartPage";

export const metadata = {
  title: COMPANY_NAME + ": Cart",
  description: ``,
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  keywords: [],
  alternates: {
    canonical: CANONICAL_LINK
  }
};

export default async function CartRoute() {
  return <CartPage />;
}
