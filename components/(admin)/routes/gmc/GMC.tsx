import { CloudDownload } from "lucide-react";
import DownloadGMCList from "./components/DownloadGMCList";


export default function GMC() {
  return (
    <section className="flex items-center justify-center w-full h-full">
      <section className="flex flex-col items-center gap-4">
        <section className="flex items-center justify-start gap-5">
          <DownloadGMCList
            label="Download Products Text File"
            icon={
              <CloudDownload
                width={26}
                height={26}
              />
            }
          />
        </section>
      </section>
    </section>
  );
}
