import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { apiGet, apiPost } from "./api";
import { API_ROUTES, getEventDetailsAPIRoute, getMemberDetailsAPIRoute, getImageDetailsAPIRoute } from "./apiRoutes";
import type * as QueryTypes from "../types/queryTypes";
import type { MemberIdNamePair } from "../types/memberTypes";
import type { EventImageDetails } from "../types/imageTypes";


// health endpoint request
async function getHealth(): Promise<QueryTypes.HealthResponse> {
  return apiGet<QueryTypes.HealthResponse, QueryTypes.HealthError>({endpoint: API_ROUTES.health});
}

// health endpoint hook 
export const useGetHealth = (): UseQueryResult<QueryTypes.HealthResponse, QueryTypes.HealthError> => {
  return useQuery<QueryTypes.HealthResponse, QueryTypes.HealthError>({
    queryKey: ["health"],
    queryFn: () => getHealth()
  });
}

// event overview endpoint request
async function getEventOverview(): Promise<QueryTypes.EventOverviewResponse> {
  return apiGet<QueryTypes.EventOverviewResponse, QueryTypes.EventOverviewError>({endpoint: API_ROUTES.eventOverview});
};

// event overview endpoint hook - only fetches if enabled (component is open/active)
export const useEventOverview = (enabled: boolean = true): UseQueryResult<QueryTypes.EventOverviewResponse, QueryTypes.EventOverviewError> => {
  return useQuery<QueryTypes.EventOverviewResponse, QueryTypes.EventOverviewError>({
    queryKey: ['eventOverview'],
    queryFn: getEventOverview,
    enabled: enabled,
  });
};

// login endpoint request
async function loginRequest({ email, password }: QueryTypes.LoginRequest): Promise<QueryTypes.LoginResponse> {
  return apiPost<QueryTypes.LoginResponse, QueryTypes.LoginError>({
    endpoint: API_ROUTES.login,
    body: { email, password },
  });
}

// login endpoint hook - mutation only executes when mutate() is called with valid credentials
export const useLogin = (): UseMutationResult<QueryTypes.LoginResponse, QueryTypes.LoginError, QueryTypes.LoginRequest> => {
  return useMutation<QueryTypes.LoginResponse, QueryTypes.LoginError, QueryTypes.LoginRequest>({
    mutationFn: loginRequest
  });
};

// refresh token endpoint request
async function refreshTokenRequest({ refresh_token }: QueryTypes.RefreshTokenRequest): Promise<QueryTypes.RefreshTokenResponse> {
  return apiPost<QueryTypes.RefreshTokenResponse, QueryTypes.RefreshTokenError>({
    endpoint: API_ROUTES.refreshToken,
    body: { refresh_token },
  });
}

// refresh token endpoint hook
export const useRefreshToken = (): UseMutationResult<QueryTypes.RefreshTokenResponse, QueryTypes.RefreshTokenError, QueryTypes.RefreshTokenRequest> => {
  return useMutation<QueryTypes.RefreshTokenResponse, QueryTypes.RefreshTokenError, QueryTypes.RefreshTokenRequest>({
    mutationFn: refreshTokenRequest
  });
};

// current user endpoint request
async function getCurrentAdminUser(): Promise<QueryTypes.AdminUserResponse> {
  return apiGet<QueryTypes.AdminUserResponse, QueryTypes.AdminUserError>({ endpoint: API_ROUTES.adminUser });
}

// current user endpoint hook - only fetches if token exists
export const useCurrentAdminUser = (enabled: boolean = true): UseQueryResult<QueryTypes.AdminUserResponse, QueryTypes.AdminUserError> => {
  return useQuery<QueryTypes.AdminUserResponse, QueryTypes.AdminUserError>({
    queryKey: ["currentAdminUser"],
    queryFn: getCurrentAdminUser,
    enabled: enabled
  });
};

// past events endpoint request
async function getPastEvents(): Promise<QueryTypes.PastEventsResponse> {
  return apiGet<QueryTypes.PastEventsResponse, QueryTypes.PastEventsError>({ endpoint: API_ROUTES.pastEvents });
}

// past events endpoint hook 
export const useGetPastEvents = (): UseQueryResult<QueryTypes.PastEventsResponse, QueryTypes.PastEventsError> => {
  return useQuery<QueryTypes.PastEventsResponse, QueryTypes.PastEventsError>({
    queryKey: ["pastEvents"],
    queryFn: () => getPastEvents()
  });
}

// admin events endpoint request
async function getAdminEvents(): Promise<QueryTypes.AdminEventsResponse> {
  return apiGet<QueryTypes.AdminEventsResponse, QueryTypes.AdminEventsError>({ endpoint: API_ROUTES.adminEvents });
}

// admin events endpoint hook - only fetches when enabled (e.g. authenticated admin session)
export const useGetAdminEvents = (enabled: boolean = true): UseQueryResult<QueryTypes.AdminEventsResponse, QueryTypes.AdminEventsError> => {
  return useQuery<QueryTypes.AdminEventsResponse, QueryTypes.AdminEventsError>({
    queryKey: ["adminEvents"],
    queryFn: () => getAdminEvents(),
    enabled,
  });
};

