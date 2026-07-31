import { Icon } from "@iconify/react";
// import { Link } from "react-router-dom";
import { useGetMemberIdNamePairs } from "../api/queries";
// import { getMemberDetailsPageRoute } from "../routes/routePaths";
import { eventTypeIconMap } from "../types/eventTypes";
import type { MemberIdNamePair } from "../types/memberTypes";
import { formatDate } from "../utils/formatter";
import type { Event } from "../types/eventTypes";

interface EventDetailsContentProps {
  content: Event | null;
  isDetailsReady: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

function renderNames(pairs: MemberIdNamePair[]) {
  if (pairs.length === 0) {
    return <p className="text-sm md:text-lg lg:text-xl font-bold leading-[1.2] text-white/45">-</p>;
  }

  return (
    <div className="flex flex-wrap gap-x-[14px] gap-y-[10px]">
      {pairs.map((pair) => (
        // <Link to={getMemberDetailsPageRoute(pair.id)} key={pair.id} className="transition-all duration-250 ease-in-out hover:text-thread-red">
        //   <p className="text-sm md:text-lg lg:text-2xl font-bold leading-[1.2]">{pair.name}</p>
        // </Link>
        <a key={pair.id} className="transition-all duration-250 ease-in-out hover:text-thread-red">
          <p className="text-sm md:text-lg lg:text-2xl font-bold leading-[1.2]">{pair.name}</p>
        </a>
      ))}
    </div>
  );
}

export default function EventDetailsContent({
  content,
  isDetailsReady,
  isExpanded,
  onToggleExpanded,
}: EventDetailsContentProps) {
  // console.log("IS DETAILS READY?", isDetailsReady ?? "No details ready");
  // console.log("CONTENT?", content ?? "No content");
  // if (content) {
  //   console.log("CONTENT.CREATIVE_DIRECTOR_IDS?", content.creative_director_ids?.length, "creative director IDs");
  // }
  const directorPairsQuery = useGetMemberIdNamePairs(content?.creative_director_ids ?? [], isDetailsReady);
  const photographerPairsQuery = useGetMemberIdNamePairs(content?.photographer_ids ?? [], isDetailsReady);
  const modelPairsQuery = useGetMemberIdNamePairs(content?.model_ids ?? [], isDetailsReady);
  const additionalPersonnelPairsQuery = useGetMemberIdNamePairs(content?.additional_personnel?.map((person) => person.member_id) ?? [], isDetailsReady);

  const directors = directorPairsQuery.data ?? [];
  const photographers = photographerPairsQuery.data ?? [];
  const models = modelPairsQuery.data ?? [];
  const additionalPersonnel = additionalPersonnelPairsQuery.data ?? [];

  return (
    <div
      className="w-full rounded-[20px] px-4 py-4.5 backdrop-blur-md transition-all duration-500 ease-out"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-2xl md:text-4xl lg:text-5xl leading-none font-black">
            <Icon icon={eventTypeIconMap[content?.type ?? "shoot"]} inline={true} />
            <h1 className="truncate">{content?.title ?? ""}</h1>
          </div>
          <div
            className={`grid overflow-hidden transition-[grid-template-rows,opacity,transform,margin] duration-500 ease-out ${
              isExpanded
                ? "mt-1 grid-rows-[1fr] opacity-100 translate-y-0"
                : "mt-0 grid-rows-[0fr] opacity-0 -translate-y-1 pointer-events-none"
            }`}
          >
            <p className="min-h-0 text-[10px] md:text-xs lg:text-base text-[#bdbdbd]">
              {formatDate(content?.date ?? "")}
              {` @ ${content?.location ?? ""}`}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label={isExpanded ? "Collapse event details" : "Expand event details"}
          onClick={onToggleExpanded}
          className="relative aspect-square h-[22px] md:h-[30px] lg:h-[40px] text-white/95 transition-transform 
          duration-250 ease-in-out cursor-pointer hover:scale-110"
        >
          <Icon
            icon="fluent:arrow-expand-all-16-filled"
            width="100%"
            height="100%"
            className={`absolute inset-0 transition-all duration-500 ease-out scale-80 ${
              isExpanded ? "opacity-100 rotate-0" : "opacity-0 rotate-[180deg]"
            }`}
          />
          <Icon
            icon="fluent:arrow-collapse-all-16-filled"
            width="100%"
            height="100%"
            className={`absolute inset-0 transition-all duration-500 ease-out scale-80 ${
              !isExpanded ? "opacity-100 rotate-0" : "opacity-0 rotate-[-180deg]"
            }`}
          />
        </button>
      </div>
      
      {/* expanded details content */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity,transform,margin] duration-500 ease-out ${
          isExpanded
            ? "mt-3 grid-rows-[1fr] opacity-100 translate-y-0"
            : "mt-0 grid-rows-[0fr] opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-row items-start justify-center gap-x-5">

            <div className="flex-1 max-w-[50%] flex flex-col items-start justify-center gap-y-3">
              <div className="space-y-1">
                <p className="text-[10px] md:text-xs lg:text-base text-[#bdbdbd]">Directed By</p>
                {renderNames(directors)}
              </div>

              <div className="space-y-1">
                <p className="text-[10px] md:text-xs lg:text-base text-[#bdbdbd]">Shot By</p>
                {renderNames(photographers)}
              </div>

              {additionalPersonnel.length > 0 && (
                <div className="space-y-1">
                  <p className="text-[10px] md:text-xs lg:text-base text-[#bdbdbd]">with Contributions From</p>
                  {renderNames(additionalPersonnel)}
                </div>
              )}
            </div>

            <div className="flex-1 max-w-[50%] flex flex-col items-start justify-center gap-y-3">  
              <div className="space-y-1">
                <p className="text-[10px] md:text-xs lg:text-base text-[#bdbdbd]">Featuring</p>
                {renderNames(models)}
              </div>
            </div>
          </div>
          <div
            className={`overflow-hidden transition-[max-height,opacity,transform,margin] duration-500 ease-out ${
              isExpanded ? "mt-4 max-h-40 opacity-100 translate-y-0" : "mt-0 max-h-0 opacity-0 -translate-y-1"
            }`}
          >
            {content?.blurb?.trim() && (
              <div className="space-y-1">
                <p className="text-[11.5px] md:text-sm lg:text-base font-normal text-white leading-[1.1]">{content.blurb.trim()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
