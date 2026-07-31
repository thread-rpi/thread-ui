import { eventTypeIconMap } from "../../types/eventTypes";
import type { Event } from "../../types/eventTypes";
import { formatDate } from "../../utils/formatter";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
const ADMIN_EVENT_IMAGE_COMPRESSION_SUFFIX = "og.jpg";

interface AdminEventCardProps {
  event: Pick<Event, "id" | "title" | "date" | "type" | "location" | "published" | "image_path">;
}

export default function AdminEventCard({ event }: AdminEventCardProps) {
  const imageUrl = event.image_path
    ? import.meta.env.VITE_CLOUDFRONT_HOST + event.image_path + ADMIN_EVENT_IMAGE_COMPRESSION_SUFFIX
    : null;

  const navigate = useNavigate();

  return (
    <article className={`outline-1 outline-black bg-white flex flex-col ${event.published ? "cursor-pointer transition-all duration-300 hover:translate-y-[-6px] hover:shadow-lg" : "cursor-not-allowed opacity-50"}`} onClick={() => navigate(`/admin/events/${event.id}`)}>
      <div className="aspect-[3/2] w-full overflow-hidden border-b border-black bg-thread-off-white">
        {imageUrl ? (
          <img src={imageUrl} alt={event.title} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <Icon
            icon={eventTypeIconMap[event.type]}
            className="text-2xl shrink-0"
            aria-hidden
          />
          <h3 className="text-base font-bold leading-tight truncate">{event.title}</h3>
        </div>

        <p className="text-sm text-black/60 leading-snug">
          {formatDate(event.date)}
          {` @ ${event.location}`}
        </p>

        <p className="text-xs font-medium uppercase tracking-wide text-black/45">
          {event.published ? "Published" : "Draft"}
        </p>
      </div>
    </article>
  );
}
