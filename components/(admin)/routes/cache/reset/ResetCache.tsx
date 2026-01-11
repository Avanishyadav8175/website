// icons
import { CloudLightning, DatabaseZap, ListRestart, Zap } from "lucide-react";

// requests
import { resetAllCache } from "./requests/resetAllCache";
import { resetRedisCache } from "./requests/resetRedisCache";
import { resetNextCache } from "./requests/resetNextCache";
import { resetCloudfrontCache } from "./requests/resetCloudfrontCache";

// components
import ResetCacheButton from "./components/ResetCacheButton";

export default function ResetCache() {
  return (
    <section className="flex items-center justify-center w-full h-full">
      <section className="flex flex-col items-center gap-4">
        {/* <span className={"text-3xl underline"}>Reset Cache</span> */}
        <section className="flex items-center justify-start gap-5">
          <ResetCacheButton
            label="Full Website Reset"
            icon={
              <ListRestart
                width={26}
                height={26}
              />
            }
            onClick={resetAllCache}
          />
          {/* <ResetCacheButton
            label="Redis"
            icon={
              <DatabaseZap
                width={40}
                height={40}
              />
            }
            onClick={resetRedisCache}
          />
          <ResetCacheButton
            label="Next"
            icon={
              <Zap
                width={40}
                height={40}
              />
            }
            onClick={resetNextCache}
          />
          <ResetCacheButton
            label="Cloudfront"
            icon={
              <CloudLightning
                width={40}
                height={40}
              />
            }
            onClick={resetCloudfrontCache}
          /> */}
        </section>
      </section>
    </section>
  );
}
