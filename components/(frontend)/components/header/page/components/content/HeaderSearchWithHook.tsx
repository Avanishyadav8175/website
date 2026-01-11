"use client";

// icons
import { Search } from "lucide-react";

// components
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import HeaderContent from "./components/HeaderContent";
// import SearchBox from "./components/search/components/SearchBox";
// import SearchResults from "./components/search/components/SearchResults";

export default function HeaderSearchWithHook() {
  return (
    <Drawer>
      <DrawerTrigger>
        <HeaderContent
          label={"Search"}
          icon={
            <Search
              strokeWidth={1}
              width={24}
              height={24}
            />
          }
          mobile
          action={() => {}}
        />
      </DrawerTrigger>
      <DrawerContent className="outline-none border-none z-[996] h-[95dvh] bg-ivory-1 rounded-t-3xl px-3.5 pt-6 pb-5 gap-y-4 transition-all duration-300">
        {/* <SearchBox /> */}
        {/* <SearchResults /> */}
      </DrawerContent>
    </Drawer>
  );
}
