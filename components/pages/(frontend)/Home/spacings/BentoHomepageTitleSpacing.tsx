import HomepageLayoutHoverActions from "@/components/(admin)/routes/page/homepage/components/actions/HomepageLayoutHoverActions";
import { BASE_HOME_BG_COLOR } from "../static/pallette";
import MaxWidthWrapper from "@/components/(frontend)/global/_MaxWidthWrapper/MaxWidthWrapper";

export default function BentoHomepageTitleSpacing(
  props: {
    title: string | undefined;
    subtitle?: string | undefined;
    leftAlign?: boolean;
    customBG?: string;
    id?: string;
    layoutNumber?: number;
  } & (
    | { showActions: false }
    | {
        showActions: true;
        onClickEdit: (id: string) => void;
        onClickDisable: (id: string) => void;
        onClickDelete: (id: string) => void;
      }
  )
) {
  const {
    title,
    leftAlign,
    id,
    showActions,
    layoutNumber,
    customBG,
    subtitle
  } = props;
  if (!title || title.length == 0) return <></>;

  return (
    <div
      id={id}
      style={customBG ? { background: customBG } : {}}
      className={`${showActions ? "relative" : ""} ${customBG ? "" : BASE_HOME_BG_COLOR} py-5 sm:pt-4`}
    >
      <MaxWidthWrapper
        // forceApply
        className="max-sm:px-3.5"
      >
        <h2
          className={`${leftAlign ? "text-left" : "text-center"} font-medium text-charcoal-3/90 tracking-tight text-[28px] sm:text-[24px] `}
        >
          {title}
        </h2>
      </MaxWidthWrapper>

      {subtitle && subtitle.length > 0 ? (
        <MaxWidthWrapper
          // forceApply
          className="max-sm:px-3.5"
        >
          <h3
            className={`${leftAlign ? "text-left" : "text-center"} max-sm:mt-1 text-charcoal-3/80 font-light text-[14px] sm:text-[16px] `}
          >
            {subtitle}
          </h3>
        </MaxWidthWrapper>
      ) : (
        <></>
      )}

      {showActions ? (
        <HomepageLayoutHoverActions
          id={id || ""}
          onClickDelete={props.onClickDelete}
          onClickDisable={props.onClickDisable}
          onClickEdit={props.onClickEdit}
          layoutNumber={layoutNumber || 0}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
