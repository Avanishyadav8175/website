import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  LINKEDIN_LINK,
  TWITTER_LINK,
  YOUTUBE_LINK
} from "@/common/constants/companyDetails";
import { Children, ClassNameType } from "@/common/types/reactTypes";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon
} from "lucide-react";
import Link from "next/link";

export default function FooterBottomRight() {
  return (
    <section className="max-sm:col-start-1 max-sm:row-start-3 flex max-sm:flex-col items-center justify-center sm:justify-end max-sm:py-5 gap-1.5 sm:gap-3.5 text-charcoal-3/50 sm:text-charcoal-3 text-sm">
      <span className="sm:text-[17px]">Follow Us:</span>
      <div className="flex items-center justify-center sm:justify-end gap-3">
        <Social link={INSTAGRAM_LINK}>
          <InstagramLogoIcon
            strokeWidth={0.5}
            width={23}
            height={23}
          />
        </Social>
        <Social link={FACEBOOK_LINK}>
          <FacebookIcon
            strokeWidth={1.5}
            width={23}
            height={23}
          />
        </Social>
        <Social link={YOUTUBE_LINK}>
          <YoutubeIcon
            strokeWidth={1.5}
            width={25}
            height={25}
          />
        </Social>
        <Social link={LINKEDIN_LINK}>
          <LinkedinIcon
            strokeWidth={1.5}
            width={23}
            height={23}
          />
        </Social>
        <Social link={TWITTER_LINK}>
          <TwitterIcon
            strokeWidth={1.5}
            width={23}
            height={23}
          />
        </Social>
      </div>
    </section>
  );
}

export const Social = ({
  link,
  children,
  className
}: {
  link: string;
  children: Children;
  className?: ClassNameType;
}) => {
  return (
    <Link
      href={link}
      // prefetch
      className={`text-charcoal-2/70 sm:text-charcoal-2/80 min-w-fit px-1 transition-all duration-300 hover:text-sienna hover:brightness-75 ${className || ""}`}
    >
      {children}
    </Link>
  );
};
