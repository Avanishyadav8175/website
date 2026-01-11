// icons
import { Trash2 } from "lucide-react";

// components
import Input from "@/lib/Forms/Input/Input";

export default function RedirectListItem({
  index,
  url,
  label,
  onChangeUrl,
  onDeleteUrl
}: {
  index: number;
  url: string;
  label?: string;
  onChangeUrl: (newUrl: string) => void;
  onDeleteUrl: () => void;
}) {
  return (
    <section className="flex items-center justify-center gap-5 w-full">
      <span>{`${index + 1}.`}</span>
      <Input
        type="text"
        name={`redirectListItem-${index}`}
        className="w-full"
        isRequired={false}
        placeholder="url"
        customValue={{
          value: url,
          setValue: (newUrl) => {
            onChangeUrl(
              newUrl.startsWith("https://www.COMPANY_NAME.com")
                ? newUrl.slice(24)
                : newUrl
            );
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <div
        onClick={onDeleteUrl}
        className="rounded-full text-red-600 cursor-pointer transition-all duration-300"
      >
        <Trash2
          strokeWidth={1.5}
          width={20}
          height={20}
        />
      </div>
    </section>
  );
}
