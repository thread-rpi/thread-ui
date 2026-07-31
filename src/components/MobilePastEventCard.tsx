import { eventTypeIconMap, type EventType, type PastEvent } from "../types/eventTypes";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getEventDetailsPageRoute } from "../routes/routePaths";
import { formatDate } from "../utils/formatter";

// const PAST_EVENT_IMAGE_COMPRESSION_SUFFIX = "md.avif";
const MOBILE_PAST_EVENT_IMAGE_COMPRESSION_SUFFIX = "og.jpg";

type MobilePastEventCardProps = PastEvent;
export const MobilePastEventCard = ({
  id,
  title,
  type,
  date,
  image_path,
  location,
}: MobilePastEventCardProps) => {
  const isPlaceholder = id.startsWith("placeholder-");
  const coverImageUrl = import.meta.env.VITE_CLOUDFRONT_HOST + image_path + MOBILE_PAST_EVENT_IMAGE_COMPRESSION_SUFFIX;
  const detailsRoute = getEventDetailsPageRoute(id);

  return (
    <Link
      to={detailsRoute}
      aria-disabled={isPlaceholder}
      className={`${isPlaceholder ? "pointer-events-none" : "cursor-pointer"}`}
    >
      <div className={`relative w-full aspect-[3/2] bg-black rounded-2xl shadow-md shadow-black/40 overflow-hidden ${isPlaceholder ? "blur-sm pointer-events-none" : ""}`}>
        <div className={`absolute inset-0 ${isPlaceholder ? "bg-white" : ""}`}>
          <img
            src={coverImageUrl}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover ${isPlaceholder ? "scale-102 opacity-80" : ""}`}
          />
        </div>
        <div 
          className={`z-10 absolute inset-0 bg-black
          [mask-image:linear-gradient(to_bottom,transparent_0%_50%,black_88%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%_50%,black_88%)]`}
        />
        <div className={`absolute inset-x-0 bottom-0 z-10 px-6 pb-3 sm:px-12 sm:pb-5`}>
          <div className={`flex flex-row justify-start items-start gap-2 text-white text-2xl sm:text-3xl`}>
            <Icon icon={eventTypeIconMap[type.toLowerCase() as EventType]} inline={true} />
            <div className="flex flex-col justify-center items-start gap-0 overflow-clip text-white">
              <h3 className={`w-full font-bold text-sm sm:text-xl truncate`}>{title}</h3>
              {isPlaceholder && (
                <div className="w-full h-full bg-black rounded-2xl animate-pulse" />
              )}
              <p className={`text-[10px] sm:text-xs opacity-45 font-weight-100 mt-[-0.12rem] truncate`}>
                {formatDate(date)}
                {` @ ${location}`}
              </p>
            </div>
          </div>
        </div>

        {isPlaceholder && (
          <div className="z-10 absolute inset-0 text-white text-[8rem] sm:text-[15rem] font-bold flex items-center justify-center">?</div>
        )}
      </div>
    </Link>
  );
}
