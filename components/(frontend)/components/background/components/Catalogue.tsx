// utils
import { memo } from "react";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type CatalogueDocument } from "@/common/types/documentation/presets/catalogue";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function Catalogue({
  catalogue: { name, path, icon },
  onClick
}: {
  catalogue: CatalogueDocument;
  onClick: () => void;
}) {
  const { alt, url } = icon as ImageDocument;

  return (
    <Link
      href={path}
      prefetch={false}
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2"
    >
      <Image
        src={url}
        alt={alt || name}
        width={120}
        height={120}
        className="rounded-md"
      />
      <span className="line-clamp-1">{name}</span>
    </Link>
  );
}

export default memo(Catalogue);
