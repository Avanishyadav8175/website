// hooks
import { lazy, Suspense, useEffect, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
const LazyContentDetailDeliveryCityList = lazy(
  () => import("./ContentDetailDeliveryCityList")
);

// types
import { type ChangeEvent } from "react";

export default function ContentDetailDeliverySelectCity() {
  // hooks
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  // states
  const [keyword, setKeyword] = useState<string>(
    selectedCity ? selectedCity.name : ""
  );
  const [showPopover, setShowPopover] = useState<boolean>(false);

  // event handlers
  const handleChangeKeyword = (keyword: string) => {
    if (!showPopover && keyword.length) {
      setShowPopover(true);
    }

    setKeyword(keyword);
  };

  // side effects
  useEffect(() => {
    if (selectedCity) {
      setKeyword(selectedCity.name);
    } else {
      setKeyword("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  useEffect(() => {
    if (!showPopover) {
      if (selectedCity && keyword !== selectedCity.name) {
        setKeyword(selectedCity.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover]);

  return (
    <div className="relative outline-none focus:outline-none rounded-xl border-none bg-ivory-2 p-0">
      <input
        type={"text"}
        autoComplete="off"
        name={"contentPageSelectPincode"}
        value={keyword}
        onFocus={() => {
          if (keyword.length) {
            setShowPopover(true);
          }
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowPopover(false);
          }, 200);
        }}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          handleChangeKeyword(value);
        }}
        placeholder={"Enter City"}
        className={`w-full px-3 sm:px-3.5 py-2.5 rounded-xl outline-none bg-ivory-2 border border-transparent transition-all duration-300 placeholder:text-charcoal-3/45 hover:brightness-95 focus:brightness-95 focus:outline-1 focus:outline-ash focus:outline-offset-2`}
      />
      {showPopover && (
        <section
          className={`z-[999] mt-1 w-full shadow-md absolute top-12 left-0 rounded-xl bg-white overflow-y-scroll scrollbar-hide max-h-[270px] flex flex-col justify-start ${keyword.length > 1 ? "p-2 py-2.5" : ""}`}
        >
          <Suspense fallback={<></>}>
            <LazyContentDetailDeliveryCityList
              showPopover={showPopover}
              keyword={keyword}
              onChangeShowPopover={setShowPopover}
            />
          </Suspense>
        </section>
      )}
    </div>
    // <Popover
    //   open={showPopover}
    //   onOpenChange={setShowPopover}
    // >
    //   <PopoverTrigger
    //     className="outline-none focus:outline-none border-none bg-ivory-2 p-0"
    //     asChild
    //   >
    //     <button className="bg-transparent">
    //       <input
    //         type={"text"}
    //         autoComplete="off"
    //         name={"contentPageSelectPincode"}
    //         value={keyword}
    //         onChange={({
    //           target: { value }
    //         }: ChangeEvent<HTMLInputElement>) => {
    //           handleChangeKeyword(value);
    //         }}
    //         placeholder={"Enter City"}
    //         className={`w-full px-3 sm:px-3.5 py-2.5 rounded-xl outline-none bg-ivory-2 border border-transparent transition-all duration-300 placeholder:text-charcoal-3/45 hover:brightness-95 focus:brightness-95 focus:outline-1 focus:outline-ash focus:outline-offset-2`}
    //       />
    //     </button>
    //   </PopoverTrigger>
    //   <PopoverContent
    //     side="bottom"
    //     avoidCollisions={false}
    //     onOpenAutoFocus={(e) => {
    //       e.preventDefault();
    //     }}
    //     className={`${keyword?.length >= 2 ? "" : "scale-0 min-h-0 max-h-0 h-0"} overflow-y-scroll scrollbar-hide max-h-[270px] flex flex-col justify-start p-2 py-2.5 max-w-[250px] transition-all duration-300`}
    //   >
    //     <Suspense>
    //       <ContentDetailDeliveryCityList
    //         showPopover={showPopover}
    //         keyword={keyword}
    //         onChangeShowPopover={setShowPopover}
    //       />
    //     </Suspense>
    //   </PopoverContent>
    // </Popover>
  );
}
