// constants
import { DOMAIN } from "../constants/environmentVariables";

// types
import { type Metadata, type ResolvingMetadata } from "next";
import { type SEOMetaDocument } from "../types/documentation/nestedDocuments/seoMeta";

export const createMetadata = async ({
  path,
  meta,
  images,
  parent
}: {
  path: string;
  meta: SEOMetaDocument;
  images: string[];
  parent: ResolvingMetadata;
}): Promise<Metadata> => {
  const metaParent = await parent;
  const absolutePath = `${DOMAIN}/${path}`;
  const url = new URL(absolutePath);

  return {
    title: meta?.title || "",
    keywords: [...(meta?.tags || []), ...(metaParent?.keywords || [])],
    description: meta?.description || "",
    bookmarks: absolutePath,
    openGraph: {
      ...(metaParent?.openGraph || {}),
      title: meta?.title || "",
      description: meta?.description || "",
      url: absolutePath,
      images: images || []
    },
    alternates: {
      canonical: url
    },
    metadataBase: url
  };
};
