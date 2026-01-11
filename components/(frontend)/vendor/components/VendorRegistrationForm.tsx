// icons
import { Facebook, Globe, Instagram, Youtube } from "lucide-react";

// requests
import { addVendorRequest } from "@/request/vendor/registration/request";

// constants
import { VENDOR_REGISTRATION_FORM_KEYS } from "../constants/vendorRegistrationFormKey";

// hooks
import { useEffect, useId, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// components
import AdvancedCheckbox from "./AdvancedCheckbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Form from "@/lib/Forms/Form/Form";
import Input from "@/lib/Forms/Input/Input";
import Reset from "@/lib/Forms/Submit_Reset/Reset";
import Submit from "@/lib/Forms/Submit_Reset/Submit";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";
import Textarea from "@/lib/Forms/Textarea/Textarea";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type FormEntriesType } from "@/common/types/types";
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";
import { type VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";

export default function VendorRegistrationForm({
  showForm,
  foundUsSources,
  vendorOfferCategories,
  onChangeShowForm
}: {
  showForm: boolean;
  foundUsSources: FoundUsSourceDocument[];
  vendorOfferCategories: VendorOfferCategoryDocument[];
  onChangeShowForm: (showForm: boolean) => void;
}) {
  // hooks
  const { toast } = useToast();

  // ids
  const socialsId = useId();

  // states
  const [hasGSTNo, setHasGSTNo] = useState<boolean>(false);
  const [showSocials, setShowSocials] = useState<boolean>(false);

  // event handlers
  const handleFormSubmit = (formData: FormEntriesType) => {
    const interestedCategories = formData[
      VENDOR_REGISTRATION_FORM_KEYS.INTERESTED_CATEGORIES
    ] as string;

    if (!interestedCategories) {
      toast({
        title: "Warning",
        description: "Interested Categories Not Selected",
        variant: "warning"
      });

      return;
    }

    const ownerName = formData[VENDOR_REGISTRATION_FORM_KEYS.NAME] as string;
    const businessName = formData[
      VENDOR_REGISTRATION_FORM_KEYS.BUSINESS
    ] as string;
    const city = formData[VENDOR_REGISTRATION_FORM_KEYS.CITY] as string;
    const mail = formData[VENDOR_REGISTRATION_FORM_KEYS.EMAIL] as string;
    const mobile = formData[VENDOR_REGISTRATION_FORM_KEYS.PHONE] as string;
    const whatsapp = formData[VENDOR_REGISTRATION_FORM_KEYS.WHATSAPP] as string;
    const address = formData[VENDOR_REGISTRATION_FORM_KEYS.ADDRESS] as string;

    const registeredGST = formData[
      VENDOR_REGISTRATION_FORM_KEYS.GST_REGISTERED
    ] as string;
    let gstNumber = "";
    if (registeredGST === "on")
      gstNumber = formData[VENDOR_REGISTRATION_FORM_KEYS.GST_NUMBER] as string;

    const foundUs = formData[
      VENDOR_REGISTRATION_FORM_KEYS.FOUND_US_AT
    ] as string;
    const website = formData[VENDOR_REGISTRATION_FORM_KEYS.WEBSITE] as string;
    const facebook = formData[
      VENDOR_REGISTRATION_FORM_KEYS.SOCIALS.FACEBOOK
    ] as string;
    const instagram = formData[
      VENDOR_REGISTRATION_FORM_KEYS.SOCIALS.INSTAGRAM
    ] as string;
    const youtube = formData[
      VENDOR_REGISTRATION_FORM_KEYS.SOCIALS.YOUTUBE
    ] as string;

    const reqData = {
      businessName,
      ownerName,
      mobile,
      whatsapp,
      mail,
      address,
      city,
      ...(facebook || instagram || youtube
        ? {
            socialMedia: [
              ...(facebook
                ? [
                    {
                      name: "facebook",
                      url: facebook
                    }
                  ]
                : []),
              ...(instagram
                ? [
                    {
                      name: "instagram",
                      url: instagram
                    }
                  ]
                : []),
              ...(youtube
                ? [
                    {
                      name: "youtube",
                      url: youtube
                    }
                  ]
                : [])
            ]
          }
        : {}),
      ...(website ? { website } : {}),
      ...(gstNumber ? { gstNumber } : {}),
      categories: JSON.parse(interestedCategories) as string[],
      ...(foundUs ? { foundUs } : {})
    } as Partial<VendorRequestDocument>;

    addVendorRequest(reqData);
    onChangeShowForm(false);

    toast({
      title: "Your Response is Captured",
      description: "We will get back to you in 2-3 business days",
      variant: "success"
    });
  };

  // side effects
  useEffect(() => {}, []);

  useEffect(() => {
    if (showSocials) {
      const socialsDiv = document.getElementById(socialsId) as HTMLElement;
      socialsDiv.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSocials]);

  return (
    <Dialog
      open={showForm}
      onOpenChange={onChangeShowForm}
    >
      <DialogContent className="z-[1000] sm:max-w-[40dvw] h-device sm:max-h-[95dvh] p-0 overflow-y-scroll scrollbar-hide outline-none border-none rounded-none sm:rounded-2xl">
        <div className="pb-5 pt-6 text-2xl font-light px-3.5 sm:px-6">
          Vendor Registration
        </div>
        <Form
          onSubmit={handleFormSubmit}
          className="flex flex-col relative justify-start sm:grid sm:grid-cols-2 gap-y-7 sm:gap-x-5 sm:gap-y-4 *:text-sm px-3.5 sm:px-6"
        >
          <Input
            type="text"
            name={VENDOR_REGISTRATION_FORM_KEYS.NAME}
            isRequired
            labelConfig={{ label: "Name", layoutStyle: "flex-col" }}
            errorCheck={false}
            validCheck={false}
            customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
          />
          <Input
            type="text"
            name={VENDOR_REGISTRATION_FORM_KEYS.EMAIL}
            isRequired
            labelConfig={{
              label: "Email Address",
              layoutStyle: "flex-col"
            }}
            errorCheck={false}
            validCheck={false}
            customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
          />
          <Input
            type="text"
            name={VENDOR_REGISTRATION_FORM_KEYS.CITY}
            isRequired
            labelConfig={{ label: "City", layoutStyle: "flex-col" }}
            errorCheck={false}
            validCheck={false}
            customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
          />
          <Input
            type="text"
            name={VENDOR_REGISTRATION_FORM_KEYS.PHONE}
            isRequired
            labelConfig={{ label: "Phone", layoutStyle: "flex-col" }}
            errorCheck={false}
            validCheck={false}
            customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
          />
          <Input
            type="text"
            name={VENDOR_REGISTRATION_FORM_KEYS.BUSINESS}
            isRequired={false}
            labelConfig={{ label: "Shop Name", layoutStyle: "flex-col" }}
            errorCheck={false}
            validCheck={false}
            customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
          />
          <Input
            type="text"
            name={VENDOR_REGISTRATION_FORM_KEYS.WHATSAPP}
            isRequired={false}
            labelConfig={{
              label: "Whatsapp / Alternate No.",
              layoutStyle: "flex-col"
            }}
            errorCheck={false}
            validCheck={false}
            customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
          />
          <div className="max-sm:my-3 gap-5 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 sm:gap-6 sm:h-[74px]">
            <div className="flex flex-col justify-start gap-3">
              <span className="font-medium text-sm">
                Do you have a registered GST?
              </span>
              <div className="flex items-center justify-start gap-3 translate-y-2.5">
                <Toggle
                  name={VENDOR_REGISTRATION_FORM_KEYS.GST_REGISTERED}
                  onChangeIsActive={(currState: boolean) => {
                    setHasGSTNo(currState);
                  }}
                  className="!w-10"
                  activeColor={{
                    bg: "bg-green-400/30",
                    bubble: "bg-green-700"
                  }}
                />
                <span
                  className={`text-sm -translate-y-px ${hasGSTNo ? "text-green-600" : "text-rose-600"}`}
                >
                  {hasGSTNo ? "Yes, I have" : "No, I don't have"}
                </span>
              </div>
            </div>
            {hasGSTNo ? (
              <Input
                type="text"
                name={VENDOR_REGISTRATION_FORM_KEYS.GST_NUMBER}
                isRequired
                labelConfig={{
                  label: "Registered GST Number",
                  layoutStyle: "flex-col max-sm:my-3"
                }}
                errorCheck={false}
                validCheck={false}
                customStyle="col-start-2 row-start-1 w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
              />
            ) : (
              <></>
            )}
          </div>
          <Textarea
            name={VENDOR_REGISTRATION_FORM_KEYS.ADDRESS}
            validCheck={false}
            errorCheck={false}
            isList={false}
            customValue={undefined}
            defaultValue=""
            isRequired
            labelConfig={{
              label: "Address",
              labelStyle: "",
              layoutStyle: "flex-col col-span-2 max-sm:my-3 "
            }}
            customStyle="w-full text-base outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300 resize-none h-16"
          />
          <section className="col-span-2">
            <AdvancedCheckbox
              name={VENDOR_REGISTRATION_FORM_KEYS.INTERESTED_CATEGORIES}
              label="Interested Categories (max 3)"
              layoutStyle="flex flex-col gap-4"
              isRequired
              options={vendorOfferCategories.map(({ _id, name }) => ({
                label: name,
                value: _id as string
              }))}
            />
          </section>
          <Input
            type="dropdown"
            name={VENDOR_REGISTRATION_FORM_KEYS.FOUND_US_AT}
            isRequired={false}
            labelConfig={{
              label: "How did you find Us?",
              layoutStyle: "flex-col"
            }}
            nullOption
            options={foundUsSources.map(({ _id, source }) => ({
              label: source,
              value: _id as string
            }))}
            errorCheck={false}
            validCheck={false}
            customStyle="w-full text-base outline-none border-none translate-y-px cursor-pointer bg-transparent py-2.5 transition-all duration-300"
          />
          <div className="flex items-center justify-between gap-3 h-full">
            <span className="font-medium text-sm">Add Social Media</span>
            <div className="flex items-center justify-start gap-3">
              <Toggle
                name={VENDOR_REGISTRATION_FORM_KEYS.GST_REGISTERED}
                onChangeIsActive={(currState: boolean) =>
                  setShowSocials((prev) => currState)
                }
                className="!w-10"
                activeColor={{
                  bg: "bg-green-400/30",
                  bubble: "bg-green-700"
                }}
              />
            </div>
          </div>
          {showSocials && (
            <div
              id={socialsId}
              className="sm:col-span-2 grid grid-cols-2 gap-4 items-center justify-center"
            >
              <div className="py-2 flex flex-col justify-center">
                <span className="flex items-center justify-start gap-2">
                  <Youtube
                    width={21}
                    height={21}
                    strokeWidth={1}
                    stroke="#fff"
                    fill="#CD201F"
                  />
                  <span>Youtube</span>
                </span>
                <Input
                  type="text"
                  name={VENDOR_REGISTRATION_FORM_KEYS.SOCIALS.YOUTUBE}
                  isRequired={false}
                  labelConfig={{ label: "" }}
                  errorCheck={false}
                  validCheck={false}
                  customStyle="w-full text-sm outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
                />
              </div>
              <div className="py-2 flex flex-col justify-center">
                <span className="flex items-center justify-start gap-2">
                  <Instagram
                    width={18}
                    height={18}
                    strokeWidth={1}
                    stroke="#fff"
                    fill="#962fbf"
                  />
                  <span>Instagram</span>
                </span>
                <Input
                  type="text"
                  name={VENDOR_REGISTRATION_FORM_KEYS.SOCIALS.INSTAGRAM}
                  isRequired={false}
                  labelConfig={{ label: "" }}
                  errorCheck={false}
                  validCheck={false}
                  customStyle="w-full text-sm outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
                />
              </div>
              <div className="py-2 flex flex-col justify-center">
                <span className="flex items-center justify-start gap-2">
                  <Facebook
                    width={18}
                    height={18}
                    fill="#316FF6"
                    stroke="#316FF6"
                    strokeWidth={1}
                  />
                  <span>Facebook</span>
                </span>
                <Input
                  type="text"
                  name={VENDOR_REGISTRATION_FORM_KEYS.SOCIALS.FACEBOOK}
                  isRequired={false}
                  labelConfig={{ label: "" }}
                  errorCheck={false}
                  validCheck={false}
                  customStyle="w-full text-sm outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
                />
              </div>
              <div className="py-2 flex flex-col justify-center">
                <span className="flex items-center justify-start gap-2">
                  <Globe
                    width={18}
                    height={18}
                    strokeWidth={1}
                  />
                  <span>Website</span>
                </span>
                <Input
                  type="text"
                  name={VENDOR_REGISTRATION_FORM_KEYS.WEBSITE}
                  isRequired={false}
                  labelConfig={{ label: "" }}
                  errorCheck={false}
                  validCheck={false}
                  customStyle="w-full text-sm outline-none bg-transparent border-b border-charcoal-3/30 hover:border-charcoal-3/70 focus:border-charcoal-3/70 py-2.5 transition-all duration-300"
                />
              </div>
            </div>
          )}
          <SubmitAndReset
            position="center"
            className="sm:col-span-2 bg-transparent !sticky !bottom-0 !pt-0 pb-5 max-sm:flex max-sm:gap-3 bg-white"
          >
            <Submit
              label="Submit"
              customStyle="bg-sienna/60 hover:bg-sienna hover:text-white cursor-pointer rounded-full text-amber-950 px-14 sm:px-10 pb-2 pt-2.5 flex items-center justify-center transition-all duration-300"
            />
            <Reset
              label="Reset"
              className="max-sm:hidden"
            />
          </SubmitAndReset>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
