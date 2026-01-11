"use client";

// constants
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// components
import { GoogleAnalytics } from "@next/third-parties/google";

import { HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { HomepageLayoutStructure } from "./static/types";
import { getHomepageStructure } from "./static/utils";
import BentoHomepageTitleSpacing from "./spacings/BentoHomepageTitleSpacing";
import HomePageContentSpacing from "./spacings/HomePageContentSpacing";
import { RenderHomepageLayout } from "./components/RenderHomepageLayout";
import { BASE_HOME_BG_COLOR } from "./static/pallette";
import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";
import { DOMAIN } from "@/common/constants/domain";
import { QADocument } from "@/common/types/documentation/nestedDocuments/qa";

export default function BentoHomepage(
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

  const faqsInPage = inFrontend
    ? homepageData
        .filter(({ tag }) => tag === "faq")
        .map(({ layout }) => {
          const faqs = (layout.faq as QADocument[])?.filter(
            (x) => x !== undefined
          );
          if (faqs) {
            const faqData = faqs.map(({ question, answer }) => ({
              q: question,
              a: answer
            }));

            return faqData;
          }
        })
        .filter((x) => x !== undefined)
        .reduce((acc, val) => (acc = [...acc, ...val]), [])
    : [];

  return (
    <>
      <div className={`h-5 sm:h-6 w-full ${BASE_HOME_BG_COLOR}`} />
      {homepageData.map((slice, index) => {
        const { type, layout, _id, tag, customBG } = slice;

        if (type === "title")
          return (
            <BentoHomepageTitleSpacing
              title={slice.data}
              subtitle={slice.subtitle}
              leftAlign={slice.leftAlign || false}
              key={index}
              id={useIds ? _id : undefined}
              showActions={useIds || false}
              onClickEdit={useIds ? props.onClickEdit : () => {}}
              onClickDisable={useIds ? props.onClickDisable : () => {}}
              onClickDelete={useIds ? props.onClickDelete : () => {}}
              layoutNumber={index + 1}
              customBG={customBG}
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
            isContent={tag === "content" ? true : false}
            excludeBox={tag === "banner" ? true : false}
            noPadding={
              tag === "category" &&
              layout.category &&
              layout.category.scrollable
                ? true
                : false
            }
            customBG={customBG}
          >
            <RenderHomepageLayout
              layout={layout}
              type={tag === "title" ? "text" : tag}
              inAdmin={useIds ? true : false}
            />
          </HomePageContentSpacing>
        );
      })}

      {inFrontend ? (
        <SchemaOrgScripts
          pageType="Home"
          data={{ Home: { faqs: faqsInPage } }}
          url={DOMAIN}
        />
      ) : (
        <></>
      )}

      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
