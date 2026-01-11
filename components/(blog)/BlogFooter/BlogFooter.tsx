
import { FACEBOOK_LINK, INSTAGRAM_LINK, LINKEDIN_LINK, TWITTER_LINK, YOUTUBE_LINK } from "@/common/constants/companyDetails";
import MadeWithLoveInIndia from "@/components/(_common)/utils/MadeWithLoveInIndia";
import { Social } from "@/components/(frontend)/global/Footer/components/BottomRight";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon
} from "lucide-react";

export default function FrontendBlogFooter({ }: {}) {
  return (
    <footer className="mt-14 flex max-sm:flex-col-reverse items-center justify-end sm:justify-between">
      <MadeWithLoveInIndia
        hide
        withoutBorder
      />
      <div className="flex flex-col justify-start items-center gap-1 mb-6">
        <span className="text-xs">Follow Us</span>
        <div className="flex items-center justify-center sm:justify-end gap-3">
          <Social
            label="Instagram"
            link={INSTAGRAM_LINK}
          >
            <InstagramLogoIcon
              strokeWidth={0.5}
              width={23}
              height={23}
            />
          </Social>
          <Social
            label="facebook"
            link={FACEBOOK_LINK}
          >
            <FacebookIcon
              strokeWidth={1.5}
              width={23}
              height={23}
            />
          </Social>
          <Social
            label="YouTube"
            link={YOUTUBE_LINK}
          >
            <YoutubeIcon
              strokeWidth={1.5}
              width={25}
              height={25}
            />
          </Social>
          <Social
            label="LinkedIn"
            link={LINKEDIN_LINK}
          >
            <LinkedinIcon
              strokeWidth={1.5}
              width={23}
              height={23}
            />
          </Social>
          <Social
            label="twitter"
            link={TWITTER_LINK}
          >
            <TwitterIcon
              strokeWidth={1.5}
              width={23}
              height={23}
            />
          </Social>
        </div>
      </div>
    </footer>
  );
}
