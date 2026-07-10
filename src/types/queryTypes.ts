import type { AdminUser } from "./adminTypes";
import type { Event, OverviewEvent, PastEvent } from "./eventTypes";
import type { Member } from "./memberTypes";
import type { Image } from "./imageTypes";

// Health endpoint successful response
export type HealthResponse = {
    state: 'healthy';
};

// Health endpoint error response
export type HealthError = {
    status: number;
    error: string;
};

// Login endpoint request body
export type LoginRequest = {
  email: string;
  password: string;
};

// Login endpoint successful response
export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

// Login endpoint error response
export type LoginError = {
  status: number;
  error: string;
};

// Refresh token endpoint request body
export type RefreshTokenRequest = {
  refresh_token: string;
};

// Refresh token endpoint successful response
export type RefreshTokenResponse = {
  access_token: string;
  refresh_token?: string;
};

// Refresh token endpoint error response
export type RefreshTokenError = {
  status: number;
  error: string;
};

// Admin user endpoint successful response
export type AdminUserResponse = AdminUser;

// Admin user endpoint error response
export type AdminUserError = {
  status: number;
  error: string;
};

// Event overview endpoint successful response
export type EventOverviewResponse = OverviewEvent[];

// Event overview endpoint error response
export type EventOverviewError = {
  status: number;
  error: string;
};

// Past events endpoint successful response
export type PastEventsResponse = {
  past_events: PastEvent[];
};

// Past events endpoint error response
export type PastEventsError = {
  status: number;
  error: string;
};

// Admin events endpoint successful response
export type AdminEventsResponse = {
  events: Event[];
};

// Admin events endpoint error response
export type AdminEventsError = {
  status: number;
  error: string;
};

// Admin members endpoint successful response
export type AdminMembersResponse = {
  members: Member[];
};

// Admin members endpoint error response
export type AdminMembersError = {
  status: number;
  error: string;
};

// Admin images endpoint successful response
export type AdminImagesResponse = {
  images: Image[];
};

// Admin images endpoint error response
export type AdminImagesError = {
  status: number;
  error: string;
};

// Event details endpoint successful response
export type EventDetailsResponse = Event;

// Event details endpoint error response
export type EventDetailsError = {
  status: number;
  error: string;
};

// Member details endpoint successful response
export type MemberDetailsResponse = Member;

// Member details endpoint error response
export type MemberDetailsError = {
  status: number;
  error: string;
};

// Image details endpoint successful response
export type ImageDetailsResponse = Image;

// Image details endpoint error response
export type ImageDetailsError = {
  status: number;
  error: string;
};