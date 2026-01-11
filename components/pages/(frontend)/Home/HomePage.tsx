"use client";

import HomePageTitleSpacing from "./spacings/HomePageTitleSpacing";
import HomePageContentSpacing from "./spacings/HomePageContentSpacing";
import { HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { RenderHomepageLayout } from "./components/RenderHomepageLayout";
import { LocationProvider } from "@/hooks/useLocation/useLocation";
import { useEffect } from "react";
import { HomepageLayoutStructure } from "./static/types";
import { getHomepageStructure } from "./static/utils";

export default function FrontendHomePage(
  props: {
    data: HomepageLayoutDocument[];
    backlink?: HomepageLayoutStructure[];
    inFrontend?: boolean;
  } & (
    | { useIds?: false }
    | {
        useIds: true;
        onClickEdit: (id: string) => void;
        onClickDisable: (id: string) => void;
        onClickDelete: (id: string) => void;
      }
  )
) {
  const { data, backlink, useIds, inFrontend } = props;

  let homepageData: HomepageLayoutStructure[] = [];
  if (inFrontend) homepageData = getHomepageStructure(data);
  else homepageData = backlink || [];

  return (
    <LocationProvider>
      <div className="h-6" />
      {homepageData.map((slice, index) => {
        const { type, layout, _id, tag } = slice;
        if (type === "title")
          return (
            <HomePageTitleSpacing
              title={slice.data}
              leftAlign={slice.leftAlign || false}
              key={index}
              id={useIds ? _id : undefined}
              showActions={useIds || false}
              onClickEdit={useIds ? props.onClickEdit : () => {}}
              onClickDisable={useIds ? props.onClickDisable : () => {}}
              onClickDelete={useIds ? props.onClickDelete : () => {}}
              layoutNumber={index + 1}
            />
          );

        return (
          <HomePageContentSpacing
            key={index}
            extraSpacing={slice.extraSpacing || false}
            id={useIds ? _id : undefined}
            showActions={useIds || false}
            onClickEdit={useIds ? props.onClickEdit : () => {}}
            onClickDisable={useIds ? props.onClickDisable : () => {}}
            onClickDelete={useIds ? props.onClickDelete : () => {}}
            layoutNumber={index + 1}
          >
            <RenderHomepageLayout
              layout={layout}
              type={tag === "title" ? "text" : tag}
              inAdmin={useIds ? true : false}
            />
          </HomePageContentSpacing>
        );
      })}
      <div className="max-sm:h-6" />
    </LocationProvider>
  );
}
