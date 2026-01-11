"use client";
import Input from "@/lib/Forms/Input/Input";
import ProfileSideUI from "./components/ProfileSideUI";
import { useState } from "react";
import {
  Building2,
  Cake,
  Flag,
  Mail,
  MapPin,
  PersonStanding,
  Smartphone
} from "lucide-react";

export default function FrontendDashboardProfile({}: {}) {
  const [showFields, setShowFields] = useState<boolean>(false);
  const userData = [
    {
      label: "Email",
      svg: (
        <Mail
          strokeWidth={1.5}
          width={17}
          height={17}
        />
      ),
      value: "am.something@gmail.com"
    },
    {
      label: "Mobile",
      svg: (
        <Smartphone
          strokeWidth={1.5}
          width={17}
          height={17}
        />
      ),
      value: "+91"
    },
    {
      label: "Address",
      svg: (
        <MapPin
          strokeWidth={1.5}
          width={17}
          height={17}
        />
      ),
      value: "something"
    },
    {
      label: "City",
      svg: (
        <Building2
          strokeWidth={1.5}
          width={17}
          height={17}
        />
      ),
      value: "Kolkata"
    },
    {
      label: "Country",
      svg: (
        <Flag
          strokeWidth={1.5}
          width={17}
          height={17}
        />
      ),
      value: "India"
    },
    {
      label: "Gender",
      svg: (
        <PersonStanding
          strokeWidth={1.5}
          width={17}
          height={17}
        />
      ),
      value: "Male"
    },
    {
      label: "DOB",
      svg: (
        <Cake
          strokeWidth={1.5}
          width={17}
          height={17}
        />
      ),
      value: "19th Sep. 2024"
    }
  ];

  return (
    <ProfileSideUI
      dateOfJoin="19th Sep. 2024"
      name="Kushal Kumar"
      lowerDetail="+91 something"
    >
      {showFields ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:auto-rows-min gap-y-6 gap-x-9 sm:pr-20 *:flex *:flex-col *:justify-start *:items-start *:gap-x-1">
          <Input
            type="text"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            name=""
            labelConfig={{
              label: "Full Name",
              layoutStyle: "flex-col space-y-1 w-full",
              labelStyle: "font-normal"
            }}
            customStyle="text-charcoal-3 outline-none transition-all duration-300 border-b border-charcoal-3/30 hover:border-charcoal-3/50 focus:border-sienna/80 bg-transparent w-full py-1.5 text-lg"
          />

          <Input
            type="number"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            name=""
            labelConfig={{
              label: "Mobile",
              layoutStyle: "flex-col space-y-1 w-full",
              labelStyle: "font-normal"
            }}
            customStyle="outline-none transition-all duration-300 border-b border-charcoal-3/30 hover:border-charcoal-3/50 focus:border-sienna/80 bg-transparent w-full py-1.5 text-lg"
          />

          <Input
            type="email"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            name=""
            labelConfig={{
              label: "Email",
              layoutStyle: "flex-col space-y-1 w-full",
              labelStyle: "font-normal"
            }}
            customStyle="text-charcoal-3 outline-none transition-all duration-300 border-b border-charcoal-3/30 hover:border-charcoal-3/50 focus:border-sienna/80 bg-transparent w-full py-1.5 text-lg"
          />

          <Input
            type="date"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            name=""
            labelConfig={{
              label: "Date of Birth",
              layoutStyle: "flex-col space-y-1 w-full",
              labelStyle: "font-normal"
            }}
            customStyle="outline-none text-charcoal-3 transition-all duration-300 border-b border-charcoal-3/30 hover:border-charcoal-3/50 focus:border-sienna/80 bg-transparent w-full py-1.5 text-lg"
          />

          <Input
            type="text"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            name=""
            labelConfig={{
              label: "Country",
              layoutStyle: "flex-col space-y-1 w-full",
              labelStyle: "font-normal"
            }}
            customStyle="text-charcoal-3 outline-none transition-all duration-300 border-b border-charcoal-3/30 hover:border-charcoal-3/50 focus:border-sienna/80 bg-transparent w-full py-1.5 text-lg"
          />

          <Input
            type="text"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            name=""
            labelConfig={{
              label: "City",
              layoutStyle: "flex-col space-y-1 w-full",
              labelStyle: "font-normal"
            }}
            customStyle="text-charcoal-3 outline-none transition-all duration-300 border-b border-charcoal-3/30 hover:border-charcoal-3/50 focus:border-sienna/80 bg-transparent w-full py-1.5 text-lg"
          />

          <Input
            type="text"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            name=""
            labelConfig={{
              label: "Address",
              layoutStyle: "flex-col space-y-1 w-full sm:col-span-2",
              labelStyle: "font-normal"
            }}
            customStyle="text-charcoal-3 outline-none transition-all duration-300 border-b border-charcoal-3/30 hover:border-charcoal-3/50 focus:border-sienna/80 bg-transparent w-full py-1.5 text-lg"
          />

          <div className="flex items-center justify-start !gap-x-4 !flex-row mt-5">
            <div
              onClick={() => setShowFields((prev) => true)}
              className="bg-sienna text-white flex items-center justify-center gap-1.5 rounded-md px-8 py-2 w-fit cursor-pointer transition-all duration-300 hover:bg-sienna-2"
            >
              Confirm
            </div>
            <div
              onClick={() => setShowFields((prev) => false)}
              className=" flex items-center justify-center gap-1.5 rounded-md px-3 py-2 w-fit cursor-pointer transition-all duration-300 hover:underline hover:underline-offset-2"
            >
              Cancel
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-1.5 ">
          <div className="grid grid-cols-[24px_auto_1fr] gap-x-2 gap-y-6 sm:gap-y-4 items-center">
            {userData.map(({ label, svg, value }, index) => (
              <>
                {svg}
                <span className="font-medium">{label}:</span>
                <span className="pl-9">{value}</span>
              </>
            ))}
          </div>
          <div
            onClick={() => setShowFields((prev) => true)}
            className="bg-sienna text-white flex items-center justify-center gap-1.5 rounded-md mt-7 mb-1 px-8 py-1.5 w-fit cursor-pointer transition-all duration-300 hover:bg-sienna-2"
          >
            Edit
          </div>
        </div>
      )}
    </ProfileSideUI>
  );
}
