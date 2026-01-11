export const slideDateTimePanel = ({
  dateTimeSlideContainerId,
  currSliderIndex,
  isMobile,
  width
}: {
  dateTimeSlideContainerId: string;
  currSliderIndex: 0 | 1 | 2;
  isMobile: boolean;
  width: number;
}) => {
  if (dateTimeSlideContainerId) {
    const el = document.getElementById(dateTimeSlideContainerId) as HTMLElement;
    el?.animate(
      {
        transform: isMobile
          ? `translateX(${currSliderIndex * -1 * (width - 40)}px)`
          : `translateX(${currSliderIndex * -1 * 340}px)`
      },
      { duration: 300, fill: "forwards" }
    );
  }
};
