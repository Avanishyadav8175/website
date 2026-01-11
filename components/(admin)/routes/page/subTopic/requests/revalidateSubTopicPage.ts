// constants
import { DOMAIN } from "@/common/constants/environmentVariables";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type RevalidateCache } from "@/common/types/revalidateCache";

export const revalidateSubTopicPage = ({
  categorySlug,
  topicSlug,
  subTopicSlug
}: {
  categorySlug: string;
  topicSlug: string;
  subTopicSlug: string;
}) => {
  return new Promise<RevalidateCache>(async (resolve, reject) => {
    try {
      const response: Response = await fetch(
        `/api/admin/revalidate-cache/sub-topic-page/${categorySlug}/${topicSlug}/${subTopicSlug}`,
        {
          method: "GET",
          headers: { "x-api-key": XApiKey }
        }
      );

      if (response.ok) {
        const responseData: RevalidateCache = await response.json();

        resolve(responseData);
      } else {
        reject(null);
      }
    } catch (error: any) {
      reject(null);
    }
  });
};
