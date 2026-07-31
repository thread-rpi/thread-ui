import { useViewport } from "../contexts/useViewport";
import { generatePastEventGrid } from "../helpers/pastEventGrid";
import { GridRowRenderer } from "../helpers/gridRowRenderer";
import { useGetPastEvents } from "../api/queries";
import { MobilePastEventCard } from "../components/MobilePastEventCard";
import type { PastEvent } from "../types/eventTypes";
import { RecentContentThread } from "../components/RecentContentThread";
import Loader from "../components/Loader";
import { formatDate } from "../utils/formatter";

const MIN_PAST_EVENTS = 6;

const createPlaceholderEvents = (count: number, fallbackCoverPath?: string): PastEvent[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `placeholder-${index + 1}`,
    title: "Soon...",
    date: formatDate("9999-12-31"),
    location: "???",
    type: "internal",
    image_path: fallbackCoverPath ?? "",
  }));

const Home = () => {
  const { isMobile } = useViewport();

  const { 
    isSuccess: isRecentContentSuccess,
    isLoading: isRecentContentLoading,
    isError: isRecentContentError,
    data: recentContentData,
    error: recentContentError,
  } = useGetPastEvents();
  console.log(recentContentData?.past_events || recentContentError?.error);
  const pastEvents = recentContentData?.past_events || [];
  const fallbackImagePath = pastEvents[0]?.image_path;
  const displayPastEvents =
    pastEvents.length >= MIN_PAST_EVENTS
      ? pastEvents
      : [...pastEvents, ...createPlaceholderEvents(MIN_PAST_EVENTS - pastEvents.length, fallbackImagePath)];
  const pastEventRows = generatePastEventGrid(displayPastEvents); 
  
  return (
    <div className="relative w-full h-full min-h-[60dvh] flex justify-center">
      {isRecentContentSuccess && (
        <>
          {isMobile && (
            <div className="z-10 flex flex-col gap-5 w-full max-w-7xl h-max mx-auto px-6 pb-6">
              {displayPastEvents.map((event) => (
                <MobilePastEventCard key={event.id} {...event} />
              ))}
            </div>
          )}
          {!isMobile && (
            <div className="z-10 flex flex-col gap-10 w-full max-w-7xl h-max mx-auto px-12 pb-6">
              {pastEventRows.map((row, rowIndex) => (
                <GridRowRenderer key={rowIndex} row={row} />
              ))}
            </div>
          )}
          <div className="absolute inset-0 w-full h-[calc(100%+9rem)] md:h-[calc(100%+12rem)] lg:h-[calc(100%+8rem)] xl:h-[calc(100%+12rem)] -mt-10 lg:mt-12 overflow-clip pointer-events-none">
            <RecentContentThread 
              className="z-0 w-[280vw] md:w-[220vw] lg:w-[127vw] 2xl:w-[129vw] max-w-none absolute top-0 left-1/2 -translate-x-1/2 h-auto"
            />
          </div>
        </>
      )}
      {isRecentContentLoading && (
        <Loader />
      )}
      {isRecentContentError && (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="h-max w-full flex flex-col items-start justify-center px-11 lg:px-20">
            <div className="text-[20px] sm:text-[28px] md:text-[48px] text-thread-red font-bold text-wrap">
              Something went wrong :/
            </div>
            <div className="text-[12px] sm:text-[16px] md:text-[24px] text-black">
              Please try again later.
            </div>
          </div>
        </div>
      )}
      {(isRecentContentSuccess || isRecentContentLoading) && (
        <div className="absolute inset-0 w-full h-[calc(100%+9rem)] md:h-[calc(100%+12rem)] lg:h-[calc(100%+8rem)] xl:h-[calc(100%+12rem)] -mt-10 lg:mt-12 overflow-clip pointer-events-none">
          <RecentContentThread 
            className="z-0 w-[280vw] md:w-[220vw] lg:w-[127vw] 2xl:w-[129vw] max-w-none absolute top-0 left-1/2 -translate-x-1/2 h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
