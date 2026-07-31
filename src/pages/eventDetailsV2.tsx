import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEventDetails } from "../api/queries";
import EventDetailsContent from "../components/EventDetailsContent";
import Loader from "../components/Loader";
import { routes } from "../routes/routePaths";
import type { Event } from "../types/eventTypes";
import EventImageGallery from "../components/EventImageGallery";
import { useViewport } from "../contexts/useViewport";

const EVENT_IMAGE_COMPRESSION_SUFFIX = "og.jpg";

export default function EventDetailsV2() {
  const { isMobile, width } = useViewport();
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const heroStackRef = useRef<HTMLDivElement | null>(null);
  const [transformRange, setTransformRange] = useState([1, 1]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageFocused, setIsImageFocused] = useState(false);
  const [eventDetailsContent, setEventDetailsContent] = useState<Event | null>(null);
  const {
    isSuccess: isEventDetailsSuccess,
    data: eventDetails,
    isLoading: isEventDetailsLoading,
    isError: isEventDetailsError,
    error: eventDetailsError,
  } = useGetEventDetails(eventId ?? "");

  // assign event details to state only after event details request succeeds
  useEffect(() => {
    if (isEventDetailsSuccess && eventDetails) {
      setEventDetailsContent(eventDetails);
    }
  }, [isEventDetailsSuccess, eventDetails]);

  // Apply page-specific background while this route is mounted
  useEffect(() => {
    document.documentElement.classList.add("event-details-page");
    document.body.classList.add("event-details-page");
    document.getElementById("layout-container")?.classList.add("event-details-page");
    // document.getElementById("mobile-footer-container")?.classList.add("event-details-page");

    return () => {
      document.documentElement.classList.remove("event-details-page");
      document.body.classList.remove("event-details-page");
      document.getElementById("layout-container")?.classList.remove("event-details-page");
      // document.getElementById("mobile-footer-container")?.classList.remove("event-details-page");
    };
  }, []);

  // animation config - update the transform range based on the width of the viewport
  useEffect(() => {
    const updateTransformRange = () => {
      // calculate the minimum multiplier based on the width of the viewport
      // mobile = 0px
      // > mobile && <=1440px width = 0.333 scaled from 768px to 1440px
      // > 1440px width = 0.39
      const minMultiplier = isMobile ? 0 : width > 1440 ? 0.39 : (width / 1440) * 0.39;

      // delay animation window start by 11% of the viewport height
      const scrollStartOffset = window.innerHeight * 0.11;

      // calculate the travel distance
      const travel = window.innerHeight * 0.95 - window.innerHeight * minMultiplier;

      // calculate the start position
      const start = window.innerHeight * minMultiplier + scrollStartOffset;
      setTransformRange([start, start + travel]);
    };

    updateTransformRange();
    window.addEventListener("resize", updateTransformRange);

    return () => window.removeEventListener("resize", updateTransformRange);
  }, [isMobile, width]);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    mass: .05,
    stiffness: 95,
    damping: 40,
  });
  const heroScale = useTransform(smoothScrollY, transformRange, [1, 0.8], { clamp: true });
  const heroBlur = useTransform(smoothScrollY, transformRange, [0, 35], { clamp: true });
  const heroOpacity = useTransform(smoothScrollY, transformRange, [1, 0.5], { clamp: true });
  const galleryTranslateY = useTransform(smoothScrollY, transformRange, [0, -window.innerHeight * 0.95], { clamp: true });
  const galleryMarginBottom = useTransform(galleryTranslateY, (y) => y);
  const heroFilter = useMotionTemplate`blur(${heroBlur}px)`;

  if (isEventDetailsLoading) {
    return <Loader />;
  }

  if (isEventDetailsError || !isEventDetailsSuccess || !eventDetails) {
    console.error(eventDetailsError);
    return (
      <div className="w-full min-h-[60dvh] px-6 md:px-14 py-10 md:py-14 flex flex-col justify-center gap-3">
        <h1 className="text-thread-red text-3xl md:text-5xl font-bold">Event not found :(</h1>
        <p className="text-white text-sm md:text-xl">We could not find details for this event.</p>
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

  const coverImageUrl = eventDetails.image_path
    ? import.meta.env.VITE_CLOUDFRONT_HOST + eventDetails.image_path + EVENT_IMAGE_COMPRESSION_SUFFIX
    : undefined;

  return (
    <div className="relative w-full h-full min-h-[60dvh] overflow-x-hidden flex justify-center text-white">
      {/* <div className="pointer-events-none absolute -left-32 -top-44 h-[420px] w-[680px] rounded-full border-[44px] border-thread-red/95" />
      <div className="pointer-events-none absolute -right-32 top-80 h-[460px] w-[760px] rounded-full border-[40px] border-[#678f3f]/80" />
      <div className="pointer-events-none absolute -left-44 bottom-20 h-[480px] w-[840px] rounded-full border-[38px] border-[#678f3f]/70" /> */}

      <div className="relative z-10 flex w-full max-w-[360px] sm:max-w-[760px] md:max-w-[910px] lg:max-w-[1400px] flex-col gap-4 px-3 sm:px-6 md:px-8">
        <motion.div
          ref={heroStackRef}
          className="relative z-10 flex flex-col gap-4"
          style={{
            scale: heroScale,
            filter: heroFilter,
            opacity: heroOpacity,
            transformOrigin: "top center",
            willChange: "transform, filter, opacity",
          }}
        >
          <article
            className={`relative w-full overflow-hidden rounded-[22px] bg-black shadow-2xl shadow-black/40 transition-[height,border-radius] 
              duration-500 ease-out lg:transition-none lg:duration-0 lg:aspect-3/2 lg:w-full lg:h-full lg:max-w-none lg:max-h-none  ${
              isExpanded ? "h-[clamp(198px,53vw,520px)] sm:h-[clamp(300px,58vw,640px)] md:h-[clamp(400px,62vw,850px)]" : "h-[72dvh] md:h-[80dvh] max-h-[560px] sm:max-h-[640px] md:max-h-[900px]"
            }`}
          >
            <img
              id="zoomed-cover-image"
              src={coverImageUrl}
              alt={eventDetails.title}
              className={`absolute top-0 h-full w-auto max-w-none transition-[opacity,transform] duration-500 ease-in-out scale-102 
                animate-delay-100 animate-event-cover-pan-mobile sm:animate-event-cover-pan-tablet lg:animate-none lg:opacity-0 lg:pointer-events-none motion-reduce:animate-none ${
                !isExpanded ? "left-0 opacity-100" : "left-[5%] opacity-0"
              }`}
            />
            <img
              id="unzoomed-cover-image"
              src={coverImageUrl}
              alt={eventDetails.title}
              className={`absolute inset-0 aspect-[3/2] h-full w-full object-cover object-center transition-[opacity] duration-500 
                ease-in-out lg:opacity-100 lg:pointer-events-auto ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            />
          </article>

          <section className="w-full self-center">
            <EventDetailsContent
              content={eventDetailsContent}
              isDetailsReady={isEventDetailsSuccess && !!eventDetailsContent}
              isExpanded={isExpanded}
              onToggleExpanded={() => setIsExpanded((prev) => !prev)}
            />
          </section>
        </motion.div>

        <motion.div
          className="relative z-20 mt-5 md:mt-15"
          style={{
            y: galleryTranslateY,
            marginBottom: galleryMarginBottom,
            willChange: "transform",
          }}
        >
          <EventImageGallery 
            imageData={eventDetailsContent?.image_ids ?? []} 
            isDataReady={isEventDetailsSuccess && !!eventDetailsContent} 
            isImageFocused={isImageFocused}
            onToggleImageFocused={() => setIsImageFocused((prev) => !prev)}
          />
        </motion.div>
      </div>
    </div>
  );
}
