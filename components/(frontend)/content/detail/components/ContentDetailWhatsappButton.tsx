import { DOMAIN } from "@/common/constants/domain";
import { WEBSITE_NAME } from "@/common/constants/environmentVariables";
import { WhatsappSVG } from "@/common/svgs/svg";
import { whatsappContact } from "@/common/utils/_contactDetails";
import { getLocalStorage } from "@/common/utils/storage/local";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";

function ContentDetailWhatsappButton() {
  const currPath = usePathname();
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  const [data, setData] = useState<object>({});
  const [msg, setMsg] = useState<string>("");

  const url = `${DOMAIN}${currPath}`;

  useEffect(() => {
    setTimeout(() => {
      setData((prev) => getLocalStorage({ key: "whatsapp" }));
    }, 1000);
  }, [url, selectedCity, currPath]);

  useEffect(() => {
    const whatsappMessage =
      typeof data === "object" && data && Object?.keys(data)?.length > 0
        // @ts-expect-error: Somew random description
        ? `Hi, I'm interested in the following product from ${WEBSITE_NAME}:\nName: ${data?.name || ""}\nPrice: ${data?.price || "-"}\nCity: ${data?.city || "__Not selected__"}\n\n${data?.link || ""}`
        : "";
    setMsg((prev) => whatsappMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Link
      href={whatsappContact(msg)}
      target="_blank"
      prefetch={false}
    >
      <div
        className={`cursor-pointer w-full flex items-center justify-center gap-2.5 relative group overflow-hidden bg-green-700 text-ivory-1 p-3 sm:py-3.5 rounded-lg sm:rounded-xl text-lg text-center whitespace-nowrap transition-all duration-300`}
      >
        <WhatsappSVG
          dimensions={26}
          className="translate-y-px"
        />
        <span className="text-base max-sm:hidden">Order on Whatsapp</span>
        <span className="text-base sm:hidden">Whatsapp</span>
      </div>
    </Link>
  );
}

export default memo(ContentDetailWhatsappButton);
