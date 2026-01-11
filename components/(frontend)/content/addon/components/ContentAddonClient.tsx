// utils
import { lazy, memo } from "react";

// hooks
import { useMemo, useState } from "react";

// components
const LazyContentAddonHeader = lazy(() => import("./ContentAddonHeader"));
const LazyContentAddonFooter = lazy(() => import("./ContentAddonFooter"));
const LazyContentAddonItems = lazy(() => import("./ContentAddonItems"));
import { Suspense } from "react";

// types
import { type AddonCategoryDocument } from "@/common/types/documentation/categories/addonCategory";
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { type ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";

function ContentAddonClient({
  cartItemPrice,
  contentAddons,
  cartItemAddons,
  onChangeCartItemAddon,
  onBookNow
}: {
  cartItemPrice: number;
  contentAddons: ContentAddonDocument[];
  cartItemAddons: CartItemAddonDocument[];
  onChangeCartItemAddon: (cartItemAddons: CartItemAddonDocument[]) => void;
  onBookNow: () => void;
}) {
  // maps
  const categoriesMap = useMemo(() => {
    const categoriesMap = new Map<string, ContentAddonDocument[]>([]);

    for (let i = 0; i < contentAddons.length; i++) {
      const contentAddon = contentAddons[i];
      const category = (
        (contentAddons[i].addon as AddonDocument)
          .category as AddonCategoryDocument
      ).name;

      categoriesMap.set(category, [
        ...(categoriesMap.get(category) || []),
        contentAddon
      ]);

      if (contentAddon.isPopular) {
        categoriesMap.set("Bestseller", [
          ...(categoriesMap.get("Bestseller") || []),
          contentAddon
        ]);
      }
    }

    return categoriesMap;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // variables
  const categories = useMemo(
    () => [
      ...(categoriesMap.has("Bestseller") ? ["Bestseller"] : []),
      ...Array.from(categoriesMap.keys())
        .filter((key) => key !== "Bestseller")
        .sort()
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // states
  const [category, setCategory] = useState<string>(categories[0] || "");

  // variables
  const categoryAddons = useMemo(
    () => (categoriesMap.get(category) as ContentAddonDocument[]) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category]
  );

  const addonsPrice = useMemo(
    () =>
      cartItemAddons.reduce(
        (total, cartItemAddon) =>
          total +
          (cartItemAddon.addon as AddonDocument).price * cartItemAddon.quantity,
        0
      ),
    [cartItemAddons]
  );

  return (
    <>
      <Suspense fallback={<></>}>
        <LazyContentAddonHeader
          categories={categories}
          selectedCategory={category}
          onChangeSelectedCategory={setCategory}
        />
      </Suspense>
      <div className="relative overflow-y-scroll scrollbar-hide bg-ivory-2 z-10">
        <Suspense fallback={<></>}>
          <LazyContentAddonItems
            contentAddons={categoryAddons}
            cartItemAddons={cartItemAddons}
            onChangeCartItemAddons={onChangeCartItemAddon}
          />
        </Suspense>
        <Suspense fallback={<></>}>
          <LazyContentAddonFooter
            hasAddons={Boolean(cartItemAddons?.length)}
            cartItemPrice={cartItemPrice}
            addonsPrice={addonsPrice}
            onBookNow={onBookNow}
          />
        </Suspense>
      </div>
    </>
  );
}

export default memo(ContentAddonClient);
