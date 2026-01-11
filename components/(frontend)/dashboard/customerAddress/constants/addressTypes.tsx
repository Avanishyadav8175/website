// icons
import { Building2, Heart, House, Laugh } from "lucide-react";

export const ADDRESS_TYPES = [
  {
    label: "Home",
    svg: (
      <House
        strokeWidth={1.5}
        width={14}
        height={14}
      />
    )
  },
  {
    label: "Office",
    svg: (
      <Building2
        strokeWidth={1.5}
        width={14}
        height={14}
      />
    )
  },
  {
    label: "Loved one",
    svg: (
      <Heart
        strokeWidth={1.5}
        width={14}
        height={14}
      />
    )
  },
  {
    label: "Friend",
    svg: (
      <Laugh
        strokeWidth={1.5}
        width={14}
        height={14}
      />
    )
  }
];
