// utils
import { FACEBOOK_LINK, INSTAGRAM_LINK, LINKEDIN_LINK, TWITTER_LINK, YOUTUBE_LINK } from "@/common/constants/companyDetails";
import { Children, ClassNameType } from "@/common/types/reactTypes";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

function FooterBottomLeft() {
  return (
    <div className="flex text-charcoal-3 text-sm items-center justify-center max-sm:mt-3 max-sm:mb-3 sm:justify-end gap-2 sm:mr-12 min-[1300px]:mr-0">
      <span className="mr-1 max-sm:hidden">Socials: </span>
      <Social
        label="Instagram"
        path={INSTAGRAM_LINK}
      >
        <InstagramLogoIcon
          strokeWidth={0.5}
          width={20}
          height={20}
        />
      </Social>
      <Social
        label="facebook"
        path={FACEBOOK_LINK}
      >
        <FacebookIcon
          strokeWidth={1.5}
          width={20}
          height={20}
        />
      </Social>
      {/* <Social
        label="YouTube"
        path={YOUTUBE_LINK}
      >
        <YoutubeIcon
          strokeWidth={1.5}
          width={20}
          height={20}
        />
      </Social> */}
      {/* <Social
        label="Linkedin"
        path={LINKEDIN_LINK}
      >
        <LinkedinIcon
          strokeWidth={1.5}
          width={20}
          height={20}
        />
      </Social> */}
      {/* <Social
        label="Twitter"
        path={TWITTER_LINK}
      >
        <TwitterIcon
          strokeWidth={1.5}
          width={20}
          height={20}
        />
      </Social> */}
    </div>
  );
}

function SocialComponent({
  label,
  path,
  children,
  className
}: {
  label: string;
  path: string;
  children: Children;
  className?: ClassNameType;
}) {
  return (
    <Link
      href={path}
      prefetch={false}
      className={`text-charcoal-2/70 sm:text-charcoal-2/80 min-w-fit px-1 transition-all duration-300 hover:text-sienna hover:brightness-75 ${className || ""}`}
    >
      {children}
    </Link>
  );
}

export const Social = memo(SocialComponent);

export default memo(FooterBottomLeft);
