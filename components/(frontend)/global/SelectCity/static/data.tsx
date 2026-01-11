import Image from "next/image";
import { LocalCityDocument } from "./types";
import NoidaSVG from "@/public/symbols/cities/noida.svg";
import GurgaonSVG from "@/public/symbols/cities/gurgaon.svg";
import GoaSVG from "@/public/symbols/cities/goa.svg";
import DelhiSVG from "@/public/symbols/cities/delhi.svg";
import BangaloreSVG from "@/public/symbols/cities/bangalore.svg";
import MumbaiSVG from "@/public/symbols/cities/mumbai.svg";
import UdaipurSVG from "@/public/symbols/cities/udaipur.svg";
import { OPTIMIZE_IMAGE } from "@/config/image";

export const dummyCitiesData: LocalCityDocument[] = [
  {
    _id: "1",
    name: "Bangalore",
    defaultPincode: 560001,
    pincodeDistinguisher: 5600,
    image: OPTIMIZE_IMAGE ? (
      <Image
        src={BangaloreSVG.src}
        alt="City Icon"
        title="Bangalore"
        width={200}
        height={200}
        priority
        unoptimized
        decoding="async"
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={BangaloreSVG.src}
        alt="City Icon"
        title="Bangalore"
        width={200}
        height={200}
        decoding="async"
        draggable={false}
      />
    )
  },
  {
    _id: "2",
    name: "Noida",
    defaultPincode: 201301,
    pincodeDistinguisher: 2013,
    image: OPTIMIZE_IMAGE ? (
      <Image
        src={DelhiSVG.src}
        alt="City Icon"
        title="Noida"
        width={200}
        height={200}
        priority
        unoptimized
        decoding="async"
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={DelhiSVG.src}
        alt="City Icon"
        title="Noida"
        width={200}
        height={200}
        decoding="async"
        draggable={false}
      />
    )
  },
  {
    _id: "3",
    name: "Pune",
    defaultPincode: 411001,
    pincodeDistinguisher: 4110,
    image: OPTIMIZE_IMAGE ? (
      <Image
        src={UdaipurSVG.src}
        alt="City Icon"
        title="Pune"
        width={200}
        height={200}
        priority
        unoptimized
        decoding="async"
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={UdaipurSVG.src}
        alt="City Icon"
        title="Pune"
        width={200}
        height={200}
        decoding="async"
        draggable={false}
      />
    )
  },
  {
    _id: "4",
    name: "Chennai",
    defaultPincode: 600001,
    pincodeDistinguisher: 6000,
    image: OPTIMIZE_IMAGE ? (
      <Image
        src={GoaSVG.src}
        alt="City Icon"
        title="Chennai"
        width={200}
        height={200}
        priority
        unoptimized
        decoding="async"
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={GoaSVG.src}
        alt="City Icon"
        title="Chennai"
        width={200}
        height={200}
        decoding="async"
        draggable={false}
      />
    )
  },
  {
    _id: "5",
    name: "Kolkata",
    defaultPincode: 700001,
    pincodeDistinguisher: 7000,
    image: OPTIMIZE_IMAGE ? (
      <Image
        src={GoaSVG.src}
        alt="City Icon"
        title="Kolkata"
        width={200}
        height={200}
        priority
        unoptimized
        decoding="async"
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={GoaSVG.src}
        alt="City Icon"
        title="Kolkata"
        width={200}
        height={200}
        decoding="async"
        draggable={false}
      />
    )
  },
  {
    _id: "6",
    name: "Mumbai",
    defaultPincode: 400001,
    pincodeDistinguisher: 4000,
    image: OPTIMIZE_IMAGE ? (
      <Image
        src={MumbaiSVG.src}
        alt="City Icon"
        title="Mumbai"
        width={200}
        height={200}
        priority
        unoptimized
        decoding="async"
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={MumbaiSVG.src}
        alt="City Icon"
        title="Mumbai"
        width={200}
        height={200}
        decoding="async"
        draggable={false}
      />
    )
  },
  {
    _id: "7",
    name: "Ahmedabad",
    defaultPincode: 380001,
    pincodeDistinguisher: 3800,
    image: OPTIMIZE_IMAGE ? (
      <Image
        src={UdaipurSVG.src}
        alt="City Icon"
        title="Ahmedabad"
        width={200}
        height={200}
        priority
        unoptimized
        decoding="async"
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={UdaipurSVG.src}
        alt="City Icon"
        title="Ahmedabad"
        width={200}
        height={200}
        decoding="async"
        draggable={false}
      />
    )
  },
  {
    _id: "8",
    name: "Gurgaon",
    defaultPincode: 122001,
    pincodeDistinguisher: 1220,
    image: OPTIMIZE_IMAGE ? (
      <Image
        src={GurgaonSVG.src}
        alt="City Icon"
        title="Gurgaon"
        width={200}
        height={200}
        priority
        unoptimized
        decoding="async"
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={GurgaonSVG.src}
        alt="City Icon"
        title="Gurgaon"
        width={200}
        height={200}
        decoding="async"
        draggable={false}
      />
    )
  },
  {
    _id: "9",
    name: "Hyderabad",
    defaultPincode: 500001,
    pincodeDistinguisher: 5000,
    image: OPTIMIZE_IMAGE ? (
      <Image
        src={DelhiSVG.src}
        alt="City Icon"
        title="Hyderabad"
        width={200}
        height={200}
        priority
        unoptimized
        decoding="async"
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={DelhiSVG.src}
        alt="City Icon"
        title="Hyderabad"
        width={200}
        height={200}
        decoding="async"
        draggable={false}
      />
    )
  },
  {
    _id: "10",
    name: "Delhi",
    defaultPincode: 110001,
    pincodeDistinguisher: 1100
  },
  {
    _id: "11",
    name: "Jaipur",
    defaultPincode: 302001,
    pincodeDistinguisher: 3020
  },
  {
    _id: "12",
    name: "Chandigarh",
    defaultPincode: 160001,
    pincodeDistinguisher: 1600
  },
  {
    _id: "13",
    name: "Bhopal",
    defaultPincode: 462001,
    pincodeDistinguisher: 4620
  },
  {
    _id: "14",
    name: "Indore",
    defaultPincode: 452001,
    pincodeDistinguisher: 4520
  },
  {
    _id: "15",
    name: "Lucknow",
    defaultPincode: 226001,
    pincodeDistinguisher: 2260
  },
  {
    _id: "16",
    name: "Kanpur",
    defaultPincode: 208001,
    pincodeDistinguisher: 2080
  },
  {
    _id: "17",
    name: "Nagpur",
    defaultPincode: 440001,
    pincodeDistinguisher: 4400
  },
  {
    _id: "18",
    name: "Surat",
    defaultPincode: 395001,
    pincodeDistinguisher: 3950
  },
  {
    _id: "19",
    name: "Vadodara",
    defaultPincode: 390001,
    pincodeDistinguisher: 3900
  },
  {
    _id: "20",
    name: "Coimbatore",
    defaultPincode: 641001,
    pincodeDistinguisher: 6410
  },
  {
    _id: "21",
    name: "Madurai",
    defaultPincode: 625001,
    pincodeDistinguisher: 6250
  },
  {
    _id: "22",
    name: "Visakhapatnam",
    defaultPincode: 530001,
    pincodeDistinguisher: 5300
  },
  {
    _id: "23",
    name: "Mangalore",
    defaultPincode: 575001,
    pincodeDistinguisher: 5750
  },
  {
    _id: "24",
    name: "Thane",
    defaultPincode: 400601,
    pincodeDistinguisher: 4006
  },
  {
    _id: "25",
    name: "Navi Mumbai",
    defaultPincode: 400701,
    pincodeDistinguisher: 4007
  },
  {
    _id: "26",
    name: "Amritsar",
    defaultPincode: 143001,
    pincodeDistinguisher: 1430
  },
  {
    _id: "27",
    name: "Shimla",
    defaultPincode: 171001,
    pincodeDistinguisher: 1710
  },
  {
    _id: "28",
    name: "Dehradun",
    defaultPincode: 248001,
    pincodeDistinguisher: 2480
  },
  {
    _id: "29",
    name: "Haridwar",
    defaultPincode: 249401,
    pincodeDistinguisher: 2494
  },
  {
    _id: "30",
    name: "Ranchi",
    defaultPincode: 834001,
    pincodeDistinguisher: 8340
  },
  {
    _id: "31",
    name: "Jamshedpur",
    defaultPincode: 831001,
    pincodeDistinguisher: 8310
  },
  {
    _id: "32",
    name: "Raipur",
    defaultPincode: 492001,
    pincodeDistinguisher: 4920
  },
  {
    _id: "33",
    name: "Bilaspur",
    defaultPincode: 495001,
    pincodeDistinguisher: 4950
  },
  {
    _id: "34",
    name: "Guwahati",
    defaultPincode: 781001,
    pincodeDistinguisher: 7810
  },
  {
    _id: "35",
    name: "Agra",
    defaultPincode: 282001,
    pincodeDistinguisher: 2820
  },
  {
    _id: "36",
    name: "Aligarh",
    defaultPincode: 202001,
    pincodeDistinguisher: 2020
  },
  {
    _id: "37",
    name: "Srinagar",
    defaultPincode: 190001,
    pincodeDistinguisher: 1900
  },
  {
    _id: "38",
    name: "Jammu",
    defaultPincode: 180001,
    pincodeDistinguisher: 1800
  },
  {
    _id: "39",
    name: "Udaipur",
    defaultPincode: 313001,
    pincodeDistinguisher: 3130
  },
  {
    _id: "40",
    name: "Jodhpur",
    defaultPincode: 342001,
    pincodeDistinguisher: 3420
  },
  {
    _id: "41",
    name: "Bhubaneswar",
    defaultPincode: 751001,
    pincodeDistinguisher: 7510
  },
  {
    _id: "42",
    name: "Cuttack",
    defaultPincode: 753001,
    pincodeDistinguisher: 7530
  },
  {
    _id: "43",
    name: "Kochi",
    defaultPincode: 682001,
    pincodeDistinguisher: 6820
  },
  {
    _id: "44",
    name: "Trivandrum",
    defaultPincode: 695001,
    pincodeDistinguisher: 6950
  },
  {
    _id: "45",
    name: "Kollam",
    defaultPincode: 691001,
    pincodeDistinguisher: 6910
  },
  {
    _id: "46",
    name: "Tiruchirappalli",
    defaultPincode: 620001,
    pincodeDistinguisher: 6200
  },
  {
    _id: "47",
    name: "Salem",
    defaultPincode: 636001,
    pincodeDistinguisher: 6360
  },
  {
    _id: "48",
    name: "Tirunelveli",
    defaultPincode: 627001,
    pincodeDistinguisher: 6270
  },
  {
    _id: "49",
    name: "Rourkela",
    defaultPincode: 769001,
    pincodeDistinguisher: 7690
  },
  {
    _id: "50",
    name: "Jabalpur",
    defaultPincode: 482001,
    pincodeDistinguisher: 4820
  }
];
