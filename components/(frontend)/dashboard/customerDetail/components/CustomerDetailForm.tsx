// libraries
import moment from "moment";

// regular expression
import { REGEX_TEST } from "@/common/constants/regex";

// hooks
import { useEffect, useState } from "react";
import { useCustomerProfile } from "@/hooks/useCustomerProfile";
import { useToast } from "@/components/ui/use-toast";

// components
import CustomerDetailFormMobile from "./CustomerDetailFormMobile";
import CustomerDetailFormMail from "./CustomerDetailFormMail";
import Input from "@/lib/Forms/Input/Input";

// types
import { Availability, Verified } from "../type/type";
import { useAppStates } from "@/hooks/useAppState/useAppState";

export default function CustomerDetailForm({
  onCloseForm
}: {
  onCloseForm: () => void;
}) {
  // hooks
  const {
    profile: {
      data: { detail }
    }
  } = useAppStates();
  const {
    detail: { onChange }
  } = useCustomerProfile();

  const { toast } = useToast();

  // states
  const [name, setName] = useState<string>(detail?.name || "");
  const [mobileNumber, setMobileNumber] = useState<string>(
    detail?.mobileNumber ? detail.mobileNumber : "+91-"
  );
  const [mail, setMail] = useState<string>(detail?.mail || "");
  const [gender, setGender] = useState<"" | "male" | "female" | "others">(
    detail?.gender || ""
  );
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    detail?.dateOfBirth ? moment(detail?.dateOfBirth).format("YYYY-MM-DD") : ""
  );

  const [isMobileVerified, setIsMobileVerified] =
    useState<Verified>("not-checked");
  const [isMobileAvailable, setIsMobileAvailable] =
    useState<Availability>("not-checked");
  const [isMailVerified, setIsMailVerified] = useState<Verified>("not-checked");
  const [isMailAvailable, setIsMailAvailable] =
    useState<Availability>("not-checked");

  // variables
  const isMobileNumberChanged = (() => {
    const [countryCode, mobile] = mobileNumber.split("-");

    return (
      Boolean(countryCode) &&
      mobile?.length === 10 &&
      mobileNumber !== detail?.mobileNumber
    );
  })();

  const isMailChanged = REGEX_TEST.EMAIL.test(mail) && mail !== detail?.mail;

  // event handlers
  const handleUpdateDetail = () => {
    const [countryCode, mobile] = mobileNumber.split("-");

    if (!name) {
      toast({
        title: "Name is Required",
        description: "Please Add Your Name",
        variant: "warning"
      });

      return;
    }

    if (!mobile && !mail) {
      toast({
        title: "Mobile Number Or Email is Required",
        description: "Please Add Your Mobile Number Or Email",
        variant: "warning"
      });

      return;
    }

    if (isMobileNumberChanged) {
      if (detail?.mail && isMobileAvailable !== "available") {
        toast({
          title: "Mobile Number Not Available",
          description: `Your Mobile Number ${isMobileAvailable === "not-checked" ? "Might Not Be" : "Is Not"} Available`,
          variant: "warning"
        });

        return;
      }

      if (!detail?.mail && isMobileVerified !== "verified") {
        toast({
          title: "Mobile Number Not Verified",
          description: "Please Verify Your Mobile Number",
          variant: "warning"
        });

        return;
      }
    }

    if (mail && !REGEX_TEST.EMAIL.test(mail)) {
      toast({
        title: "Invalid Mail",
        description: "Please Correct Your E-Mail Address",
        variant: "warning"
      });

      return;
    }

    // if (isMailChanged) {
    //   if (detail?.mobileNumber && isMailAvailable !== "available") {
    //     toast({
    //       title: "Mail Not Available",
    //       description: `Your Mail ${isMailAvailable === "not-checked" ? "Might Not Be" : "Is Not"} Available`,
    //       variant: "warning"
    //     });

    //     return;
    //   }

    //   if (!detail?.mobileNumber && isMailVerified !== "verified") {
    //     toast({
    //       title: "Mail Not Verified",
    //       description: "Please Verify Your E-Mail Address",
    //       variant: "warning"
    //     });

    //     return;
    //   }
    // }

    onChange({
      name,
      ...(mobile ? { mobileNumber } : {}),
      ...(mail ? { mail } : {}),
      ...(gender !== "" ? { gender } : {}),
      ...(dateOfBirth ? { dateOfBirth } : {})
    });

    onCloseForm();
  };

  // side effects
  useEffect(() => {
    setName(detail?.name || "User");
    setMobileNumber(detail?.mobileNumber ? detail.mobileNumber : "+91-");
    setMail(detail?.mail || "");
    setGender(detail?.gender || "");
    setDateOfBirth(
      detail?.dateOfBirth
        ? moment(detail?.dateOfBirth).format("YYYY-MM-DD")
        : ""
    );
  }, [detail]);

  const customInputStyle =
    "outline-none text-charcoal-3/90 transition-all duration-300 bg-ivory-2/80 rounded-xl w-full py-2.5 px-3.5 text-lg hover:bg-ivory-2 focus:bg-sienna-1/10 focus:ring-1 focus:ring-sienna-1/50 focus:ring-offset-2";

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-x-14 lg:gap-y-8">
        <Input
          customStyle={customInputStyle}
          type="text"
          name="name"
          labelConfig={{
            label: "Full Name",
            layoutStyle: "flex-col space-y-1.5 w-full lg:col-span-2",
            labelStyle: "font-medium"
          }}
          isRequired
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: name,
            setValue: setName
          }}
        />
        <CustomerDetailFormMobile
          prevMobileNumber={detail?.mobileNumber || "+91-"}
          mobileNumber={mobileNumber}
          canCheckMobileAvailability={isMobileNumberChanged}
          isAvailable={isMobileAvailable}
          isVerified={isMobileVerified}
          onChangeMobileNumber={setMobileNumber}
          onChangeIsAvailable={setIsMobileAvailable}
          onChangeIsVerified={setIsMobileVerified}
          className={customInputStyle}
        />
        <CustomerDetailFormMail
          prevMail={detail?.mail || ""}
          mail={mail}
          canCheckMailAvailability={isMailChanged}
          isAvailable={isMailAvailable}
          isVerified={isMailVerified}
          onChangeMail={setMail}
          onChangeIsAvailable={setIsMailAvailable}
          onChangeIsVerified={setIsMailVerified}
          className={customInputStyle}
        />
        {/* <Input
          customStyle={customInputStyle}
          type="dropdown"
          name="gender"
          labelConfig={{
            label: "Gender",
            layoutStyle: "flex-col space-y-1.5 w-full",
            labelStyle: "font-medium"
          }}
          isRequired={false}
          errorCheck={false}
          validCheck={false}
          nullOption
          customInitialValuePlaceholderLabel="Select Gender"
          options={[
            {
              label: "Male",
              value: "male"
            },
            {
              label: "Female",
              value: "female"
            },
            {
              label: "Others",
              value: "others"
            }
          ]}
          customValue={{
            value: gender,
            setValue: (newGender) => {
              setGender(newGender as "male" | "female" | "others");
            }
          }}
        />
        <Input
          customStyle={customInputStyle}
          type="date"
          name=""
          labelConfig={{
            label: "Date of Birth",
            layoutStyle: "flex-col space-y-1.5 w-full",
            labelStyle: "font-medium"
          }}
          isRequired={false}
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: dateOfBirth,
            setValue: setDateOfBirth
          }}
        /> */}
      </section>

      <div className="flex items-center justify-start !gap-x-4 !flex-row mt-7 lg:mt-10">
        <div
          onClick={handleUpdateDetail}
          className="bg-sienna text-white flex items-center justify-center gap-1.5 rounded-xl lg:rounded-md px-8 py-2.5 lg:py-2 w-fit cursor-pointer transition-all duration-300 hover:bg-sienna-2"
        >
          Confirm
        </div>
        <div
          onClick={onCloseForm}
          className=" flex items-center justify-center gap-1.5 rounded-md px-3 py-2 w-fit cursor-pointer transition-all duration-300 hover:underline hover:underline-offset-2"
        >
          Cancel
        </div>
      </div>
    </>
  );
}
