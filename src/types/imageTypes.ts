import type { AdditionalPersonnel } from "./eventTypes";

/** Image document from images collection (imageDB) */
export type Image = {
  id: string;
  event_id: string;
  date: string;
  path: string;
  caption: string;
  published: boolean;
  width: number;
  height: number;
  photographer_id: string;
  creative_director_id: string ;
  model_ids: string[];
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  additional_personnel?: AdditionalPersonnel[];
  deleted_at?: string;
  deleted_by?: string;
};

export type EventImageDetails = Pick<Image, "id" | "path" | "caption" | "width" | "height" | "photographer_id" | "creative_director_id" | "model_ids" | "additional_personnel">;