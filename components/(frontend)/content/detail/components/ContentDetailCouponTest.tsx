"use client";

import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { lazy, Suspense, useEffect, useState, useRef } from "react";

const LazyContentDetailCoupons = lazy(() => import("./ContentDetailCoupons"));

export default function ContentDetailCouponTest() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<CouponDocument[]>([]);
  const [price, setPrice] = useState({
    base: { price: 0 }
  });

  const drawerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) return;

    const diffY = touchEndY.current - touchStartY.current;

    if (diffY > 50) {
      closeDrawer();
    }

    touchStartY.current = null;
    touchEndY.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const closeDrawer = () => {
    setAnimation(false);
    setTimeout(() => {
      setIsOpen(false);
      setCoupons([]);
      setPrice({ base: { price: 0 } });
    }, 350);
  };

  useEffect(() => {
    const handleCouponOpen = (e: any) => {
      if (e.detail.data) {
        setCoupons(e.detail.data.coupons);
        setPrice(e.detail.data.price);
      }
      if (e.detail.setIsOpen) {
        setIsOpen(true);
        setTimeout(() => setAnimation(true), 100);
      } else {
        closeDrawer();
      }
    };

    window.addEventListener("couponOpen", handleCouponOpen);
    return () => window.removeEventListener("couponOpen", handleCouponOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          id="coupon-background"
          className="fixed top-0 left-0 w-screen h-screen bg-black/75 backdrop-blur-sm transition-all duration-200 ease-linear overflow-hidden"
          style={{ zIndex: 100000 }}
          onClick={(e) => {
            if ((e.target as HTMLElement).id === "coupon-background") {
              closeDrawer();
            }
          }}
        >
          <div
            ref={drawerRef}
            className={`fixed bottom-0 bg-ivory-2 w-screen ${
              animation ? "h-[85vh]" : "h-[1vh]"
            } transition-all duration-300 ease-in-out rounded-t-3xl`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-center px-4 py-3.5 w-screen ">
              <div className="bg-gray-500/20 shadow-md rounded-full w-44 h-2"></div>
            </div>
            <div className="*:max-sm:px-3.5 *:sm:px-4 flex flex-col justify-start min-h-[80dvh] max-h-[80dvh] max-sm:max-h-[95dvh] max-sm:bg-[#f2f2f2] rounded-t-3xl sm:rounded-t-2xl">
              <Suspense fallback={<></>}>
                <LazyContentDetailCoupons
                  coupons={coupons}
                  price={price as ContentPriceDocument}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
