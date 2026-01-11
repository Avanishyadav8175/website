// media
import { COMPANY_EMAIL, COMPANY_NUMBER } from "@/common/constants/companyDetails";
import { WhatsappSVG } from "@/common/svgs/svg";
import { whatsappContact } from "@/common/utils/_contactDetails";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { Headphones, Mail, Phone } from "lucide-react";

// components
import Image from "next/image";
import Link from "next/link";

export default function VendorRegistrationBanner(
  props:
    | { asCustomerContactUs: false; onShowForm: () => void }
    | { asCustomerContactUs: true }
) {
  const { asCustomerContactUs } = props;

  return (
    <div className="relative overflow-hidden max-sm:py-52 sm:min-h-[500px]">
      {asCustomerContactUs ? (
        <>        </>
      ) : (
        <Image
          src={""}
          alt="Banner Image"
          height={800}
          width={1500}
          unoptimized={!OPTIMIZE_IMAGE}
          draggable={false}
          decoding="async"
          className="object-center sm:object-center object-cover w-full h-[150%] sm:h-full"
        />
      )}

      <div
        className={`${asCustomerContactUs ? "-translate-y-[calc(50%_-_50px)]" : "max-sm:*:text-center -translate-y-[calc(50%_-_20px)]"} *:max-sm:w-full absolute max-sm:items-center max-sm:w-full w-full  sm:left-0 top-1/2  flex flex-col justify-center px-4 sm:px-12`}
      >
        {asCustomerContactUs ? (
          <>
            <span className="text-2xl sm:text-3xl font-semibold text-center text-charcoal-3">
              How can we help?
            </span>
            <span
              className={`mt-3 text-charcoal-3/90 text-center`}
            >
              Reach out to us here
            </span>
            <span
              className={`text-charcoal-3/90 mt-1 font-medium text-xs text-center`}
            >
              (Available 10AM - 6PM)
            </span>
            <div className="grid grid-cols-1 items-start sm:items-center justify-start gap-4 mt-4 sm:mt-9 max-sm:pt-3">
              <Link
                href={`tel:${COMPANY_NUMBER}`}
                target="_blank"
              >
                <div className="rounded-xl flex items-center justify-center gap-2 bg-ivory-1 py-3.5 font-medium shadow-md text-sienna-1 transition-all duration-300 cursor-pointer">
                  <Headphones
                    width={20}
                    height={20}
                  />
                  <span>Call Us</span>
                </div>
              </Link>
              <Link
                href={whatsappContact()}
                target="_blank"
              >
                <div className="rounded-xl flex items-center justify-center gap-2  bg-ivory-1 py-3.5 font-medium shadow-md text-green-700 transition-all duration-300 cursor-pointer">
                  <WhatsappSVG
                    dimensions={22}
                    className="scale-125"
                  />
                  <span>Whatsapp Us</span>
                </div>
              </Link>
              <Link
                href={`mailto:${COMPANY_EMAIL}`}
                target="_blank"
              >
                <div className="rounded-xl flex items-center justify-center gap-2 bg-ivory-1 py-3.5 font-medium shadow-md text-sienna-1 transition-all duration-300 cursor-pointer">
                  <Mail
                    width={20}
                    height={20}
                  />
                  <span>Email Us</span>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="text-3xl sm:text-4xl font-medium text-charcoal-3">
              Partner with COMPANY_NAME
            </span>
            <span className="text-3xl sm:text-4xl font-medium text-charcoal-3">
              and grow your business
            </span>
            <span className="mt-5 mb-2 sm:mt-4 text-charcoal-3/90 max-w-[270px] sm:max-w-[35dvw]">
              0% commission for the 1st month for new vendors in selected cities
            </span>
            <div
              onClick={props.onShowForm}
              className="rounded-xl mt-7 bg-[#a28159] hover:bg-[#7a6040] !w-fit px-6 py-2.5 shadow-md text-white transition-all duration-300 cursor-pointer"
            >
              Register as Vendor
            </div>
          </>
        )}
      </div>
    </div>
  );
}