// admin members endpoint request
async function getAdminMembers(): Promise<QueryTypes.AdminMembersResponse> {
  return apiGet<QueryTypes.AdminMembersResponse, QueryTypes.AdminMembersError>({ endpoint: API_ROUTES.adminMembers });
}

// admin members endpoint hook - only fetches when enabled (e.g. authenticated admin session)
export const useGetAdminMembers = (enabled: boolean = true): UseQueryResult<QueryTypes.AdminMembersResponse, QueryTypes.AdminMembersError> => {
  return useQuery<QueryTypes.AdminMembersResponse, QueryTypes.AdminMembersError>({
    queryKey: ["adminMembers"],
    queryFn: () => getAdminMembers(),
    enabled,
  });
};

// event details request
async function getEventDetails(eventId: string): Promise<QueryTypes.EventDetailsResponse> {
  return apiGet<QueryTypes.EventDetailsResponse, QueryTypes.EventDetailsError>({ endpoint: getEventDetailsAPIRoute(eventId) });
}

// event details endpoint hook
export const useGetEventDetails = (eventId: string): UseQueryResult<QueryTypes.EventDetailsResponse, QueryTypes.EventDetailsError> => {
  return useQuery<QueryTypes.EventDetailsResponse, QueryTypes.EventDetailsError>({
    queryKey: ["eventDetails", eventId],
    queryFn: () => getEventDetails(eventId),
    enabled: !!eventId
  });
};

// member details request
async function getMemberDetails(memberId: string): Promise<QueryTypes.MemberDetailsResponse> {
  return apiGet<QueryTypes.MemberDetailsResponse, QueryTypes.MemberDetailsError>({ endpoint: getMemberDetailsAPIRoute(memberId) });
}

// member details endpoint hook
export const useGetMemberDetails = (memberId: string): UseQueryResult<QueryTypes.MemberDetailsResponse, QueryTypes.MemberDetailsError> => {
  return useQuery<QueryTypes.MemberDetailsResponse, QueryTypes.MemberDetailsError>({
    queryKey: ["memberDetails", memberId],
    queryFn: () => getMemberDetails(memberId),
    enabled: !!memberId
  });
};

// helper function to check if an error is a member details error
const isMemberDetailsError = (error: unknown): error is QueryTypes.MemberDetailsError => {
  if (!error || typeof error !== "object") return false;
  const candidate = error as Record<string, unknown>;
  return typeof candidate.status === "number" && typeof candidate.error === "string";
};

// member id name pairs endpoint hook
export const useGetMemberIdNamePairs = (
  memberIds: string[],
  enabled: boolean
): UseQueryResult<MemberIdNamePair[], QueryTypes.MemberDetailsError> => {
  return useQuery<MemberIdNamePair[], QueryTypes.MemberDetailsError>({
    queryKey: ["memberIdNamePairs", memberIds],
    enabled: enabled && memberIds.length > 0,
    queryFn: async () => {
      try {
        const members = await Promise.all(memberIds.map((id) => getMemberDetails(id)));
        return members.map((member) => ({
          id: member.id,
          name: member.display_name ?? member.name,
        }));
      } catch (error) {
        if (isMemberDetailsError(error)) throw error;
        throw {
          status: 500,
          error: "Failed to fetch member id/name pairs",
        } satisfies QueryTypes.MemberDetailsError;
      }
    }
  });
};

// image details request
async function getImageDetails(imageId: string): Promise<QueryTypes.ImageDetailsResponse> {
  return apiGet<QueryTypes.ImageDetailsResponse, QueryTypes.ImageDetailsError>({ endpoint: getImageDetailsAPIRoute(imageId) });
}

// image details endpoint hook
export const useGetImageDetails = (imageId: string): UseQueryResult<QueryTypes.ImageDetailsResponse, QueryTypes.ImageDetailsError> => {
  return useQuery<QueryTypes.ImageDetailsResponse, QueryTypes.ImageDetailsError>({
    queryKey: ["imageDetails", imageId],
    queryFn: () => getImageDetails(imageId),
    enabled: !!imageId
  });
};


// helper function to check if an error is a image details error
const isEventImageDetailsError = (error: unknown): error is QueryTypes.ImageDetailsError => {
  if (!error || typeof error !== "object") return false;
  const candidate = error as Record<string, unknown>;
  return typeof candidate.status === "number" && typeof candidate.error === "string";
};

// event image details request
export const useGetEventImageDetails = (
  imageIds: string[],
  enabled: boolean
): UseQueryResult<EventImageDetails[], QueryTypes.ImageDetailsError> => {
  return useQuery<EventImageDetails[], QueryTypes.ImageDetailsError>({
    queryKey: ["eventImageDetails", imageIds],
    enabled: enabled && imageIds.length > 0,
    queryFn: async () => {
      try {
        const images = await Promise.all(imageIds.map((id) => getImageDetails(id)));
        return images.map((image) => ({
          id: image.id,
          path: image.path,
          caption: image.caption,
          width: image.width,
          height: image.height,
          photographer_id: image.photographer_id,
          creative_director_id: image.creative_director_id,
          model_ids: image.model_ids,
          additional_personnel: image.additional_personnel,
        }));
      } catch (error) {
        if (isEventImageDetailsError(error)) throw error;
        throw {
          status: 500,
          error: "Failed to fetch event image details",
        } satisfies QueryTypes.ImageDetailsError;
      }
    }
  });
};