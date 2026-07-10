export const API_ROUTES = {
  health: 'health',
  eventOverview: 'events/overview',
  login: 'auth/login',
  refreshToken: 'auth/refresh',
  adminUser: 'auth/me',
  pastEvents: 'events/past',
  adminEvents: 'admin/events',
  adminMembers: 'admin/members',
  eventDetails: 'events/{eventId}',
  memberDetails: 'members/{memberId}',
  imageDetails: 'images/{imageId}',
} as const;

export const getEventDetailsAPIRoute = (eventId: string): string => {
  return API_ROUTES.eventDetails.replace('{eventId}', eventId) as typeof API_ROUTES.eventDetails;
};

export const getMemberDetailsAPIRoute = (memberId: string): string => {
  return API_ROUTES.memberDetails.replace('{memberId}', memberId) as typeof API_ROUTES.memberDetails;
};

export const getImageDetailsAPIRoute = (imageId: string): string => {
  return API_ROUTES.imageDetails.replace('{imageId}', imageId) as typeof API_ROUTES.imageDetails;
};