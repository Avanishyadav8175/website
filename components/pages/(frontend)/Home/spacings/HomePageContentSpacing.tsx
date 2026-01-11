import HomepageLayoutHoverActions from "@/components/(admin)/routes/page/homepage/components/actions/HomepageLayoutHoverActions";
import { BASE_HOME_BG_COLOR } from "../static/pallette";
import MaxWidthWrapper from "@/components/(frontend)/global/_MaxWidthWrapper/MaxWidthWrapper";
import BoxTheme from "@/components/(frontend)/global/_Templates/BoxTheme/BoxTheme";

export default function HomePageContentSpacing(
  props: {
    children: JSX.Element;
    extraSpacing?: boolean;
    id?: string;
    showActions: boolean;
    customBG?: string;
    excludeBox?: boolean;
    isContent?: boolean;
    layoutNumber?: number;
    noPadding?: boolean;
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
  const { children, extraSpacing, id, showActions, layoutNumber } = props;
  const { customBG, excludeBox, isContent, noPadding } = props;

  return (
    <section
      id={id}
      style={customBG ? { background: customBG } : {}}
      className={` ${showActions ? "relative" : ""} ${extraSpacing ? "py-10" : excludeBox ? "py-6" : "pb-6"} ${customBG ? "" : BASE_HOME_BG_COLOR}`}
    >
      <MaxWidthWrapper
        // forceApply
        className="max-sm:px-3.5"
      >
        <BoxTheme
          excludeBox={excludeBox}
          isContent={isContent}
          noPadding={noPadding}
        >
          {children}
        </BoxTheme>
      </MaxWidthWrapper>

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
    </section>
  );
}
