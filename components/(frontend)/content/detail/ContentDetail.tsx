// constants
import { DOMAIN } from "@/common/constants/domain";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { INITIAL_CUSTOMIZATION } from "../constants/initialCustomization";
import { INITIAL_DELIVERY } from "../constants/initialDelivery";
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { lazy, memo } from "react";
import { getCartItem } from "./utils/getCartItem";
import { getContentPrice } from "../utils/getContentPrice";
import { setLocalStorage } from "@/common/utils/storage/local";

// hooks
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import ContentDetailAssurance from "./components/ContentDetailAssurance";
import ContentDetailBookNowButton from "./components/ContentDetailBookNowButton";
import ContentDetailCouponSection from "./components/ContentDetailCouponSection";
import ContentDetailCustomizeButton from "./components/ContentDetailCustomizeButton";
import ContentDetailDelivery from "./components/ContentDetailDelivery";
import ContentDetailInfo from "./components/ContentDetailInfo";
import ContentDetailPrice from "./components/ContentDetailPrice";
import ContentDetailRating from "./components/ContentDetailRating";
const LazyContentAddonDialog = lazy(
  () => import("../addon/ContentAddonDialog")
);
const LazyContentCustomize = lazy(
  () => import("../customize/ContentCustomizeDialog")
);
import ContentDetailTitleSection from "./components/ContentDetailTitleSection";
import ContentDetailVariantSections from "./components/ContentDetailVariantSection";
import { Suspense } from "react";

