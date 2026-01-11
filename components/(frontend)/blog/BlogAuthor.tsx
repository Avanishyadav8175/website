// icons
import { UserRound } from "lucide-react";

export default function BlogAuthor({ name }: { name: string }) {
  return (
    <>
      <div className="flex items-center justify-start gap-1.5">
        <UserRound
          strokeWidth={1.5}
          width={18}
          className="mr-1"
        />
        <span>Author:</span>
      </div>
      <div className="font-medium ml-7 sm:ml-1">{name}</div>
    </>
  );
}
