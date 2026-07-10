import type { Event } from "../types/eventTypes";
import type { Image } from "../types/imageTypes";
import type { Member } from "../types/memberTypes";

export const adminEventFixtures: Pick<Event, "id" | "title" | "date" | "type" | "location" | "published" | "image_path">[] = [
  {
    id: "event-1",
    title: "Fall Editorial Shoot",
    date: "2025-09-12",
    type: "shoot",
    location: "Studio A",
    published: true,
    image_path: "2025/9/27/freeShoot/13/",
  },
  {
    id: "event-2",
    title: "Member Orientation",
    date: "2025-08-28",
    type: "internal",
    location: "Main Hall",
    published: false,
    image_path: "2025/9/27/freeShoot/6/",
  },
  {
    id: "event-3",
    title: "NYC Fashion Week Coverage",
    date: "2025-10-03",
    type: "external",
    location: "New York, NY",
    published: true,
    image_path: "2025/9/27/freeShoot/9/",
  },
];

export const adminMemberFixtures: Pick<Member, "id" | "name" | "display_name" | "role" | "email" | "start_year" | "active" | "visible">[] = [
  {
    id: "member-1",
    name: "Alex Rivera",
    display_name: "Alex Rivera",
    role: "Creative Director",
    email: "alex@thread.edu",
    start_year: 2023,
    active: true,
    visible: true,
  },
  {
    id: "member-2",
    name: "Jordan Lee",
    display_name: "Jordan Lee",
    role: "Photographer",
    email: "jordan@thread.edu",
    start_year: 2024,
    active: true,
    visible: true,
  },
  {
    id: "member-3",
    name: "Sam Patel",
    display_name: "Sam Patel",
    role: "Model",
    email: "sam@thread.edu",
    start_year: 2022,
    active: false,
    visible: false,
  },
];

export const adminImageFixtures: Pick<Image, "id" | "path" | "caption" | "date" | "width" | "height" | "published">[] = [
  {
    id: "image-1",
    path: "/events/fall-2025/cover",
    caption: "Cover look from the fall editorial",
    date: "2025-09-12",
    width: 2400,
    height: 1600,
    published: true,
  },
  {
    id: "image-2",
    path: "/events/fall-2025/look-02",
    caption: "Detail shot, look two",
    date: "2025-09-12",
    width: 1800,
    height: 2400,
    published: false,
  },
  {
    id: "image-3",
    path: "/events/fall-2025/look-03",
    caption: "Wide frame from rooftop set",
    date: "2025-09-12",
    width: 3200,
    height: 2133,
    published: true,
  },
];
