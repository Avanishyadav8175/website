// // config
// import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// // requests
// import { fetchLocationData } from "@/request/location/locationData";

// // components
// import LocationDataAssign from "./LocationDataAssign";

// // types
// import { type CityDocument } from "@/common/types/documentation/presets/city";
// import { type PincodeDocument } from "@/common/types/documentation/presets/pincode";

// async function getLocationData() {
//   try {
//     const response = await fetchLocationData(RENDERING_STRATEGY);

//     if (response?.data) {
//       return response.data as {
//         cities: CityDocument[];
//         pincodes: PincodeDocument[];
//       };
//     }
//   } catch (error) {
//     return {
//       cities: [],
//       pincodes: []
//     };
//   }

//   return {
//     cities: [],
//     pincodes: []
//   };
// }

// export default async function LocationDataLoader() {
//   const locationData = await getLocationData();

//   return <LocationDataAssign locationData={locationData} />;
// }

export default function LocationDataLoader() {
  return <div>LocationDataLoader</div>;
}
