// constants
import { DOMAIN } from "@/common/constants/environmentVariables";
import { XApiKey } from "@/common/constants/apiKey";

export const revalidateSubTopicsSitemap = () => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const response: Response = await fetch(
        `${DOMAIN}/api/admin/revalidate-sitemap/sub-topics`,
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
