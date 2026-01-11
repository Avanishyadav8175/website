// utils
import { lazy, memo } from "react";

// components
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
const LazyContentsSection = lazy(() => import("../../ContentsSection"));
import { Suspense } from "react";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

function ContentGallerySimilarContentDrawer({
  showDrawer,
  contents,
  onChangeShowDrawer
}: {
  showDrawer: boolean;
  contents: ContentDocument[];
  onChangeShowDrawer: (showDrawer: boolean) => void;
}) {
  return (
    <Drawer
      open={showDrawer}
      onOpenChange={onChangeShowDrawer}
    >
      <DrawerContent className="rounded-t-3xl pt-2.5 z-[996]">
        <DrawerHeader>
          <DrawerTitle className="hidden"></DrawerTitle>
        </DrawerHeader>
        <Suspense fallback={<></>}>
          <LazyContentsSection
            title="Similar Products"
            titleStyles="max-sm:!pl-2.5"
            contents={contents}
            isScrollable
          />
        </Suspense>
      </DrawerContent>
    </Drawer>
  );
}

export default memo(ContentGallerySimilarContentDrawer);
