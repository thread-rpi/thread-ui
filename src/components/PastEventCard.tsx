import { useState } from "react";
import { eventTypeIconMap, type EventType, type PastEvent, type PastEventCardSize } from "../types/eventTypes";
import { Icon } from "@iconify/react";
import { useViewport } from "../contexts/useViewport";
import { Link } from "react-router-dom";
import { getEventDetailsPageRoute } from "../routes/routePaths";
import { formatDate } from "../utils/formatter";

// const PAST_EVENT_IMAGE_COMPRESSION_SUFFIX = "lg.avif";
const PAST_EVENT_IMAGE_COMPRESSION_SUFFIX = "og.jpg";

const cardStyleBySize: Record<
  PastEventCardSize,
  {
    maskClass: string;
    contentPadClass: string;
    iconClass: string;
    titleClass: string;
    dateLocationClass: string;
  }
> = {
  full: {
    maskClass:
      "[mask-image:linear-gradient(to_bottom,transparent_0%_60%,black_96%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%_60%,black_96%)]",
    contentPadClass: "px-8 pb-5 md:px-14",
    iconClass: "text-4xl md:text-[36px]",
    titleClass: "text-lg md:text-2xl",
    dateLocationClass: "md:text-sm",
  },
  twoThird: {
    maskClass:
      "[mask-image:linear-gradient(to_bottom,transparent_0%_62%,black_95%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%_62%,black_95%)]",
    contentPadClass: "px-7 pb-4 md:px-10",
    iconClass: "text-3xl md:text-[34px]",
    titleClass: "text-base md:text-lg",
    dateLocationClass: "md:text-[11px]",
  },
  half: {
    maskClass:
      "[mask-image:linear-gradient(to_bottom,transparent_0%_66%,black_90%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%_66%,black_90%)]",
    contentPadClass: "px-6 pb-4 md:px-10",
    iconClass: "text-3xl md:text-[32px]",
    titleClass: "text-base md:text-[17px]",
    dateLocationClass: "md:text-[11px] md:mt-[-0.1rem]",
  },
  third: {
    maskClass:
      "[mask-image:linear-gradient(to_bottom,transparent_0%_50%,black_88%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%_50%,black_88%)]",
    contentPadClass: "px-6 pb-3",
    iconClass: "text-2xl md:text-[28px]",
    titleClass: "text-sm md:text-base",
    dateLocationClass: "md:text-[10px] md:mt-[-0.15rem]",
  },
};
interface PastEventCardProps extends PastEvent {
  cardSize?: PastEventCardSize;
};

export const PastEventCard = ({
  id,
  title,
  type,
  date,
  image_path,
  location,
  cardSize = "full",
}: PastEventCardProps) => {
  const { isMobile } = useViewport();
  const [isHovered, setIsHovered] = useState(false);
  const showHovered = isMobile ? true : isHovered;
  const isPlaceholder = id.startsWith("placeholder-");
  const coverImageUrl = import.meta.env.VITE_CLOUDFRONT_HOST + image_path + PAST_EVENT_IMAGE_COMPRESSION_SUFFIX;
  const cardStyle = cardStyleBySize[cardSize];
  const detailsRoute = getEventDetailsPageRoute(id);
  return (
    <Link
      to={detailsRoute}
      aria-disabled={isPlaceholder}
      className={`${isPlaceholder ? "pointer-events-none" : "cursor-pointer"}`}
    >
      <div
        className={`relative w-full bg-black rounded-4xl shadow-lg shadow-black/35 overflow-hidden 
        transition-all ease-in-out ${showHovered ? `h-[calc(100%+2.25rem)] duration-200 delay-80` : `h-full duration-300 delay-0`}
        ${isPlaceholder ? "blur-sm pointer-events-none scale-98" : ""} `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute inset-0 ${isPlaceholder ? "bg-white" : ""}`}>
          <img
            src={coverImageUrl}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover ${isPlaceholder ? " opacity-70" : ""}`}
          />
        </div>
        <div
          className={`z-10 absolute inset-0 bg-black
          ${cardStyle.maskClass}
          transition-all ${showHovered ? "opacity-100 duration-300 delay-0" : "opacity-0 pointer-events-none duration-200 delay-80"}`}
        />
        <div 
          className={`absolute inset-x-0 bottom-0 z-10 ${cardStyle.contentPadClass}
          transition-all ${showHovered ? "opacity-100 translate-y-0 duration-300 delay-0" : "opacity-0 translate-y-2 pointer-events-none duration-200 delay-80"}`}
        >
          <div className={`flex flex-row justify-start items-start gap-2 text-white ${cardStyle.iconClass}`}>
            <Icon icon={eventTypeIconMap[type.toLowerCase() as EventType]} inline={true} />
            <div className="flex flex-col justify-center items-start gap-0 overflow-clip text-white">
              <h3 className={`w-full font-bold truncate ${cardStyle.titleClass}`}>{title}</h3>
              <p className={`${cardStyle.dateLocationClass} text-[10px] opacity-45 font-weight-100 mt-[-0.15rem] truncate`}>
                {formatDate(date)}
                {` @ ${location}`}
              </p>
            </div>
          </div>
        </div>

        {isPlaceholder && (
          <div className="z-10 absolute inset-0 text-white text-[10rem] font-bold flex items-center justify-center">?</div>
        )}
      </div>

    </Link>
  );
}
