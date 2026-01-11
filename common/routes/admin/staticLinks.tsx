import { AdminPanelRoutes } from "@/common/types/types";
import {
  AlignVerticalJustifyEnd,
  Bolt,
  Combine,
  Cuboid,
  Grip,
  Images,
  LayoutList,
  Package,
  Shield,
  Type,
  Users
} from "lucide-react";

export const ROOT_ADMIN_ROUTE = "/hsiwirolfkey8080";

export const ADMIN_PANEL_ALL_ROUTES: AdminPanelRoutes = [
  // DASHBOARD ============================================
  {
    sectionName: "dashboard",
    sectionLabel: "Dashboard",
    svg: (
      <Grip
        strokeWidth={1.5}
        width={20}
      />
    ),
    link: `${ROOT_ADMIN_ROUTE}`
  },

  // PRESETS ============================================
  {
    sectionName: "preset",
    sectionLabel: "Presets",
    svg: (
      <Combine
        strokeWidth={1.5}
        width={20}
      />
    ),
    subsections: [
      {
        sectionName: "aiTag",
        sectionLabel: "AI Tags",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/preset/ai-tag`
      },
      {
        sectionName: "advancePayment",
        sectionLabel: "Advance Payments",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/preset/advance-payment`
      },
      {
        sectionName: "cancellationPolicy",
        sectionLabel: "Cancellation Policy",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/preset/cancellation-policy`
      },
      {
        sectionName: "city",
        sectionLabel: "Cities",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/preset/city`
      },
      {
        sectionName: "countryCode",
        sectionLabel: "Country Codes",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/preset/country-code`
      },
      {
        sectionName: "faq",
        sectionLabel: "FAQs",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/preset/faq`
      }
    ]
  },

  // ORDERS ============================================
  {
    sectionName: "aiTag",
    sectionLabel: "Orders",
    svg: (
      <Package
        strokeWidth={1.5}
        width={20}
      />
    ),
    subsections: [
      {
        sectionName: "aiTag",
        sectionLabel: "New Orders",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/orders/new-orders`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "In Progress",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/orders/in-progress`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Delivered",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/orders/delivered`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Failed",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/orders/failed-orders`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Cancelled",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/orders/cancelled`
      }
    ]
  },

  // USERS ============================================
  {
    sectionName: "aiTag",
    sectionLabel: "Users",
    svg: (
      <Users
        strokeWidth={1.5}
        width={20}
      />
    ),
    subsections: [
      {
        sectionName: "aiTag",
        sectionLabel: "Admin",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/users/admin`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Customer",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/users/customers`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Vendor",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/users/vendors`
      }
    ]
  },

  // PAGES ============================================
  {
    sectionName: "aiTag",
    sectionLabel: "Pages",
    svg: (
      <LayoutList
        strokeWidth={1.5}
        width={20}
      />
    ),
    subsections: [
      {
        sectionName: "aiTag",
        sectionLabel: "Header",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/pages/header`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Footer",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/pages/footer`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Homepage",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/pages/homepage`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Topic Pages",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/pages/topic-pages`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Subtopic Pages",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/pages/subtopic-pages`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Dynamic Pages",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/pages/dynamic-pages`
      }
    ]
  },

  // BLOGS ============================================
  {
    sectionName: "blog",
    sectionLabel: "Blogs",
    svg: (
      <Type
        strokeWidth={1.5}
        width={20}
      />
    ),
    subsections: [
      {
        sectionName: "article",
        sectionLabel: "Articles",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/blog/blog-article`
      },
      {
        sectionName: "author",
        sectionLabel: "Authors",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/blog/author`
      },
      {
        sectionName: "category",
        sectionLabel: "Categories",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/blog/category`
      },
      {
        sectionName: "tag",
        sectionLabel: "Tags",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/blog/tag`
      }
    ]
  },

  // MEDIA ============================================
  {
    sectionName: "aiTag",
    sectionLabel: "Media",
    svg: (
      <Images
        strokeWidth={1.5}
        width={20}
      />
    ),
    subsections: [
      {
        sectionName: "aiTag",
        sectionLabel: "Folders",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/media/folders`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "All Images",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/media/images`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Customziation Images",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/media/customization-images`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Identification Images",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/media/identification-images`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Issue Images",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/media/issue-images`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Review Images",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/media/review-images`
      }
    ]
  },

  // CATEGORIES ============================================
  {
    sectionName: "aiTag",
    sectionLabel: "Categories",
    svg: (
      <AlignVerticalJustifyEnd
        strokeWidth={1.5}
        width={20}
      />
    ),
    subsections: [
      {
        sectionName: "aiTag",
        sectionLabel: "Folders",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/categories/addon-categories`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "All Images",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/categories/content-categories`
      }
    ]
  },

  // CONTENTS ============================================
  {
    sectionName: "aiTag",
    sectionLabel: "Contents",
    svg: (
      <Cuboid
        strokeWidth={1.5}
        width={20}
      />
    ),
    subsections: [
      {
        sectionName: "aiTag",
        sectionLabel: "Contents",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/content`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Addons",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/content/addons`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Coupons",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/content/coupons`
      }
    ]
  },

  // SETTINGS ============================================
  {
    sectionName: "aiTag",
    sectionLabel: "Settings",
    svg: (
      <Bolt
        strokeWidth={1.5}
        width={20}
      />
    ),
    subsections: [
      {
        sectionName: "aiTag",
        sectionLabel: "Auth",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/settings/auth`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Callback",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/settings/callback`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Contact",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/settings/contact`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Logo",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/settings/logo`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Socials",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/settings/socials`
      },
      {
        sectionName: "aiTag",
        sectionLabel: "Homepage SEO",
        svg: <></>,
        link: `${ROOT_ADMIN_ROUTE}/settings/homepage-seo`
      }
    ]
  },

  // ADMIN ============================================
  {
    sectionName: "aiTag",
    sectionLabel: "Admin",
    svg: (
      <Shield
        strokeWidth={1.5}
        width={20}
      />
    ),
    link: `${ROOT_ADMIN_ROUTE}/admin`
  }
];
