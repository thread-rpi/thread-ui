import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPastEvents } from "../api/queries";
import Loader from "../components/Loader";
import { routes } from "../routes/routePaths";
import { eventTypeIconMap, type EventType } from "../types/eventTypes";
import { formatDate } from "../utils/formatter";

const EVENT_IMAGE_COMPRESSION_SUFFIX = "og.jpg";

export default function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const { data, isLoading, isError } = useGetPastEvents();

  const selectedEvent = useMemo(
    () => data?.past_events.find((event) => event.id === eventId),
    [data?.past_events, eventId]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !selectedEvent) {
    return (
      <div className="w-full min-h-[60dvh] px-6 md:px-14 py-10 md:py-14 flex flex-col justify-center gap-3">
        <h1 className="text-thread-red text-3xl md:text-5xl font-bold">Event not found :(</h1>
        <p className="text-black text-sm md:text-xl">
          We could not find details for this event.
        </p>
        <button
          type="button"
          onClick={() => navigate(routes.root)}
          className="w-max mt-2 px-4 py-2 rounded-full bg-thread-red text-white text-sm md:text-base font-semibold cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const coverImageUrl =
    import.meta.env.VITE_CLOUDFRONT_HOST + selectedEvent.image_path + EVENT_IMAGE_COMPRESSION_SUFFIX;

  return (
    <div className="w-full min-h-[60dvh] px-6 md:px-14 py-10 md:py-14">
      <button
        type="button"
        onClick={() => navigate(routes.root)}
        className="group mb-6 md:mb-8 inline-flex items-center gap-1 text-thread-red cursor-pointer font-semibold text-sm md:text-base"
      >
        <Icon icon="material-symbols:arrow-back-rounded" className="text-lg md:text-xl transition-transform group-hover:-translate-x-0.5" />
        Back to events
      </button>
      <article className="w-full max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
        <div className="relative w-full rounded-3xl overflow-hidden bg-black shadow-lg shadow-black/20">
          <img
            src={coverImageUrl}
            alt={selectedEvent.title}
            className="w-full h-auto max-h-[68dvh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute left-5 right-5 bottom-5 md:left-8 md:right-8 md:bottom-8 text-white">
            <div className="flex items-start gap-2 md:gap-3">
              <Icon
                icon={eventTypeIconMap[selectedEvent.type.toLowerCase() as EventType]}
                className="text-3xl md:text-5xl shrink-0"
              />
              <div className="min-w-0">
                <h1 className="font-bold text-2xl md:text-5xl leading-tight">{selectedEvent.title}</h1>
                <p className="opacity-90 text-xs md:text-base mt-1 md:mt-2">
                  {formatDate(selectedEvent.date)}
                  {` @ ${selectedEvent.location}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
