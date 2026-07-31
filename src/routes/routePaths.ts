export const routes = {
  root: '/',
  about: '/about',
  features: '/features',
  publications: '/publications',
  calendar: '/calendar',
  eventDetails: '/events/:eventId',
  members: '/members/:memberId',
  health: '/health',
  login: '/login',
  adminRoot: '/admin',
  adminMembers: '/admin/members',
  adminImages: '/admin/images',
};

export const getEventDetailsPageRoute = (eventId: string): string => `/events/${eventId}`;
export const getMemberDetailsPageRoute = (memberId: string): string => `/members/${memberId}`;

export const headerRoutes = [
  { label: "About Us", path: routes.about, offset: "9%" },
  { label: "Featured", path: routes.features, offset: "32%" },
  { label: "Calendar", path: routes.calendar, offset: "55%" },
  { label: "Publications", path: routes.publications, offset: "75%" },
];

export const adminHeaderRoutes = [
  { label: "events", icon: "material-symbols:event-rounded", path: routes.adminRoot },
  { label: "members", icon: "wpf:group", path: routes.adminMembers },
  { label: "images", icon: "material-symbols:image-rounded", path: routes.adminImages },
];

export const footerLinks = [
  {label: "Instagram", href: "https://www.instagram.com/rpithread/", icon: "mdi:instagram", offset: "69%" },
  {label: "Discord", href: "https://discord.gg/X22djk9rSH", icon: "mingcute:discord-fill", offset: "77%" },
  {label: "Email", href: "mailto:thomam13@rpi.edu?subject=The%20Thread%20-%20Site%20Inquiry", icon: "line-md:email", offset: "84%" },
];
