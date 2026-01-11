import { Golos_Text } from "next/font/google";
import Script from "next/script";
import { type Children } from "@/common/types/reactTypes";
import { type Metadata } from "next";
import "@/app/globals.css";

const roboto = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Floriwish - Send Gifts, Flowers, Cakes & Balloon Decoration",
  description: "Your One-Stop Shop for All Your Gifting & Celebration Needs",

  openGraph: {
    title: "Floriwish - Send Gifts, Flowers, Cakes & Balloon Decoration",
    description: "Your One-Stop Shop for All Your Gifting & Celebration Needs",
    url: "https://floriwish.com",
    siteName: "Floriwish",
    images: [
      {
        url: "https://floriwish-media-bucket.s3.ap-south-1.amazonaws.com/sample-images/7a4d2761afbf44b2.webp",
        width: 1200,
        height: 630,
        alt: "Floriwish - Gifts, Flowers & Decorations"
      }
    ],
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Floriwish - Send Gifts, Flowers, Cakes & Balloon Decoration",
    description: "Your One-Stop Shop for All Your Gifting & Celebration Needs",
    images: [
      "https://floriwish-media-bucket.s3.ap-south-1.amazonaws.com/sample-images/7a4d2761afbf44b2.webp"
    ]
  }
};

export default function RootLayout({ children }: { children: Children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SPV8T9JCSS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SPV8T9JCSS', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className={`relative ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}

