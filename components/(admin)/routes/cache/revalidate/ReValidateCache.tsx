// icons
import {
  AlignVerticalJustifyEnd,
  Cuboid,
  Grip,
  Images,
  LayoutDashboard,
  LayoutList,
  PanelBottom,
  PanelTop,
  Type
} from "lucide-react";

// requests
import { revalidateBlogsSitemap } from "./requests/revalidateBlogsSitemap";
import { revalidateCategoriesSitemap } from "./requests/revalidateCategoriesSitemap";
import { revalidateFooterCache } from "./requests/revalidateFooterCache";
import { revalidateHeaderCache } from "./requests/revalidateHeaderCache";
import { revalidateHomepageCache } from "./requests/revalidateHomepageCache";
import { revalidateImagesSitemap } from "./requests/revalidateImagesSitemap";
import { revalidateProductsSitemap } from "./requests/revalidateProductsSitemap";
import { revalidateServicesSitemap } from "./requests/revalidateServicesSitemap";
import { revalidateSubTopicsSitemap } from "./requests/revalidateSubTopicsSitemap";
import { revalidateTopicsSitemap } from "./requests/revalidateTopicsSitemap";

// components
import RevalidateCacheButton from "./components/RevalidateCacheButton";
import { revalidateCatalogueCategoriesCache } from "./requests/revalidateCatalogueCategoriesCache";

export default function RevalidateCache() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 w-full h-full">
      {/* <section className="flex flex-col items-center gap-4">
        <span className={"text-3xl underline"}>Pages</span>
        <section className="flex items-center justify-start gap-5">
          <RevalidateCacheButton
            type="cache"
            label="Header"
            icon={
              <PanelTop
                width={40}
                height={40}
              />
            }
            onClick={revalidateHeaderCache}
          />
          <RevalidateCacheButton
            type="cache"
            label="Footer"
            icon={
              <PanelBottom
                width={40}
                height={40}
              />
            }
            onClick={revalidateFooterCache}
          />
          <RevalidateCacheButton
            type="cache"
            label="Homepage"
            icon={
              <LayoutDashboard
                width={40}
                height={40}
              />
            }
            onClick={revalidateHomepageCache}
          />
          <RevalidateCacheButton
            type="cache"
            label="Catalogue"
            icon={
              <Grip
                width={40}
                height={40}
              />
            }
            onClick={revalidateCatalogueCategoriesCache}
          />
        </section>
      </section> */}
      <section className="flex flex-col items-center gap-8">
        <span className={"text-2xl"}>Refresh Sitemaps</span>
        <section className="grid grid-cols-2 items-center gap-5">
          <RevalidateCacheButton
            type="sitemap"
            label="Categories"
            icon={<></>}
            onClick={async () => {
              await revalidateCategoriesSitemap();
              await revalidateTopicsSitemap();
              await revalidateSubTopicsSitemap();
              return true;
            }}
          />
          <RevalidateCacheButton
            type="sitemap"
            label="Products"
            icon={<></>}
            onClick={revalidateProductsSitemap}
          />
          <RevalidateCacheButton
            type="sitemap"
            label="Blogs"
            icon={<></>}
            onClick={revalidateBlogsSitemap}
          />
          <RevalidateCacheButton
            type="sitemap"
            label="Images"
            icon={<></>}
            onClick={revalidateImagesSitemap}
          />
        </section>
      </section>
    </section>
  );
}
