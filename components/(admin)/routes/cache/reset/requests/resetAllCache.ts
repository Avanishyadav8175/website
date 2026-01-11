// constants
import { DOMAIN } from "@/common/constants/environmentVariables";
import { XApiKey } from "@/common/constants/apiKey";

export const resetAllCache = () => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
       console.log(DOMAIN) ;
      const response: Response = await fetch(
        `/api/admin/reset-cache`,
        {
          method: "GET",
          headers: { "x-api-key": XApiKey }
        }
      );
      
      if (response.ok) {
        const responseData: boolean = await response.json();

        resolve(responseData);
      } else {
        reject(null);
      }
    } catch (error: any) {
      reject(null);
    }
  });
};
