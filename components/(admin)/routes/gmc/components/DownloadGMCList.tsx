// hooks
import { XApiKey } from "@/common/constants/apiKey";
import { DOMAIN } from "@/common/constants/domain";
import { useToast } from "@/components/ui/use-toast";

// types
import { ReactNode, useState } from "react";

export default function DownloadGMCList({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) {
  // hooks
  const { toast } = useToast();
  const [disabled, setDisabled] = useState<boolean>(false);

  // event handlers
  const handleClick = () => {
    setDisabled(true);
    fetch(
      `${DOMAIN}/api/frontend/merchant-center`,
      {
        method: "GET",
        headers: { "x-api-key": XApiKey }
      }
    )
      .then(async (res) => {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        console.log({ url });
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'products.txt';
        console.log({ link });
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setDisabled(false);
      })
      .catch((err) => {
        console.error(err);
        setDisabled(false);
      })
  };

  return (
    <div
      className={`flex  text-white font-medium text-lg p-3 px-5 items-center justify-center gap-2 rounded-lg transition-all duration-300  ${disabled ? "bg-sienna-2 opacity-60" : "bg-sienna-2 cursor-pointer"}`}
      onClick={disabled ? () => { } : handleClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
