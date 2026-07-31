// Additional personnel entry (denormalized)
export type AdditionalPersonnel = {
  member_id: string;
  role: string;
};

export type EventType = 'shoot' | 'internal' | 'external';

// Event document from events collection (eventDB)
export type Event = {
  id: string;
  date: string;
  title: string;
  type: EventType;
  location: string;
  blurb: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  image_path?: string;
  image_ids?: string[];
  photographer_ids?: string[];
  creative_director_ids?: string[];
  model_ids?: string[];
  additional_personnel?: AdditionalPersonnel[];
  deleted_at?: string;
  deleted_by?: string;
};

// Past event shape used by UI
export type PastEvent = Pick<Event, "id" | "title" | "date" | "type" | "location" | "image_path">

// Overview event shape used by UI
export type OverviewEvent = Pick<Event, "id" | "title" | "date" | "type">

export type PastEventCardSize = "full" | "half" | "third" | "twoThird";

export const eventTypeIconMap: Record<EventType, string> = {
  shoot: "mage:camera-fill",
  internal: "material-symbols:event",
  external: "uil:globe",
};