// types
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { type CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { type CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";
import { type ContentCustomVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategory";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type UnitDocument } from "@/common/types/documentation/presets/unit";
import ContentDetailWhatsappButton from "./components/ContentDetailWhatsappButton";

function ContentDetail({
  content,
  onChangeCustomVariant,
  onChangeReferenceVariant
}: {
  content: ContentDocument;
  onChangeCustomVariant: (
    customVariant: ContentCustomVariantDocument | null
  ) => void;
  onChangeReferenceVariant: (referenceVariant: ContentDocument | null) => void;
}) {
  // hooks
  const { push } = useRouter();
  const contentDeliveryId = useId();
  const { toast } = useToast();
  const {
    location: {
      data: { selectedCity }
    },
    cart: {
      method: { onAddItem: onAddToCart }
    }
  } = useAppStates();

  // states
  const [customVariantCategory, setCustomVariantCategory] =
    useState<ContentCustomVariantCategoryDocument | null>(null);
  const [customVariant, setCustomVariant] =
    useState<ContentCustomVariantDocument | null>(null);
  const [referenceVariant, setReferenceVariant] =
    useState<ContentDocument | null>(null);
  const [delivery, setDelivery] =
    useState<CartItemDeliveryDocument>(INITIAL_DELIVERY);
  const [customization, setCustomization] =
    useState<CartItemCustomizationDocument>(INITIAL_CUSTOMIZATION);
  const [addons, setAddons] = useState<CartItemAddonDocument[]>([]);

  const [showDeliveryStatus, setShowDeliveryStatus] = useState<boolean>(false);
  const [showCustomization, setShowCustomization] = useState<boolean>(false);
  const [showAddon, setShowAddon] = useState<boolean>(false);

  // variables
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const variantCategories = useMemo(() => content.variants, []);

  // memoizes
  const slug = useMemo(
    () => (referenceVariant ? referenceVariant.slug : content.slug),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const contentImage = useMemo(
    () =>
      customVariant && customVariant.image
        ? (customVariant.image as ImageDocument)
        : referenceVariant
          ? (referenceVariant.media.primary as ImageDocument)
          : (content.media.primary as ImageDocument),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customVariant, referenceVariant]
  );

  const name = useMemo(
    () =>
      customVariantCategory && customVariant
        ? `${content.name} (${customVariantCategory.options.unit ? `${customVariant.value}${(customVariantCategory.unit as UnitDocument).abbr}` : `${customVariant.label}`})`
        : referenceVariant
          ? referenceVariant.name
          : content.name,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customVariantCategory, customVariant, referenceVariant]
  );

  const edible = useMemo(
    () => (referenceVariant ? referenceVariant.edible : content.edible),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const price = useMemo(
    () =>
      customVariant
        ? customVariant.price!
        : referenceVariant
          ? referenceVariant.price!
          : content.price!,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customVariant, referenceVariant]
  );

  const pricePerUnit = useMemo(
    () => getContentPrice({ price, city: selectedCity }).price,
    [price, selectedCity]
  );

  const rating = useMemo(
    () =>
      referenceVariant
        ? referenceVariant.quality?.rating
        : content.quality?.rating,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const coupons = useMemo(
    () =>
      referenceVariant
        ? (referenceVariant._coupons as CouponDocument[]) || []
        : (content._coupons as CouponDocument[]) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const contentAvailability = useMemo(
    () =>
      referenceVariant ? referenceVariant.availability! : content.availability!,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const contentDelivery = useMemo(
    () => (referenceVariant ? referenceVariant.delivery! : content.delivery!),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const info = useMemo(
    () => (referenceVariant ? referenceVariant.detail! : content.detail!),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const contentCustomization = useMemo(
    () =>
      referenceVariant ? referenceVariant.customization : content.customization,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const contentAddons = useMemo(
    () => (referenceVariant ? referenceVariant.addons! : content.addons!),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const isAvailable = useMemo(
    () =>
      contentAvailability.availableAt === "cities"
        ? contentAvailability.limitAvailability
          ? Boolean(
            contentAvailability?.cities?.find(
              (cityId) => cityId === selectedCity?._id
            )
          )
          : true
        : true,
    [contentAvailability, selectedCity]
  );

  const cartItemPrice = useMemo(
    () =>
      getContentPrice({ price, city: selectedCity }).price +
      (customization?.enhancement?.items?.reduce(
        (enhancementTotal, enhancementItem) =>
          (enhancementTotal += enhancementItem.price),
        0
      ) || 0) +
      (customization?.upgrade?.price || 0) +
      (customization?.flavour?.price || 0),
    [
      customization?.enhancement?.items,
      customization?.upgrade?.price,
      customization?.flavour?.price,
      price,
      selectedCity
    ]
  );

  const cartItem = useMemo(
    // () => ({}) as CartItemDocument,
    // []
    () =>
      getCartItem({
        content: referenceVariant ? referenceVariant : content,
        customVariant: customVariant
          ? (customVariant._id as string)
          : undefined,
        titleIfCustomVariant: customVariant ? name : undefined,
        pricePerUnit,
        delivery,
        customization,
        addons
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pricePerUnit, delivery, customization, addons]
  );

  // event handlers
  const handleChangeReferenceVariant = useCallback(
    (referenceVariant: ContentDocument | null) => {
      onChangeReferenceVariant(referenceVariant);
      setReferenceVariant(referenceVariant);
      setCustomization(INITIAL_CUSTOMIZATION);
      setAddons([]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleChangeCustomVariant = useCallback(
    (customVariantId: string | null) => {
      const newCustomVariantCategory = customVariantId
        ? content.variants!.find(
          (variant) =>
            variant.type === "custom" &&
            variant.custom?.variants.find(
              ({ _id }) => _id === customVariantId
            )
        )!.custom!
        : null;

      const newCustomVariant = newCustomVariantCategory
        ? newCustomVariantCategory.variants.find(
          ({ _id }) => _id === customVariantId
        )!
        : null;

      onChangeCustomVariant(newCustomVariant);
      setCustomVariantCategory(newCustomVariantCategory);
      setCustomVariant(newCustomVariant);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleProceedToCart = useCallback(() => {
    onAddToCart(cartItem);
    toast({
      variant: "success",
      title: "✅ Added To Cart",
    });
    setShowAddon(false);
    // push("/cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem, onAddToCart]);

  const handleScrollToDelivery = useCallback(() => {
    const target = document.getElementById(contentDeliveryId) as HTMLElement;
    target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center"
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowCustomizations = useCallback(() => {
    setShowCustomization(true);
  }, [delivery, isAvailable, selectedCity]);

  // const handleShowCustomizations = useCallback(() => {
  //   if (
  //     contentAvailability.availableAt === "all-india" ||
  //     (isAvailable && delivery.date && delivery.type && delivery.slot)
  //   ) {
  //     setShowCustomization(true);
  //   } else {
  //     handleScrollToDelivery();
  //     setShowDeliveryStatus(true);
  //     toast({
  //       variant: "warning",
  //       title:
  //         selectedCity && !isAvailable
  //           ? "Not Available At Selected City"
  //           : `${isAvailable ? "" : "City"} ${
  //               isAvailable || (delivery.date && delivery.type && delivery.slot)
  //                 ? ""
  //                 : " & "
  //             } ${
  //               delivery.date && delivery.type && delivery.slot
  //                 ? ""
  //                 : "Date-Time"
  //             } Not Selected`
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [delivery, isAvailable, selectedCity]);

  const handleBookNow = useCallback(() => {
    if (contentAvailability.availableAt === "all-india") {
      setShowCustomization(false);
      if (contentAddons?.length) {
        setShowAddon(true);
      } else {
        handleProceedToCart();
      }
    } else {
      if (
        selectedCity &&
        isAvailable &&
        delivery.date &&
        delivery.type &&
        delivery.slot
      ) {
        setShowCustomization(false);
        if (contentAddons?.length) {
          setShowAddon(true);
        } else {
          handleProceedToCart();
        }
      } else {
        handleScrollToDelivery();
        setShowDeliveryStatus(true);
        toast({
          variant: "warning",
          title:
            selectedCity && !isAvailable
              ? "Not Available At Selected City"
              : `${selectedCity && isAvailable ? "" : "City"} ${(selectedCity && isAvailable) ||
                (delivery.date && delivery.type && delivery.slot)
                ? ""
                : " & "
              } ${delivery.date && delivery.type && delivery.slot
                ? ""
                : "Date-Time"
              } Not Selected`
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delivery, isAvailable, selectedCity]);

  // side effects
  useEffect(() => {
    setLocalStorage({
      key: "whatsapp",
      value: {
        city: selectedCity ? selectedCity?.name || "" : "",
        name: name || "",
        link: `${DOMAIN}${content.type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`,
        price: `${INRSymbol}${getContentPrice({ price, city: selectedCity }).price
          }`
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  return (
    <>
      <section className="max-lg:pt-5 relative flex flex-col justify-start max-lg:bg-ivory-1 max-lg:z-[999]">
        <div className="relative lg:pl-5 flex flex-col justify-start max-lg:pb-3 max-lg:border-b border-ivory-3/50">
          <ContentDetailTitleSection
            name={name}
            edible={edible}
          />
          <ContentDetailPrice price={price} />
          {rating && <ContentDetailRating rating={rating} />}
          {/* {Boolean(coupons.length) && (
            <ContentDetailCouponSection
              coupons={coupons}
              price={price}
            />
          )} */}
          <div className="flex flex-col justify-start lg:pr-2.5 max-sm:bg-ivory gap-0 sm:gap-y-6 sm:py-6">
            {variantCategories && Boolean(variantCategories?.length) && (
              <ContentDetailVariantSections
                variants={variantCategories}
                activeReferenceVariantId={
                  referenceVariant ? (referenceVariant._id as string) : null
                }
                activeCustomVariantId={(customVariant?._id as string) || null}
                onChangeReferenceVariant={handleChangeReferenceVariant}
                onChangeCustomVariant={handleChangeCustomVariant}
              />
            )}
            <ContentDetailDelivery
              id={contentDeliveryId}
              title="Select City and Time"
              isAvailable={isAvailable}
              showDeliveryStatus={showDeliveryStatus}
              contentAvailability={contentAvailability}
              contentDelivery={contentDelivery}
              cartItemDelivery={delivery}
              onChangeShowDeliveryStatus={setShowDeliveryStatus}
              onChangeCartItemDelivery={setDelivery}
            />
          </div>
        </div>
        <div className="max-sm:px-2.5 lg:px-2.5 lg:mr-10 lg:pl-5 sticky bottom-0 bg-ivory-1 max-sm:border-t border-ash sm:bg-ivory pb-2.5 pt-3 sm:py-5 grid gap-x-1.5 gap-y-2 sm:gap-x-2 sm:gap-y-2 grid-rows-2 grid-cols-2 sm:items-center sm:justify-start z-[900]">
          {contentCustomization?.isCustomizable && (
            <ContentDetailCustomizeButton onClick={handleShowCustomizations} />
          )}
          <ContentDetailWhatsappButton />
          <ContentDetailBookNowButton
            fullWidth={contentCustomization?.isCustomizable ? true : false}
            onClick={handleBookNow}
          />
        </div>

        <ContentDetailInfo info={info} />
        <ContentDetailAssurance isMobile />
      </section>
      {contentCustomization && (
        <Suspense fallback={<></>}>
          <LazyContentCustomize
            slug={slug}
            contentName={name}
            contentImage={contentImage}
            contentPrice={price}
            selectedCity={selectedCity}
            showCustomization={showCustomization}
            cartItemCustomization={customization}
            contentCustomization={contentCustomization}
            cartItemDelivery={delivery}
            onChangeShowCustomization={setShowCustomization}
            onChangeCartItemCustomization={setCustomization}
            onBookNow={handleBookNow}
          />
        </Suspense>
      )}
      {Boolean(contentAddons) && (
        <Suspense fallback={<></>}>
          <LazyContentAddonDialog
            showAddon={showAddon}
            cartItemAddons={addons}
            contentAddons={contentAddons}
            cartItemPrice={cartItemPrice}
            onChangeShowAddon={setShowAddon}
            onChangeCartItemAddon={setAddons}
            onBookNow={handleProceedToCart}
          />
        </Suspense>
      )}
    </>
  );
}

export default memo(ContentDetail);
