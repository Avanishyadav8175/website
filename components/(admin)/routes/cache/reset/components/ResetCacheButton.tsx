// hooks
import { useToast } from "@/components/ui/use-toast";

// types
import { ReactNode, useState } from "react";

export default function ResetCacheButton({
  label,
  icon,
  onClick
}: {
  label: string;
  icon: ReactNode;
  onClick: () => Promise<boolean>;
}) {
  // hooks
  const { toast } = useToast();
  const [disabled, setDisabled] = useState<boolean>(false);

  // event handlers
  const handleClick = () => {
    setDisabled(true);
    onClick()
      .then(() => {
        toast({
          variant: "success",
          title: "Success",
          description: `Successfully reset ${label} Cache`
        });
        setDisabled(false);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: `Couldn't Reset ${label} Cache`
        });
        setDisabled(false);
      });
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
