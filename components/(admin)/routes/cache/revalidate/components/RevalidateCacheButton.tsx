// hooks
import { useToast } from "@/components/ui/use-toast";

// types
import { ReactNode } from "react";

export default function RevalidateCacheButton({
  type,
  label,
  icon,
  onClick
}: {
  type: "cache" | "sitemap";
  label: string;
  icon: ReactNode;
  onClick: () => Promise<boolean>;
}) {
  // hooks
  const { toast } = useToast();

  // event handlers
  const handleClick = () => {
    onClick()
      .then(() => {
        toast({
          variant: "success",
          title: "Success",
          description: `Successfully Revalidate ${label} ${type === "cache" ? "Cache" : "Sitemap"}`
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: `Couldn't Revalidate ${label} ${type === "cache" ? "Cache" : "Sitemap"}`
        });
      });
  };

  return (
    <div
      className="flex items-center justify-center bg-sienna-2 text-white p-2.5 min-w-44 px-5 gap-2 rounded-lg duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}
